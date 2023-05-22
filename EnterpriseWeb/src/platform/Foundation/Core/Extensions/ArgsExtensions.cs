using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Globalization;
using Sitecore.Pipelines;
using Sitecore.Web;
using Sitecore.Mvc.Presentation;

namespace Platform.Foundation.Core.Extensions
{
    public static class ArgsExtensions
    {
        public static Item GetContextItem(this PipelineArgs args)
        {
            Item item = Sitecore.Context.Item;
            if (item != null)
            {
                return item;
            }
            var language = Language.Parse(WebUtil.GetFormValue("language"));
            var dataSourceItemId = SafeParseShortId(WebUtil.GetFormValue("itemid"));
            if (Sitecore.Context.ContentDatabase != null && language != null && !dataSourceItemId.IsNull)
            {
                return Sitecore.Context.ContentDatabase.GetItem(dataSourceItemId, language);
            }
            if (PageContext.CurrentOrNull == null || PageContext.CurrentOrNull.Item == null)
            {
                return null;
            }
            return PageContext.Current.Item;
        }

        private static ID SafeParseShortId(string raw)
        {
            if (string.IsNullOrEmpty(raw))
            {
                return ID.Null;
            }
            return ShortID.DecodeID(raw);
        }
    }
}
