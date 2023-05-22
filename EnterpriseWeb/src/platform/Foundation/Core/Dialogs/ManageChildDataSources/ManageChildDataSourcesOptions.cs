using Sitecore.Data.Items;
using Sitecore.Shell.Applications.Dialogs.SortContent;

// Manage Child Item in Experience Editor
// https://smartsitecore.com/en/manage-child-item-in-experience-editor/

namespace Platform.Foundation.Core.Dialogs.ManageChildDataSources
{
    /// <summary>
    /// Manage Content Dialog Options.
    /// </summary>
    public class ManageChildDataSourcesOptions : SortContentOptions
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ManageChildDataSourcesOptions"/> class.
        /// </summary>
        /// <param name="item">Item.</param>
        public ManageChildDataSourcesOptions(Item item)
            : base(item)
        {
        }

        /// <inheritdoc/>
        protected override string GetXmlControl()
        {
            return "Sitecore.Shell.Applications.Dialogs.EW.ManageChildDataSources";
        }
    }
}
