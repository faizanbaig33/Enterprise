using System;
using Sitecore;
using Sitecore.Diagnostics;
using Sitecore.Pipelines;
using Sitecore.Shell.Framework.Commands;
using Sitecore.Web.UI.Sheer;
using Sitecore.XA.Foundation.TokenResolution.Pipelines.ResolveTokens;

namespace Platform.Foundation.Core.Commands
{
    [Serializable]
    public class InsertElement : Command
    {
        public override void Execute(CommandContext context)
        {
            if (context.Items.Length != 1 || !context.Items[0].Access.CanCreate())
            {
                return;
            }

            var resolveTokensArgs = new ResolveTokensArgs
            {
                ContextItem = context.Items[0],
                Query = "$site/data/elements",
            };
            CorePipeline.Run("resolveTokens", resolveTokensArgs);
            var elementRoot = Context.ContentDatabase.GetItem(resolveTokensArgs.Query);
            Log.Warn("resolveTokensArgs.Query", this);

            if (elementRoot == null)
            {
                SheerResponse.Alert($"Element root folder not found.");
                return;
            }

            var eventName = string.Format("webedit:new(navigate=0,id={0})", elementRoot.ID);
            Context.ClientPage.SendMessage(this, eventName);
        }
    }
}
