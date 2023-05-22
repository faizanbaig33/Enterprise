using Platform.Foundation.Core.Dialogs.SelectMaster;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Pipelines;
using Sitecore.Pipelines.GetMasters;
using Sitecore.Shell.Applications.Dialogs.ItemLister;
using Sitecore.Web.UI.Sheer;

namespace Platform.Foundation.Core.Dialogs.SelectRenderingDatasource
{
    public class SelectRenderingDatasourceForm : Sitecore.XA.Foundation.LocalDatasources.Dialogs.SelectRenderingDatasourceForm
    {
        protected override void CreateDatasourceClientPipeline(ClientPipelineArgs args)
        {
            Assert.ArgumentNotNull(args, nameof(args));
            var parent = this.BaseClient.GetItemNotNull(args.Parameters["itemid"], Language.Parse(args.Parameters["language"]));
            if (args.HasResult && !args.IsPostBack)
            {
                base.CreateDatasourceClientPipeline(args);
            }
            else if (args.IsPostBack)
            {
                if (!args.HasResult)
                {
                    return;
                }

                Context.ClientPage.Modified = false; //Hack to not show modified message
                var eventName = string.Format("item:addmaster(master={0},id={1})", args.Result, parent.ID);
                Context.ClientPage.SendMessage(this, eventName);
            }
            else if (!parent.Access.CanCreate())
            {
                base.CreateDatasourceClientPipeline(args);
            }
            else
            {
                var getMastersArgs = new GetMastersArgs
                {
                    Item = parent,
                };
                PipelineFactory.GetPipeline("uiGetMasters").Start(getMastersArgs);

                var options = new SelectMasterOptions();
                options.Masters = getMastersArgs.Masters.ToArray();
                options.Icon = "SoftwareV2/16x16/component_blue.png";
                options.Text = "Select the item to insert.";
                options.Title = "Insert Item";
                options.ButtonText = "Insert";
                options.ResultType = SelectItemOptions.DialogResultType.Path;
                var url = options.ToUrlString(Client.ContentDatabase).ToString();
                SheerResponse.ShowModalDialog(url, "1200px", "660px", string.Empty, true);
                args.WaitForPostBack();
            }
        }
    }
}
