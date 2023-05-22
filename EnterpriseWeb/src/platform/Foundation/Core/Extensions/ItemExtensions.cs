using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Collections;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Links;
using Sitecore.Resources.Media;
using Sitecore.Sites;
using Sitecore.Web;

namespace Platform.Foundation.Core.Extensions
{
    public static class ItemExtensions
    {
        public static IEnumerable<Item> GetDescendants(this Item i, bool returnRootItem = false)
        {
            if (returnRootItem)
            {
                yield return i;
            }

            foreach (Item c in i.GetChildren(ChildListOptions.SkipSorting))
            {
                foreach (var subChild in c.GetDescendants(true))
                {
                    yield return subChild;
                }
            }
        }

        public static List<Item> GetSelectedItems(this Item i, string multiListFieldName)
        {
            if (i == null)
            {
                return new List<Item>();
            }

            MultilistField mlf = i.Fields[multiListFieldName];
            return mlf != null ? mlf.GetItems().ToList() : new List<Item>();
        }

        public static Item GetInternalLinkFieldItem(this Item i, string internalLinkFieldName)
        {
            InternalLinkField ilf = i?.Fields[internalLinkFieldName];
            return ilf?.TargetItem;
        }

        public static Item GetLinkTargetItem(this Item item, string fieldName)
        {
            LinkField lf = item?.Fields[fieldName];
            return lf?.TargetItem;
        }

        public static string GetFieldValue(this Item item, string fieldName, string nullValue = "")
        {
            if (item == null)
            {
                return nullValue;
            }

            if (item.Fields[fieldName] == null)
            {
                return nullValue;
            }

            return (string.IsNullOrWhiteSpace(item.Fields[fieldName].Value)) ? nullValue : item.Fields[fieldName].Value;
        }

        public static string GetMediaUrl(this Item item, string fieldName)
        {
            if (item == null)
            {
                return string.Empty;
            }

            var imgField = (ImageField)item.Fields[fieldName];
            if (imgField?.MediaItem != null)
            {
                return MediaManager.GetMediaUrl(imgField.MediaItem);
            }

            return string.Empty;
        }

        public static bool GetCheckBoxFieldValue(this Item i, string fieldName, bool defaultReturnValue)
        {
            var returnValue = GetCheckBoxFieldNullableValue(i, fieldName);
            return returnValue ?? defaultReturnValue;
        }

        public static bool? GetCheckBoxFieldNullableValue(this Item i, string fieldName)
        {
            bool? returnValue = null;
            CheckboxField cbf = i?.Fields[fieldName];
            if (cbf != null)
            {
                returnValue = cbf.Checked;
            }
            return returnValue;
        }

        /// <summary>
        /// Access Droplink, Droptree, and Grouped Droplink fields
        /// </summary>
        /// <returns>The Sitecore target item</returns>
        public static Item GetReferenceTargetItem(this Item item, string fieldName)
        {
            ReferenceField rf = item?.Fields[fieldName];
            return rf?.TargetItem;
        }

        public static bool HasAncestor(this Item item, string parentId) => item != null && item.Paths.LongID.Contains(parentId);

        public static Item GetFirstChildOfTemplate(this Item item, ID templateId)
        {
            return item?.GetChildren().FirstOrDefault(e => e.TemplateID == templateId);
        }
        public static Item GetFirstChildOfBaseTemplate(this Item item, ID templateId)
        {
            return item?.GetChildren().FirstOrDefault(e => HasBaseTemplate(e, templateId.ToString()));
        }

        public static Item GetFirstParentOfTemplate(this Item currentItem, string baseTemplateNameOrId)
        {
            if (currentItem == null)
            {
                return null;
            }
            if (IsMatchOnTemplateNameOrId(baseTemplateNameOrId, currentItem.Template))
            {
                return currentItem;
            }
            var parent = currentItem.Parent;
            while (parent != null && IsMatchOnTemplateNameOrId(baseTemplateNameOrId, parent.Template) == false)
            {
                parent = parent.Parent;
            }
            return parent;
        }
        public static Item GetFirstParentOfBaseTemplate(this Item currentItem, string baseTemplateNameOrId)
        {
            if (currentItem == null)
            {
                return null;
            }
            if (HasBaseTemplate(currentItem, baseTemplateNameOrId))
            {
                return currentItem;
            }
            var parent = currentItem.Parent;
            while (parent != null && HasBaseTemplate(parent, baseTemplateNameOrId) == false)
            {
                parent = parent.Parent;
            }
            return parent;
        }

        public static bool IsNull(this Item item)
        {
            return item == null || item.Version.Number == 0;
        }

