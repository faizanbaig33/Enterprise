using System;
using System.Collections.Specialized;
using Platform.Foundation.Core.Dialogs.SelectMaster;
using Sitecore;
using Sitecore.Diagnostics;
using Sitecore.Pipelines;
using Sitecore.Pipelines.GetMasters;
using Sitecore.Shell.Applications.Dialogs.ItemLister;
using Sitecore.Shell.Framework.Commands;
using Sitecore.Web.UI.Sheer;

namespace Platform.Foundation.Core.Commands
{
    [Serializable]
    public class InsertChildDataSource : Command
    {
        public override void Execute(CommandContext context)
        {
            if (context.Items.Length != 1 || !context.Items[0].Access.CanCreate())
            {
                return;
            }

            var item = context.Items[0];
            Context.ClientPage.Start(this, "Run", new NameValueCollection()
            {
                ["ItemID"] = item.ID.ToString(),
            });
        }

        protected void Run(ClientPipelineArgs args)
        {
            Assert.ArgumentNotNull(args, nameof(args));

            var item = Context.ContentDatabase.GetItem(args.Parameters["ItemID"]);
            if (item == null)
            {
                SheerResponse.Alert("Item \"{0}\" not found.", args.Parameters["ItemID"]);
            }
            else if (args.IsPostBack)
            {
                if (!args.HasResult)
                {
                    return;
                }

                var eventName = string.Format("item:addmaster(master={0},id={1})", args.Result, item.ID);
                Context.ClientPage.SendMessage(this, eventName);
            }
            else
            {
                var getMastersArgs = new GetMastersArgs
                {
                    Item = item,
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
