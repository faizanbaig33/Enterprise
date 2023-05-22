using System;
using Platform.Foundation.Core.ItemAsResources;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Pipelines.GetContentEditorWarnings;

namespace Platform.Foundation.Core.Pipelines.GetContentEditorWarnings
{
    public class IsItemAsResource
    {
        public void Process(GetContentEditorWarningsArgs args)
        {
            if (args.Item == null)
            {
                return;
            }

            try
            {
                if (args.Item.Database.DataManager.DataSource.GetItemLocations(args.Item.ID).IsOverridden())
                {
                    var warning = args.Add();
                    warning.Title = Translate.Text("Item as Resource Overriden");
                    warning.Text = Translate.Text("This item is in a resource file and in the database. Deleting it will restore it to the version in the resource file.");
                }
                else if (args.Item.Database.DataManager.DataSource.GetItemLocations(args.Item.ID).IsResource())
                {
                    var warning = args.Add();
                    warning.Title = Translate.Text("Item as Resource");
                    warning.Text = Translate.Text("This item is in a resource file and should not be edited.");
                }
            }
            catch (Exception ex)
            {
                var warning = args.Add();
                warning.Title = Translate.Text("Item as Resource Exception");
                warning.Text = Translate.Text("An exception ocurred while trying to display Item as Resource information, please check the logs for more details.");
                Log.Error("IsItemAsResource!Process: An exception ocurred while trying to display Item as Resource information", ex, this);
            }
        }
    }
}
