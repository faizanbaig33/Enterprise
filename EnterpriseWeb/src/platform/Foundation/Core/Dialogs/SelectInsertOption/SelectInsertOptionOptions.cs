using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Shell.Applications.Dialogs.ItemLister;
using Sitecore.Text;
using Sitecore.Web;

namespace Platform.Foundation.Core.Dialogs.SelectInsertOption
{
    public class SelectInsertOptionOptions : SelectItemOptions
    {
        public Item InsertOptions { get; set; }

        public override UrlString ToUrlString(Database database)
        {
            var result = base.ToUrlString(database);
            result["io"] = InsertOptions.Uri.ToString();
            return result;
        }

        protected override void ParseOptions()
        {
            base.ParseOptions();

            var itemUri = ItemUri.Parse(WebUtil.GetQueryString("io"));
            if (itemUri != null)
            {
                InsertOptions = Database.GetItem(itemUri);
            }
        }

        protected override string GetXmlControl()
        {
            return "Sitecore.Shell.Applications.Dialogs.EW.SelectInsertOption";
        }
    }
}
