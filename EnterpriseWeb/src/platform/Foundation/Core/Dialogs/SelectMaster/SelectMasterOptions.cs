using System.Linq;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Shell.Applications.Dialogs.ItemLister;
using Sitecore.Text;
using Sitecore.Web;

namespace Platform.Foundation.Core.Dialogs.SelectMaster
{
    public class SelectMasterOptions : SelectItemOptions
    {
        public Item[] Masters { get; set; }

        public override UrlString ToUrlString(Database database)
        {
            var result = base.ToUrlString(database);
            result["mstrs"] = string.Join("|", Masters.Select(_ => _.Uri.ToString()));
            return result;
        }

        protected override void ParseOptions()
        {
            base.ParseOptions();

            var masterUris = WebUtil.GetQueryString("mstrs").Split('|');
            Masters = masterUris
                .Select(_ => ItemUri.Parse(_))
                .Where(_ => _ != null)
                .Select(_ => Database.GetItem(_))
                .Where(_ => _ != null)
                .ToArray();
        }

        protected override string GetXmlControl()
        {
            return "Sitecore.Shell.Applications.Dialogs.EW.SelectMaster";
        }
    }
}
