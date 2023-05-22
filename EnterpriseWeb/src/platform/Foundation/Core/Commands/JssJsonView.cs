using System;
using System.Collections.Specialized;
using System.Linq;
using Sitecore;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Links;
using Sitecore.Shell.DeviceSimulation;
using Sitecore.Shell.Framework.Commands;
using Sitecore.Sites;
using Sitecore.Text;
using Sitecore.Web.UI.Sheer;

namespace Platform.Foundation.Core.Commands
{
    [Serializable]
    public class JssJsonView : Command
    {
        IItemSiteResolver _itemSiteResolver;

        public JssJsonView(IItemSiteResolver itemSiteResolver)
        {
            _itemSiteResolver = itemSiteResolver;
        }

        public override void Execute(CommandContext context)
        {
            Assert.ArgumentNotNull(context, nameof(context));
            if (context.Items.Length != 1)
            {
                return;
            }

            Item obj = context.Items[0];
            Context.ClientPage.Start(this, "Run", new NameValueCollection()
            {
                ["uri"] = obj.Uri.ToString(),
                ["config"] = context.Parameters["config"],
            }); ;
        }

        public override CommandState QueryState(CommandContext context)
        {
            Error.AssertObject(context, nameof(context));

            if (context.Items.Length != 1)
            {
                return CommandState.Hidden;
            }

            if (context.Items[0].Visualization.Layout == null)
            {
                return CommandState.Hidden;
            }

            return base.QueryState(context);
        }

        protected void Run(ClientPipelineArgs args)
        {
            Item obj1 = Database.GetItem(ItemUri.Parse(args.Parameters["uri"]));
            if (obj1 == null)
            {
                SheerResponse.Alert("Item not found.", Array.Empty<string>());
            }
            else
            {
                SheerResponse.CheckModified(false);
                SiteContext previewSiteContext = LinkManager.GetPreviewSiteContext(obj1);
                if (previewSiteContext == null)
                {
                    SheerResponse.Alert(Translate.Text("Site \"{0}\" not found", Settings.Preview.DefaultSite), Array.Empty<string>());
                }
                else
                {
                    var apiKeyId = string.Empty;
                    //We have created a folder with name "EnterpriseWeb" under "API Keys" item [/sitecore/system/Settings/Services/API Keys]. So, the following item ID belongs to "EnterpriseWeb" folder.
                    var apiKeyFolder = obj1.Database.GetItem(new ID("{21E1A27B-38FA-4026-948E-7A39C845932C}"));
                    if (apiKeyFolder != null)
                    {
                        var apiKeys = apiKeyFolder.GetChildren().ToList();
                        var apiKey = apiKeys.FirstOrDefault();

                        if (apiKey != null)
                        {
                            apiKeyId = apiKey.ID.ToString();
                        }
                    }

                    if (string.IsNullOrEmpty(apiKeyId))
                    {
                        SheerResponse.Alert("No api key found under /sitecore/system/Settings/Services/API Keys.", Array.Empty<string>());
                        return;
                    }

                    var site = _itemSiteResolver.ResolveSite(obj1);

                    var configName = string.IsNullOrWhiteSpace(args.Parameters["config"]) ? "default" : args.Parameters["config"];

                    UrlString urlString = new UrlString($"/sitecore/api/layout/render/{configName}");
                    urlString["item"] = obj1.ID.ToString();
                    urlString["sc_apikey"] = apiKeyId;
                    urlString["sc_site"] = site.Name;
                    urlString["sc_mode"] = "normal";

                    DeviceSimulationUtil.DeactivateSimulators();

                    if (UIUtil.IsChrome())
                    {
                        SheerResponse.Eval("setTimeout(function () { window.open('" + urlString + "', '_blank');}, 0);");
                    }
                    else
                    {
                        SheerResponse.Eval("window.open('" + urlString + "', '_blank');");
                    }
                }
            }
        }
    }
}
