using System;
using System.Collections.Specialized;
using Platform.Foundation.Core.Constants;
using Platform.Foundation.Core.Dialogs.SelectInsertOption;
using Sitecore;
using Sitecore.Shell.Applications.Dialogs.ItemLister;
using Sitecore.Shell.Framework.Commands;
using Sitecore.Web.UI.Sheer;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;

namespace Platform.Foundation.Core.Commands
{
    [Serializable]
    public class AddMaster : Sitecore.Shell.Framework.Commands.AddMaster
    {
        public override void Execute(CommandContext context)
        {
            if (context.Items.Length != 1 || !context.Items[0].Access.CanCreate())
            {
                return;
            }

            var item = context.Items[0];
            var masterPath = context.Parameters["master"];
            var master = item.Database.GetItem(masterPath);

            string eventName;
            if (master.InheritsFrom(TemplateIds.Foundation.EnhancedInsertOptions.InsertOptions.Template))
            {
                Context.ClientPage.Start(this, "SelectItem", new NameValueCollection()
                {
                    ["InsertOptionsID"] = master.ID.ToString(),
                    ["ItemID"] = item.ID.ToString(),
                });
            }
            else
            {
                eventName = string.Format("item:addmaster:enterprisewebfallback(master={0},id={1})", masterPath, item.ID);
                Context.ClientPage.SendMessage(this, eventName);
                //SheerResponse.Timer(eventName, 10); // This is how SPE does it, so should we do the same?
            }
        }

        protected void SelectItem(ClientPipelineArgs args)
        {
            var insertOptions = Context.ContentDatabase.GetItem(args.Parameters["InsertOptionsID"]);
            if (insertOptions == null)
            {
                SheerResponse.Alert("Insert Options Folder \"{0}\" not found.", args.Parameters["InsertOptionsID"]);
            }
            else if (args.IsPostBack)
            {
                if (!args.HasResult)
                {
                    return;
                }

                var item = Context.ContentDatabase.GetItem(args.Parameters["ItemID"]);
                var eventName = string.Format("item:addmaster(master={0},id={1})", args.Result, item.ID);
                Context.ClientPage.SendMessage(this, eventName);
            }
            else
            {
                var options = new SelectInsertOptionOptions();
                options.InsertOptions = insertOptions;
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
