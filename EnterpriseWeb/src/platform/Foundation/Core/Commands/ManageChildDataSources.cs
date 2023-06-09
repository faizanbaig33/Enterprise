﻿using System;
using Platform.Foundation.Core.Dialogs.ManageChildDataSources;
using Sitecore;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Shell.Applications.Dialogs.SortContent;
using Sitecore.Shell.Applications.WebEdit.Commands;
using Sitecore.Web;
using Sitecore.Web.UI.Sheer;

// Manage Child Item in Experience Editor
// https://smartsitecore.com/en/manage-child-item-in-experience-editor/

namespace Platform.Foundation.Core.Commands
{
    /// <summary>
    /// Opens manage child data sources dialog.
    /// </summary>
    [Serializable]
    public class ManageChildDataSources : SortContent
    {
        /// <inheritdoc/>
        protected override SortContentOptions GetOptions(ClientPipelineArgs args)
        {
            Assert.ArgumentNotNull((object)args, "args");
            Item obj = Client.ContentDatabase.GetItem(args.Parameters["itemid"], WebEditUtil.GetClientContentLanguage() ?? Context.Language);
            Assert.IsNotNull(obj, "item");
            return new ManageChildDataSourcesOptions(obj);
        }
    }
}
