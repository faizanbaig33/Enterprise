using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Platform.Foundation.Core.Constants;
using Sitecore.Common;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Extensions.StringExtensions;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.Helpers;
using Sitecore.LayoutService.ItemRendering;
using Sitecore.LayoutService.Presentation.Pipelines.RenderJsonRendering;
using Sitecore.Links;
using Sitecore.Mvc.Presentation;
using Sitecore.Pipelines;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;

// TODO: Pass across parameters
// TODO: Share logic with content resolver
// TODO: Review Sitecore standard fields

namespace Platform.Foundation.Core.LayoutService.ItemRendering.ContentsResolvers
{
    public class RenderingContentsResolverBase : Sitecore.XA.JSS.Foundation.Presentation.ContentsResolvers.RenderingContentsResolver
    {
        protected IPlaceholderRenderingService placeholderRenderingService;

        public RenderingContentsResolverBase(IPlaceholderRenderingService placeholderRenderingService)
        {
            this.placeholderRenderingService = placeholderRenderingService;
        }

        protected JObject GetItemJson(Item item, Rendering rendering, IRenderingConfiguration renderingConfig, bool isRootItem)
        {
            // Note: Sitecore by default embeds us in a "fields" item, so the root item needs to follow that.

            var itemJson = JObject.Parse(renderingConfig.ItemSerializer.Serialize(item));

            if (isRootItem)
            {
                // We can't add Container placeholders from here. This will happen in a RenderJson pipeline processor.
                return itemJson;
            }
            else
            {
                var wrappedResult = new JObject
                {
                    ["id"] = item.ID.Guid.ToString("D"),
                    ["displayName"] = item.DisplayName,
                    ["name"] = item.Name,
                    ["templateId"] = item.TemplateID.Guid.ToString("D"),
                    ["templateName"] = item.TemplateName,
                    ["url"] = LinkManager.GetItemUrl(item, ItemUrlHelper.GetLayoutServiceUrlOptions()),
                    ["fields"] = itemJson,
                };

                var placeholders = new JObject();

                // If we are a child container item, then get the child items and add them as a placeholder
                if (item.InheritsFrom(TemplateIds.Foundation.Core.FieldSets.Containers._ChildDataSourceContainer.Template))
                {
                    var children = item.Children
                        .Select(_ => GetChildRendering(_, rendering, renderingConfig))
                        .Where(_ => _ != null)
                        .ToList();

                    placeholders["__children__"] = JArray.FromObject(children);
                }

                // If we are a field container item, then get the fields and add them as placeholders
                if (item.InheritsFrom(TemplateIds.Foundation.Core.FieldSets.Containers._FieldDataSourceContainer.Template))
                {
                    var fields = item.Fields
                        .Where(_ => _.Name.StartsWith("ph-"))
                        .Select(_ => GetFieldRendering(_, item, rendering, renderingConfig))
                        .ToList();

                    fields.ForEach(_ => placeholders[_.Name] = JArray.FromObject(_.Elements));

                }

                if (placeholders.HasValues)
                {
                    wrappedResult["placeholders"] = placeholders;
                }

                return wrappedResult;
            }
        }

        protected JObject GetFieldsJson(Item item, Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            var result = JObject.Parse(renderingConfig.ItemSerializer.Serialize(item));

            return result;
        }

        protected JObject GetChildRendering(
          Item dataSource,
          Rendering rendering,
          IRenderingConfiguration renderingConfig)
        {
            // If it is a shared child data source, then follow the pointer to the correct data source
            if (dataSource.InheritsFrom(TemplateIds.Foundation.Core.BaseTemplates.Containers._BaseSharedChildDataSource.Template))
            {
                // We use a name here, since we can't share the fields due to different datasource queries.
                var dataSourceField = (ReferenceField)dataSource.Fields["dataSource"];
                if (dataSourceField == null)
                {
                    Log.Error($"RenderingContentsResolverBase!GetChildRendering: No 'dataSource' field found on child data source (DataSourceId: {dataSource.ID}).", this);
                    return GetSystemError(dataSource, "No Data Source Field", "No 'dataSource' field found on child data source.");
                }

                if (dataSourceField.TargetItem == null)
                {
                    Log.Warn($"RenderingContentsResolverBase!GetChildRendering: The 'dataSource' field of the shared child data source isn't set (DataSourceId: {dataSource.ID}).", this);
                    return GetSharedEmptyChildDataSource(dataSource, "Empty Data Source", "The 'dataSource' field of the shared child data source isn't set.");
                }
                dataSource = dataSourceField.TargetItem;
            }

            return GetRenderedDataSource(dataSource, renderingConfig);
        }

