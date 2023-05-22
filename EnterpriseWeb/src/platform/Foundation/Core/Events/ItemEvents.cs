using System;
using Sitecore.Data;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Items;
using Sitecore.Events;
using Sitecore.Diagnostics;
using Sitecore.SecurityModel;
using Sitecore;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;

namespace Platform.Foundation.Core.Events
{
    public class ItemEvents
    {
        /// <summary>
        /// Static list of current items being processed across all threads
        /// </summary>
        private static readonly SynchronizedCollection<ID> AllInProcess = new SynchronizedCollection<ID>();

        /// <summary>
        /// List of current items being processed in this instance
        /// </summary>
        private readonly SynchronizedCollection<ID> PagesToProcess = new SynchronizedCollection<ID>();

        public void OnItemSaved(object sender, EventArgs args)
        {
            var item = Event.ExtractParameter(args, 0) as Item;

            if (item == null
                || !"master".Equals(item.Database?.Name, StringComparison.OrdinalIgnoreCase)
                || !item.Paths.IsContentItem)
            {
                return;
            }

            SetPageLastUpdated(item);
        }

        public void SetPageLastUpdated(Item item)
        {
            Assert.ArgumentNotNull(item, nameof(item));

            PagesToProcess.Clear();

            SetPagesToProcess(item);

            var db = item.Database;

            var pages = PagesToProcess.Select(x => db.GetItem(x)).ToList();

            foreach (var page in pages)
            {
                try
                {
                    using (new EditContext(page, SecurityCheck.Disable))
                    {
                        page["lastUpdated"] = DateUtil.IsoNow;
                    }
                }
                catch (Exception ex)
                {
                    page.Editing.CancelEdit();
                    Log.Error($"Unable to set lastUpdated field for {page.Paths.FullPath}", ex, this);
                }
                finally
                {
                    // Remove from list regardless of whether success or failure
                    AllInProcess.Remove(page.ID);
                }
            }
        }

        private void SetPagesToProcess(Item item)
        {
            // check to see if this item was already just saved, if so exit to prevent infinite loop.  
            if (AllInProcess.Contains(item.ID))
            {
                return;
            }

            // Get all links
            var links = Globals.LinkDatabase.GetReferrers(item);

            // Get the links that are pages
            var linkedPages = links?.Select(i => i.GetSourceItem())
                .Where(i => i != null && i.Versions.IsLatestVersion() && i.InheritsFrom(Constants.TemplateIds.Foundation.Core.FieldSets.Search._IndexableItem.Template))
                .ToList() ?? new List<Item>();

            if (!linkedPages.Any(x => x.ID == item.ID) && item.InheritsFrom(Constants.TemplateIds.Foundation.Core.FieldSets.Search._IndexableItem.Template))
            {
                linkedPages.Add(item);
            }
            // Add them to our lists
            foreach (var page in linkedPages)
            {
                PagesToProcess.Add(page.ID);
                AllInProcess.Add(page.ID);
            }
        }
    }
}
