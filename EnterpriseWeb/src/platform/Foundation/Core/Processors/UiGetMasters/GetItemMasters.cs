using System.Linq;
using Platform.Foundation.Core.Constants;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Pipelines.GetMasters;
using Sitecore.Rules;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;

namespace Platform.Foundation.Core.Processors.UiGetMasters
{
    public class GetItemMasters
    {
        IMultisiteContext multisiteContext;

        public GetItemMasters(IMultisiteContext itemSiteResolver)
        {
            this.multisiteContext = itemSiteResolver;
        }

        public void Process(GetMastersArgs args)
        {
            AddSettingsMasters(args, ItemIds.Settings.Foundation.Id);
            AddSettingsMasters(args, ItemIds.Settings.Feature.Id);
            AddPerSiteMasters(args);
        }

        protected void AddSettingsMasters(GetMastersArgs args, ID rootId)
        {
            Assert.ArgumentNotNull(args, nameof(args));
            Assert.ArgumentNotNull(rootId, nameof(rootId));

            var root = args.Item.Database.GetItem(rootId);
            AddForRoot(args, root);
        }

        protected void AddPerSiteMasters(GetMastersArgs args)
        {
            Assert.ArgumentNotNull(args, nameof(args));

            var settings = this.multisiteContext.GetSettingsItem(args.Item);
            AddForRoot(args, settings);
        }

        protected void AddForRoot(GetMastersArgs args, Item root)
        {
            Assert.ArgumentNotNull(args, nameof(args));

            if (root == null)
            {
                return;
            }

            var insertOptionsSettings = root.FirstChildInheritingFrom(TemplateIds.Foundation.EnhancedInsertOptions.InsertOptionsSettings.Template);
            if (insertOptionsSettings == null)
            {
                return;
            }

            foreach (Item descendants in insertOptionsSettings.Axes.GetDescendants())
            {
                if (!descendants.InheritsFrom(TemplateIds.Foundation.EnhancedInsertOptions.InsertOptions.Template))
                {
                    continue;
                }

                var rules = descendants[TemplateIds.Foundation.EnhancedInsertOptions.InsertOptions.Fields.Rules];
                if (!EvaluateRules(rules, args.Item))
                {
                    continue;
                }

                args.Masters.Add(descendants);
            }
        }

        public static bool EvaluateRules(string strRules, Item contextItem)
        {
            if (string.IsNullOrEmpty(strRules) || strRules.Length < 70)
            {
                return false;
            }
            RuleList<RuleContext> rules = RuleFactory.ParseRules<RuleContext>(contextItem.Database, strRules);
            RuleContext ruleContext = new RuleContext()
            {
                Item = contextItem
            };
            return rules.Rules.Any(_ => _.Evaluate(ruleContext));
        }
    }
}