        public static bool HasBaseTemplate(this Item item, string baseTemplateNameOrId)
        {
            if (IsNull(item) || item.TemplateID.IsNull) return false;

            var template = item.Template;

            if (template == null) return false;

            return IsMatchOnTemplateNameOrId(baseTemplateNameOrId, template) || HasBaseTemplateHelper(item.Template.BaseTemplates, baseTemplateNameOrId);
        }

        private static bool HasBaseTemplateHelper(TemplateItem[] baseTemplates, string baseTemplateNameOrId)
        {
            var templateFound = false;
            foreach (var baseTemplateItem in baseTemplates.Where(baseTemplateItem => !IsNull(baseTemplateItem) && !baseTemplateItem.ID.IsNull))
            {
                templateFound = IsMatchOnTemplateNameOrId(baseTemplateNameOrId, baseTemplateItem) || HasBaseTemplateHelper(baseTemplateItem.BaseTemplates, baseTemplateNameOrId);

                if (templateFound)
                {
                    break;
                }
            }
            return templateFound;
        }

        private static bool IsMatchOnTemplateNameOrId(string baseTemplateNameOrId, TemplateItem baseTemplateItem)
        {
            return baseTemplateItem.ID.Guid.ToString("B").Equals(baseTemplateNameOrId, StringComparison.OrdinalIgnoreCase) ||
                   baseTemplateItem.FullName.Equals(baseTemplateNameOrId, StringComparison.OrdinalIgnoreCase) ||
                   baseTemplateItem.Name.Equals(baseTemplateNameOrId, StringComparison.OrdinalIgnoreCase);
        }

        public static SiteContext GetSiteContext(this Item i)
        {
            var list = Sitecore.Configuration.Factory.GetSiteInfoList().OrderByDescending(x => x.RootPath.Length).Where(x => x.Domain != "sitecore" && !x.VirtualFolder.StartsWith("/sitecore")).ToList();
            var si = list.FirstOrDefault(x => i.Paths.FullPath.StartsWith(x.RootPath + x.StartItem, StringComparison.InvariantCultureIgnoreCase));
            if (si != null)
            {
                return SiteContext.GetSite(si.Name);
            }
            return null;
        }

        public static bool HasLayout(this Item item)
        {
            return item?.Visualization.GetLayout(Sitecore.Context.Device) != null;
        }

        /// <summary>
        /// Gets the first child of templateId type for the item passed 
        /// </summary>
        /// <param name="item"></param>
        /// <param name="templateId"></param>
        /// <returns>item</returns>
        public static Item GetFirstChildOfItem(this Item item, ID templateId)
        {
            return item?.GetChildren()?.Where(x => x.TemplateID == templateId).FirstOrDefault();
        }

        /// <summary>
        /// Get the url of the item provided based on the default url options
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public static string GetItemUrl(this Item item)
        {
            if (item == null)
                return string.Empty;

            var options = GetDefaultOptionsUrlOptions(true);

            return LinkManager.GetItemUrl(item, options);
        }

        public static string GetItemUrl(this Guid guid)
        {
            var item = GetItem(guid);
            return GetItemUrl(item);
        }

        public static string GetAppliedSiteContextItemUrl(this Guid guid)
        {
            var item = GetItem(guid);
            return item.GetAppliedSiteContextItemUrl();
        }

        public static Item GetItem(this Guid guid)
        {
            return guid != Guid.Empty ? Sitecore.Context.Database.GetItem(new ID(guid)) : null;
        }

        /// <summary>
        /// Get the url of the item provided based on its site context
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public static string GetAppliedSiteContextItemUrl(this Item item)
        {
            if (item == null)
            {
                return string.Empty;
            }

            var site = item.GetSiteInfo();

            if (site == null)
            {
                return GetItemUrl(item);
            }

            var targetSiteContext = SiteContext.GetSite(site.Name);

            if (targetSiteContext == null)
            {
                return GetItemUrl(item);
            }

            var options = GetDefaultOptionsUrlOptions(true);
            options.Site = targetSiteContext;

            string itemUrl;
            using (new SiteContextSwitcher(targetSiteContext))
            {
                itemUrl = LinkManager.GetItemUrl(item, options);
            }

            return string.IsNullOrEmpty(itemUrl) ? GetItemUrl(item) : itemUrl;
        }

        public static Guid GetItemIdGuid(this Item item)
        {
            return item != null && item.ID != (ID)null ? item.ID.Guid : Guid.Empty;
        }

        public static bool IsGuidNullOrEmpty(Guid? guid)
        {
            return (!guid.HasValue || guid.Value == Guid.Empty);
        }

