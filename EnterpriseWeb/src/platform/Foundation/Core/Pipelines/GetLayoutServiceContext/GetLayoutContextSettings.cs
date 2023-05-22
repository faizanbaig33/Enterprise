using System;
using System.Collections.Generic;
using Platform.Foundation.Core.Extensions;
using Sitecore.Data;
using Sitecore.JavaScriptServices.Configuration;
using Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.GetLayoutServiceContext;
using Sitecore.LayoutService.Helpers;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;
using Sitecore.Links;

namespace Platform.Foundation.Core.Pipelines.GetLayoutServiceContext
{
    public class GetLayoutContextSettings : JssGetLayoutServiceContextProcessor
    {

        public GetLayoutContextSettings(IConfigurationResolver configurationResolver) : base(configurationResolver)
        {
        }

        protected override void DoProcess(GetLayoutServiceContextArgs args, AppConfiguration application)
        {
            try
            {
                AddLayoutContextSettings(args);
                AddBreadcrumb(args);
            }
            catch (Exception e)
            {
                args.ContextData.Add("getLayoutContextSettingsError", new
                {
                    message = e.Message,
                    stackTrace = e.StackTrace
                });
            }
        }

        private static void AddBreadcrumb(GetLayoutServiceContextArgs args)
        {
            var breadcrumb = new List<Object>();
            var currentItem = args.RenderedItem;
            if (currentItem == null)
            {
                throw new Exception("GetLayoutContextSettings: currentItem was null");
            }

            while (currentItem != null)
            {
                var name = string.IsNullOrWhiteSpace(currentItem.GetFieldValue("breadcrumbTitle")) ?
                    currentItem.GetFieldValue("pageTitle") : currentItem.GetFieldValue("breadcrumbTitle");

                breadcrumb.Add(new
                {
                    name,
                    href = LinkManager.GetItemUrl(currentItem, ItemUrlHelper.GetLayoutServiceUrlOptions())
                });

                currentItem = currentItem.Parent.GetFirstParentOfBaseTemplate("{ABF549D3-3225-4821-9336-3D395CD86D32}"); //_Base Page
            }
            breadcrumb.Reverse();

            args.ContextData.Add("breadcrumb", breadcrumb);
        }

        private static void AddLayoutContextSettings(GetLayoutServiceContextArgs args)
        {
            var headlessSiteItem = args.RenderedItem.GetFirstParentOfBaseTemplate("{9ED66404-64C9-4122-90E1-869CB3CEA566}"); //Base Headless Site
            if (headlessSiteItem == null)
            {
                throw new Exception("GetLayoutContextSettings: headlessSiteItem was null");
            }
            var settingsItem = headlessSiteItem.GetFirstChildOfBaseTemplate(new ID("{EC848505-D30C-4BDC-A0AA-7CC9D320085E}")); //Base Headless Settings
            if (settingsItem == null)
            {
                throw new Exception("GetLayoutContextSettings: settingsItem was null");
            }
            var contextSettingsItem = settingsItem.GetFirstChildOfTemplate(new ID("{74B06D13-0249-4D12-A842-FAB6336DEEB1}")); //Layout Context Settings

            if (contextSettingsItem == null)
            {
                throw new Exception("GetLayoutContextSettings: contextSettingsItem was null");
            }
            if (contextSettingsItem != null)
            {
                args.ContextData.Add("gtmSettings", new
                {
                    id = contextSettingsItem.GetFieldValue("gtmId"),
                    parameters = contextSettingsItem.GetFieldValue("gtmParameters")
                });
                args.ContextData.Add("favIcon", new
                {
                    svg = contextSettingsItem.GetFieldValue("faviconSvg")
                });
                args.ContextData.Add("locationId", new
                {
                    locationId = contextSettingsItem.GetFieldValue("locationId")
                });
            }
        }
    }
}