        protected (string Name, List<JObject> Elements) GetFieldRendering(
          Field dataSourceField,
          Item parentDataSource,
          Rendering rendering,
          IRenderingConfiguration renderingConfig)
        {
            var placeholderName = dataSourceField.Name.Right(dataSourceField.Name.Length - 3);

            if (placeholderName.Length == 0)
            {
                Log.Warn("RenderFieldPlaceholders!GetFieldRendering: Blank field placeholder name. Field name format should be ph-{placeholder name}. Changing to 'default'.", this);
                placeholderName = "default";
            }

            var elements = new List<JObject>();

            switch (dataSourceField.Type.ToLowerInvariant())
            {
                case "droplink":
                case "droptree":
                case "grouped droplink":
                case "filterabledroptree":
                    var renderedDataSource = GetRefernceFieldRendering(dataSourceField, parentDataSource, renderingConfig);
                    if (renderedDataSource != null)
                    {
                        elements.Add(renderedDataSource);
                    }
                    break;
                case "checklist":
                case "multilist":
                case "multilist with search":
                case "treelist":
                case "treelist with search":
                case "treelistex":
                case "multiroottreelist":
                case "multiroottreelistex":
                    var renderedDataSources = GetMultilistFieldFieldRenderings(dataSourceField, parentDataSource, renderingConfig);
                    renderedDataSources.Where(_ => _ != null)
                        .ForEach(_ => elements.Add(_));
                    break;
            }

            return (placeholderName, elements);
        }

        protected virtual JObject GetRefernceFieldRendering(
          ReferenceField dataSourceField,
          Item parentDataSource,
          IRenderingConfiguration renderingConfig)
        {
            if (dataSourceField.TargetItem == null)
            {
                return null;
            }

            var dataSource = dataSourceField.TargetItem;

            return GetRenderedDataSource(dataSource, renderingConfig);
        }

        protected virtual IEnumerable<JObject> GetMultilistFieldFieldRenderings(
          MultilistField dataSourceField,
          Item parentDataSource,
          IRenderingConfiguration renderingConfig)
        {
            var items = dataSourceField.GetItems()
                .Where(_ => _ != null)
                .Select(_ => GetRenderedDataSource(_, renderingConfig))
                .ToList();

            return items;
        }

        protected virtual JObject GetRenderedDataSource(
          Item dataSource,
          IRenderingConfiguration renderingConfig)
        {
            var renderingId = dataSource.Fields[Sitecore.FieldIDs.Renderers].Value;
            if (string.IsNullOrWhiteSpace(renderingId))
            {
                Log.Error($"RenderingContentsResolverBase!GetChildRendering: The 'Renderers' field of the data sources standard values isn't set (DataSourceId: {dataSource.ID}).", this);
                return GetSystemError(dataSource, "No Renderers Found", "The 'Renderers' field of the data sources standard values isn't set.");
            }

            var renderingItem = dataSource.Database.GetItem(renderingId);
            if (renderingItem == null)
            {
                Log.Error($"RenderingContentsResolverBase!GetChildRendering: Unable to find the rendering for the data source (DataSourceId: {dataSource.ID}, Rendering Id: {renderingId}).", this);
                return GetSystemError(dataSource, "Rendering Not Found", "Unable to find the rendering for the data source.");
            }

            var itemRendering = new Rendering
            {
                RenderingType = "Item",
                DataSource = dataSource.ID.ToString(),
                Renderer = new ItemRenderer { Item = dataSource },
                RenderingItem = renderingItem,
                UniqueId = dataSource.ID.ToGuid(),
            };
            RenderJsonRenderingArgs renderJsonRenderingArgs = new RenderJsonRenderingArgs
            {
                RenderingConfiguration = renderingConfig,
                Rendering = itemRendering,
                PlaceholderRenderingService = this.placeholderRenderingService
            };
            CorePipeline.Run("renderJsonRendering", renderJsonRenderingArgs, "layoutService");
            if (renderJsonRenderingArgs.Result == null)
            {
                return null;
            }

            var result = new JObject
            {
                ["componentName"] = renderJsonRenderingArgs.Result.ComponentName,
                ["uid"] = renderJsonRenderingArgs.Result.Uid,
                ["dataSource"] = renderJsonRenderingArgs.Result.DataSource,
            };

            var serializer = new JsonSerializer();
            using (var stringWriter = new StringWriter())
            {
                using (var writer = new JsonTextWriter(stringWriter))
                {
                    serializer.Serialize(writer, renderJsonRenderingArgs.Result.Contents);
                }

                result["fields"] = JObject.Parse(stringWriter.ToString());
            }

            return result;
        }

        protected virtual JObject GetSystemError(
          Item dataSource,
          string title,
          string message)
        {
            var result = new JObject
            {
                ["uid"] = dataSource.ID.ToString(),
                ["dataSource"] = dataSource.ID.ToString(),
                ["componentName"] = "SystemError",
                ["fields"] = new JObject
                {
                    ["title"] = title,
                    ["message"] = message,
                },
            };
            return result;
        }

        protected virtual JObject GetSharedEmptyChildDataSource(
          Item dataSource,
          string title,
          string message)
        {
            var result = new JObject
            {
                ["uid"] = dataSource.ID.ToString(),
                ["dataSource"] = dataSource.ID.ToString(),
                ["componentName"] = "EmptySharedChildDataSource",
                ["fields"] = new JObject
                {
                    ["id"] = dataSource.ID.ToString(),
                    ["title"] = title,
                    ["message"] = message,
                },
            };
            return result;
        }
    }
}
