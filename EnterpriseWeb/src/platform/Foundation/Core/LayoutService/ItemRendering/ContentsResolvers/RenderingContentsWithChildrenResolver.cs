using System.Linq;
using Newtonsoft.Json.Linq;
using Sitecore.Configuration;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering;
using Sitecore.Mvc.Presentation;

namespace Platform.Foundation.Core.LayoutService.ItemRendering.ContentsResolvers
{
    public class RenderingContentsWithChildrenResolver : RenderingContentsResolverBase
    {
        public RenderingContentsWithChildrenResolver(IPlaceholderRenderingService placeholderRenderingService)
            : base(placeholderRenderingService)
        {
        }

        public override object ResolveContents(
          Rendering rendering,
          IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull(rendering, nameof(rendering));
            Assert.ArgumentNotNull(renderingConfig, nameof(renderingConfig));
            Item contextItem = GetContextItem(rendering, renderingConfig);

            if (contextItem == null)
            {
                return null;
            }

            return ProcessItem(contextItem, rendering, renderingConfig);
        }

        protected override JObject ProcessItem(
          Item item,
          Rendering rendering,
          IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull(item, nameof(item));

            if (!int.TryParse(Parameters["depth"], out int depth))
            {
                depth = 0;
            }

            using (new SettingsSwitcher("Media.AlwaysIncludeServerUrl", IncludeServerUrlInMediaUrls.ToString()))
            {
                var result = this.ProcessItemHelper(item, rendering, renderingConfig, depth, true);
                return result;
            }
        }

        protected JObject ProcessItemHelper(
          Item item,
          Rendering rendering,
          IRenderingConfiguration renderingConfig,
          int depth,
          bool isRootItem)
        {
            var result = this.GetItemJson(item, rendering, renderingConfig, isRootItem);

            if (depth > 0)
            {
                var children = item.Children
                    .Select(_ => ProcessItemHelper(_, rendering, renderingConfig, depth - 1, false))
                    .ToList();

                if (isRootItem)
                {
                    result["children"] = JArray.FromObject(children);
                }
                else
                {
                    result["fields"]["children"] = JArray.FromObject(children);
                }
            }

            return result;
        }
    }
}
