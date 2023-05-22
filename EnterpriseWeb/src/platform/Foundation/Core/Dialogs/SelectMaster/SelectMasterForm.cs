using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Shell.Applications.Dialogs.SelectItemWithThumbnail;
using Sitecore.Web.UI.HtmlControls;
using Sitecore.Web.UI.Sheer;

namespace Platform.Foundation.Core.Dialogs.SelectMaster
{
    public class SelectMasterForm : SelectItemWithThumbnailForm
    {
        protected Scrollbox Scrollbox;

        protected override void OnLoad(EventArgs eventArgs)
        {
            Assert.ArgumentNotNull(eventArgs, nameof(eventArgs));
            base.OnLoad(eventArgs);

            var options = SelectMasterOptions.Parse<SelectMasterOptions>();

            //scrollbox.Class = "scScrollbox scFixSize scKeepFixSize";
            Scrollbox.Background = "white";
            Scrollbox.Padding = "0px";
            Scrollbox.Width = new Unit(100.0, UnitType.Percentage);
            Scrollbox.Height = new Unit(100.0, UnitType.Percentage);
            Scrollbox.InnerHtml = this.RenderPreviews(options.Masters);
        }

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
