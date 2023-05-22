using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering;
using Sitecore.LayoutService.Presentation.Pipelines.RenderJsonRendering;
using Sitecore.Mvc.Presentation;
using Sitecore.Pipelines;

// TODO: Pass across parameters
// TODO: Share logic with content resolver
// TODO: Comments

namespace Platform.Foundation.Core.Pipelines.RenderJsonRendering
{
    public abstract class RenderPlaceholdersBase : BaseRenderJsonRendering
    {
        protected IPlaceholderRenderingService placeholderRenderingService;

        public RenderPlaceholdersBase(IPlaceholderRenderingService placeholderRenderingService, IConfiguration configuration)
            : base(configuration)
        {
            this.placeholderRenderingService = placeholderRenderingService;
        }

        protected virtual Item GetContextItem(RenderJsonRenderingArgs args)
        {
            if (string.IsNullOrWhiteSpace(args.Rendering.DataSource))
                return (Item)null;
            Item contextItem = args.Rendering.RenderingItem?.Database.GetItem(args.Rendering.DataSource);
            if (contextItem != null)
                return contextItem;
            DataUri uri = DataUri.Parse(args.Rendering.DataSource);
            if (!(uri != (DataUri)null))
                return (Item)null;
            return args.Rendering.RenderingItem?.Database.GetItem(uri);
        }

        protected virtual RenderedPlaceholderElement GetRenderedDataSource(
          Item dataSource,
          RenderJsonRenderingArgs args)
        {
            var renderingId = dataSource.Fields[Sitecore.FieldIDs.Renderers].Value;
            if (string.IsNullOrWhiteSpace(renderingId))
            {
                Log.Error($"RenderPlaceholdersBase!GetRenderedDataSource: The 'Renderers' field of the data sources standard values isn't set (DataSourceId: {dataSource.ID}).", this);
                return GetSystemError(dataSource, "No Renderers Found", "The 'Renderers' field of the data sources standard values isn't set.");
            }

            var renderingItem = dataSource.Database.GetItem(renderingId);
            if (renderingItem == null)
            {
                Log.Error($"RenderPlaceholdersBase!GetRenderedDataSource: Unable to find the rendering for the data source (DataSourceId: {dataSource.ID}, Rendering Id: {renderingId}).", this);
                return GetSystemError(dataSource, "Rendering Not Found", "Unable to find the rendering for the data source.");
            }

            var itemRendering = new Rendering
            {
                RenderingType = "Item",
                DataSource = dataSource.ID.ToString(),
                Renderer = new ItemRenderer { Item = dataSource },
                RenderingItem = renderingItem,
                UniqueId = dataSource.ID.ToGuid(),
                //Parameters = new RenderingParameters(additionalParamsField.ToString()),
            };
            RenderJsonRenderingArgs renderJsonRenderingArgs = new RenderJsonRenderingArgs
            {
                RenderingConfiguration = args.RenderingConfiguration,
                Rendering = itemRendering,
                PlaceholderRenderingService = args.PlaceholderRenderingService,
            };
            CorePipeline.Run("renderJsonRendering", renderJsonRenderingArgs, "layoutService");

            return renderJsonRenderingArgs.Result;
        }

        protected virtual RenderedPlaceholderElement GetSystemError(
          Item dataSource,
          string title,
          string message)
        {
            var result = new RenderedJsonRendering
            {
                Uid = dataSource.ID.ToGuid(),
                DataSource = dataSource.ID.ToString(),
                ComponentName = "SystemError",
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

