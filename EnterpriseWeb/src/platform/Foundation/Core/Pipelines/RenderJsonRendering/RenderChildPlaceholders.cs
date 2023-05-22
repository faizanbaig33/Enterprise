using System.Collections.Generic;
using System.Linq;
using Platform.Foundation.Core.Constants;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering;
using Sitecore.LayoutService.Presentation.Pipelines.RenderJsonRendering;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;

// TODO: Pass across parameters
// TODO: Share logic with content resolver
// TODO: Comments

namespace Platform.Foundation.Core.Pipelines.RenderJsonRendering
{
    public class RenderChildPlaceholders : RenderPlaceholdersBase
    {
        public RenderChildPlaceholders(IPlaceholderRenderingService placeholderRenderingService, IConfiguration configuration)
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

            if (!dataSource.InheritsFrom(TemplateIds.Foundation.Core.FieldSets.Containers._ChildDataSourceContainer.Template))
            {
                return;
            }

            args.Result.Placeholders = this.GetRenderedChildPlaceholders(dataSource, args);
        }

        protected virtual IList<RenderedPlaceholder> GetRenderedChildPlaceholders(Item dataSource,
          RenderJsonRenderingArgs args)
        {
            var children = dataSource.Children
                .Select(_ => GetChildRendering(_, args))
                .Where(_ => _ != null)
                .ToList();

            var placeholder = new RenderedPlaceholder
            {
                Name = "__children__",
                Elements = children,
            };

            var result = args.Result.Placeholders ?? new List<RenderedPlaceholder>();
            result.Add(placeholder);
            return result;
        }

        protected virtual RenderedPlaceholderElement GetChildRendering(
          Item dataSource,
          RenderJsonRenderingArgs args)
        {
            var originalDataSource = dataSource;

            // If it is a shared child data source, then follow the pointer to the correct data source
            if (dataSource.InheritsFrom(TemplateIds.Foundation.Core.BaseTemplates.Containers._BaseSharedChildDataSource.Template))
            {
                // We use a name here, since we can't share the fields due to different datasource queries.
                var dataSourceField = (ReferenceField)dataSource.Fields["dataSource"];
                if (dataSourceField == null)
                {
                    Log.Error($"RenderChildPlaceholders!GetChildRendering: No 'dataSource' field found on child data source (DataSourceId: {dataSource.ID}).", this);
                    return GetSystemError(dataSource, "No Data Source Field", "No 'dataSource' field found on child data source.");
                }

                if (dataSourceField.TargetItem == null)
                {
                    Log.Warn($"RenderChildPlaceholders!GetChildRendering: The 'dataSource' field of the shared child data source isn't set (DataSourceId: {dataSource.ID}).", this);
                    return GetEmptySharedChildDataSource(dataSource, "Empty Data Source", "The 'dataSource' field of the shared child data source isn't set.");
                }
                dataSource = dataSourceField.TargetItem;
            }

            return GetRenderedDataSource(dataSource, args);
        }

        protected virtual RenderedPlaceholderElement GetEmptySharedChildDataSource(
          Item dataSource,
          string title,
          string message)
        {
            var result = new RenderedJsonRendering
            {
                Uid = dataSource.ID.ToGuid(),
                DataSource = dataSource.ID.ToString(),
                ComponentName = "EmptySharedChildDataSource",
                Contents = new
                {
                    id = dataSource.ID.ToString(),
                    title = title,
                    message = message,
                },
            };
            return result;
        }
    }
}