        public static Item GetParentByTemplate(Item item, ID parentTemplateId)
        {
            return item?.Axes.GetAncestors().FirstOrDefault(a => a.TemplateID == parentTemplateId);
        }

        /// <summary>
        /// Gets the Sitecore item based on the url provided
        /// </summary>
        /// <param name="url"></param>
        /// <returns>item</returns>
        public static Item GetItemFromUrl(string url)
        {
            var currentUrl = new Uri(url);

            if (string.IsNullOrEmpty(currentUrl.Host))
                return null;

            // Obtain a SiteContext for the host and virtual path
            var siteContext = SiteContextFactory.GetSiteContext(currentUrl.Host, currentUrl.PathAndQuery);

            // Get the path to the Home item
            var homePath = siteContext.StartPath;
            if (!homePath.EndsWith("/"))
                homePath += "/";

            // Get the path to the item, removing virtual path if any
            var itemPath = Sitecore.MainUtil.DecodeName(currentUrl.AbsolutePath);
            if (itemPath.StartsWith(siteContext.VirtualFolder))
                itemPath = itemPath.Remove(0, siteContext.VirtualFolder.Length);

            // Obtain the item
            var fullPath = homePath + itemPath;
            Item item = siteContext.Database.GetItem(fullPath);

            if (item != null)
                return item;

            url = url.Substring(0, url.LastIndexOf("/", StringComparison.Ordinal)); //remove the last "/url-segment" and try to resolve the remaining url part
            item = GetItemFromUrl(url);

            return item;
        }

        /// <summary>
        /// Get the related site info for an item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public static SiteInfo GetSiteInfo(this Item item)
        {
            if (item == null)
            {
                return null;
            }

            var siteInfoList = Sitecore.Configuration.Factory.GetSiteInfoList().ToList();

            if (!siteInfoList.Any())
            {
                return null;
            }

            var siteInfos = siteInfoList
                .Where(
                    siteInfo => !siteInfo.Name.ToLower().Contains("coveo")
                                && siteInfo.Name.ToLower() != "shell"
                                && siteInfo.Name.ToLower() != "login"
                                && siteInfo.Name.ToLower() != "admin"
                                && siteInfo.Name.ToLower() != "service"
                                && siteInfo.Name.ToLower() != "modules_shell"
                                && siteInfo.Name.ToLower() != "modules_website"
                                && siteInfo.Name.ToLower() != "system"
                                && siteInfo.Name.ToLower() != "scheduler"
                                && siteInfo.Name.ToLower() != "publisher"
                                && !string.IsNullOrEmpty(siteInfo.RootPath)
                                && !string.IsNullOrEmpty(siteInfo.StartItem)
                                && item.Paths.FullPath.ToLower().StartsWith($"{siteInfo.RootPath.ToLower()}{siteInfo.StartItem.ToLower()}")
            );

            return siteInfos.FirstOrDefault();
        }

        public static string GetSitePath(this Item item)
        {
            if (item == null)
            {
                return null;
            }

            var siteInfo = item.GetSiteInfo();

            return siteInfo == null
                ? null
                : $"{siteInfo.RootPath}{siteInfo.StartItem}";
        }

        public static UrlOptions GetDefaultOptionsUrlOptions(bool alwaysIncludeServerUrl = false)
        {
            var options = (UrlOptions)UrlOptions.DefaultOptions.Clone();
            options.AlwaysIncludeServerUrl = alwaysIncludeServerUrl;

            return options;
        }

        public static string GetMetadataTagNames(this Item item, string fieldName, bool isOnlyItemName = false)
        {
            if (item == null || string.IsNullOrEmpty(fieldName))
            {
                return null;
            }

            var tagValues = new List<string>();
            var field = item.Fields[fieldName];

            if (field != null && field.HasValue)
            {
                var fieldValues = field.Value;
                var tags = fieldValues.Split('|').ToList();

                foreach (var tag in tags)
                {
                    var isValidTagGuid = Guid.TryParse(tag, out var tagGuid);

                    if (isValidTagGuid && !string.IsNullOrEmpty(tag))
                    {
                        var tagItem = item.Database?.GetItem(new ID(tagGuid));
                        var tagName = isOnlyItemName ? tagItem?.Name : tagItem?.Fields["Tag Name"]?.Value;

                        if (!string.IsNullOrEmpty(tagName))
                        {
                            tagValues.Add(tagName);
                        }
                    }
                }
            }

            return tagValues.Count == 0
                ? null
                : tagValues.Count == 1
                    ? tagValues.First()
                    : string.Join(", ", tagValues)
                ;
        }
    }
}
