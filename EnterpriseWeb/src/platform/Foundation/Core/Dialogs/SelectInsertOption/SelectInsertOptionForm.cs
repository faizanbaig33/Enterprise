using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using Platform.Foundation.Core.Constants;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Shell.Applications.Dialogs.SelectItemWithThumbnail;
using Sitecore.Web.UI.HtmlControls;
using Sitecore.Web.UI.Sheer;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;
using Sitecore.XA.Foundation.SitecoreExtensions.Utils;

namespace Platform.Foundation.Core.Dialogs.SelectInsertOption
{
    public class SelectInsertOptionForm : SelectItemWithThumbnailForm
    {
        protected Tabstrip Tabs;

        protected override void OnLoad(EventArgs eventArgs)
        {
            Assert.ArgumentNotNull(eventArgs, nameof(eventArgs));
            base.OnLoad(eventArgs);

            this.Tabs.OnChange += new EventHandler(this.Tabs_OnChange);

            var selectItemOptions = SelectInsertOptionOptions.Parse<SelectInsertOptionOptions>();

            foreach (Item insertOptionsTab in selectItemOptions.InsertOptions.Children)
            {
                if (!insertOptionsTab.InheritsFrom(TemplateIds.Foundation.EnhancedInsertOptions.InsertOptionsTab.Template))
                {
                    continue;
                }

                var templateIds = (MultilistField)insertOptionsTab.Fields[TemplateIds.Foundation.EnhancedInsertOptions.InsertOptionsTab.Fields.Templates];
                var templates = templateIds
                    .TargetIDs
                    .Select(_ => Context.ContentDatabase.GetItem(_))
                    .Where(_ => _ != null);

                Scrollbox scrollbox = new Scrollbox();
                scrollbox.Class = "scScrollbox scFixSize scKeepFixSize";
                scrollbox.Background = "white";
                scrollbox.Padding = "0px";
                scrollbox.Width = new Unit(100.0, UnitType.Percentage);
                scrollbox.Height = new Unit(100.0, UnitType.Percentage);
                scrollbox.InnerHtml = this.RenderPreviews(templates);

                Tab tab = new Tab();
                tab.Header = insertOptionsTab.Name;
                tab.Controls.Add(scrollbox);
                this.Tabs.Controls.Add(tab);
            }
        }

        protected virtual void Tabs_OnChange(object sender, EventArgs e) => SheerUtils.InitializeFixsizeElements();

        protected override bool IsItemSelectable(Item item) => true;

        protected virtual string RenderPreviews(IEnumerable<Item> items)
        {
            Assert.ArgumentNotNull(items, nameof(items));
            var htmlTextWriter = new HtmlTextWriter(new StringWriter());
            foreach (var item in items)
            {
                this.RenderItemPreview(item, htmlTextWriter);
            }
            return items.Any() ? htmlTextWriter.InnerWriter.ToString() : this.RenderEmptyPreview();
        }

        protected virtual string RenderEmptyPreview()
        {
            HtmlTextWriter output = new HtmlTextWriter(new StringWriter());
            output.Write("<table class='scEmptyPreview'>");
            output.Write("<tbody>");
            output.Write("<tr>");
            output.Write("<td>");
            output.Write("None available.");
            output.Write("</td>");
            output.Write("</tr>");
            output.Write("</tbody>");
            output.Write("</table>");
            return output.InnerWriter.ToString();
        }

        protected override void OnOK(object sender, EventArgs args)
        {
            Assert.ArgumentNotNull(sender, nameof(sender));
            Assert.ArgumentNotNull(args, nameof(args));
            if (string.IsNullOrEmpty(SelectedItemId))
            {
                SheerResponse.Alert("Select an item.");
                return;
            }

            var selectedItem = Context.ContentDatabase.GetItem(new ID(SelectedItemId));
            if (selectedItem == null)
            {
                SheerResponse.Alert("Select an item.");
                return;
            }
            this.SetDialogResult(selectedItem);
            SheerResponse.CloseWindow();
        }
    }
}
