using System.Collections.Generic;
using System.Linq;
using Platform.Foundation.Core.Constants;
using Sitecore.Common;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Extensions.StringExtensions;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering;
using Sitecore.LayoutService.Presentation.Pipelines.RenderJsonRendering;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;

// TODO: Pass across parameters
// TODO: Share logic with content resolver
// TODO: Comments

namespace Platform.Foundation.Core.Pipelines.RenderJsonRendering
{
    public class RenderFieldPlaceholders : RenderPlaceholdersBase
    {
        public RenderFieldPlaceholders(IPlaceholderRenderingService placeholderRenderingService, IConfiguration configuration)
            : base(placeholderRenderingService, configuration)
        {
        }

        protected override void SetResult(RenderJsonRenderingArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            Assert.IsNotNull((object)args.Result, "args.Result cannot be null");

            var dataSource = GetContextItem(args);
            if (dataSource == null)
            {
                return;
            }

            if (!dataSource.InheritsFrom(TemplateIds.Foundation.Core.FieldSets.Containers._FieldDataSourceContainer.Template))
            {
                return;
            }

            args.Result.Placeholders = this.GetRenderedFieldPlaceholders(dataSource, args);
        }

        protected virtual IList<RenderedPlaceholder> GetRenderedFieldPlaceholders(Item dataSource,
          RenderJsonRenderingArgs args)
        {
            var placeholders = dataSource.Fields
                .Where(_ => _.Name.StartsWith("ph-"))
                .Select(_ => GetFieldRendering(_, dataSource, args))
                .ToList();

            var result = args.Result.Placeholders ?? new List<RenderedPlaceholder>();
            placeholders.ForEach(_ => result.Add(_));
            return result;
        }

        protected virtual RenderedPlaceholder GetFieldRendering(
          Field dataSourceField,
          Item parentDataSource,
          RenderJsonRenderingArgs args)
        {
            var placeholderName = dataSourceField.Name.Right(dataSourceField.Name.Length - 3);

            if (placeholderName.Length == 0)
            {
                Log.Warn("RenderFieldPlaceholders!GetFieldRendering: Blank field placeholder name. Field name format should be ph-{placeholder name}. Changing to 'default'.", this);
                placeholderName = "default";
            }

            var placeholder = new RenderedPlaceholder
            {
                Name = placeholderName,
                Elements = new List<RenderedPlaceholderElement>(),
            };

            switch (dataSourceField.Type.ToLowerInvariant())
            {
                case "droplink":
                case "droptree":
                case "grouped droplink":
                    var renderedDataSource = GetRefernceFieldRendering(dataSourceField, parentDataSource, args);
                    if (renderedDataSource != null)
                    {
                        placeholder.Elements.Add(renderedDataSource);
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
                    var renderedDataSources = GetMultilistFieldFieldRenderings(dataSourceField, parentDataSource, args);
                    renderedDataSources.Where(_ => _ != null)
                        .ForEach(_ => placeholder.Elements.Add(_));
                    break;
            }

            return placeholder;
        }

        protected virtual RenderedPlaceholderElement GetRefernceFieldRendering(
          ReferenceField dataSourceField,
          Item parentDataSource,
          RenderJsonRenderingArgs args)
        {
            if (dataSourceField.TargetItem == null)
            {
                return null;
            }

            var dataSource = dataSourceField.TargetItem;

            return GetRenderedDataSource(dataSource, args);
        }

        protected virtual IEnumerable<RenderedPlaceholderElement> GetMultilistFieldFieldRenderings(
          MultilistField dataSourceField,
          Item parentDataSource,
          RenderJsonRenderingArgs args)
        {
            var items = dataSourceField.GetItems()
                .Where(_ => _ != null)
                .Select(_ => GetRenderedDataSource(_, args))
                .ToList();

            return items;
        }
    }
}
