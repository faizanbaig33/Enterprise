using System;
using System.Collections.Specialized;
using System.Web;
using System.Xml;
using Sitecore;
using Sitecore.Collections;
using Sitecore.Data.Databases;
using Sitecore.Data.Events;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Data.Templates;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Layouts;
using Sitecore.Shell.Applications.Dialogs;
using Sitecore.Shell.Applications.Dialogs.LayoutDetails;
using Sitecore.Shell.Applications.Layouts.DeviceEditor;
using Sitecore.Shell.Framework;
using Sitecore.Shell.Web.UI;
using Sitecore.Sites;
using Sitecore.Text;
using Sitecore.Web;
using Sitecore.Web.UI.HtmlControls;
using Sitecore.Web.UI.Pages;
using Sitecore.Web.UI.Sheer;
using Sitecore.Xml;

namespace Platform.Foundation.Core.Dialogs.LayoutDetails
{
    /// <summary>Represents a gallery layout form.</summary>
    public class LayoutDetailsForm : DialogForm
    {
        /// <summary>The layout panel.</summary>
        protected Border LayoutPanel;
        /// <summary>The final layout panel.</summary>
        protected Border FinalLayoutPanel;
        /// <summary>The final layout warning panel.</summary>
        protected Border FinalLayoutNoVersionWarningPanel;
        /// <summary>The shared layout tab.</summary>
        protected Tab SharedLayoutTab;
        /// <summary>The final layout tab.</summary>
        protected Tab FinalLayoutTab;
        /// <summary>The tabs.</summary>
        protected Tabstrip Tabs;
        /// <summary>The title of the warning.</summary>
        protected Literal WarningTitle;

        /// <summary>
        /// Initialize new instance of <see cref="T:Sitecore.Shell.Applications.ContentManager.Dialogs.LayoutDetails.LayoutDetailsForm" />.
        /// </summary>
        public LayoutDetailsForm() => this.DatabaseHelper = new DatabaseHelper();

        /// <summary>
        /// The instance of <see cref="P:Sitecore.Shell.Applications.ContentManager.Dialogs.LayoutDetails.LayoutDetailsForm.DatabaseHelper" />.
        /// </summary>
        protected DatabaseHelper DatabaseHelper { get; set; }

        /// <summary>Gets or sets the layout.</summary>
        /// <value>The layout.</value>
        public virtual string Layout
        {
            get => StringUtil.GetString(this.ServerProperties[nameof(Layout)]);
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                this.ServerProperties[nameof(Layout)] = (object)value;
            }
        }

        /// <summary>Gets or sets the final layout.</summary>
        /// <value>The final layout.</value>
        public virtual string FinalLayout
        {
            get
            {
                string layoutDelta = this.LayoutDelta;
                if (string.IsNullOrWhiteSpace(layoutDelta))
                    return this.Layout;
                return string.IsNullOrWhiteSpace(this.Layout) ? layoutDelta : XmlDeltas.ApplyDelta(this.Layout, layoutDelta);
            }
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                if (!string.IsNullOrWhiteSpace(this.Layout))
                    this.LayoutDelta = XmlUtil.XmlStringsAreEqual(this.Layout, value) ? (string)null : XmlDeltas.GetDelta(value, this.Layout);
                else
                    this.LayoutDelta = value;
            }
        }

        /// <summary>Gets or sets the layout delta.</summary>
        /// <value>The layout delta.</value>
        protected virtual string LayoutDelta
        {
            get => StringUtil.GetString(this.ServerProperties[nameof(LayoutDelta)]);
            set => this.ServerProperties[nameof(LayoutDelta)] = (object)value;
        }

        /// <summary>
        /// Gets or sets the value indicating whether version has been created.
        /// </summary>
        /// <value>The value indicating whether version has been created.</value>
        protected bool VersionCreated
        {
            get => MainUtil.GetBool(this.ServerProperties[nameof(VersionCreated)], false);
            set => this.ServerProperties[nameof(VersionCreated)] = (object)value;
        }

        /// <summary>Gets the current active tab.</summary>
        /// <value>The active tab.</value>
        private LayoutDetailsForm.TabType ActiveTab
        {
            get
            {
                switch (this.Tabs.Active)
                {
                    case 0:
                        return LayoutDetailsForm.TabType.Final;
                    case 1:
                        return LayoutDetailsForm.TabType.Shared;
                    default:
                        return LayoutDetailsForm.TabType.Unknown;
                }
            }
        }

        /// <summary>Handles the message.</summary>
        /// <param name="message">The message.</param>
        public override void HandleMessage(Message message)
        {
            Assert.ArgumentNotNull((object)message, nameof(message));
            if (message.Name == "item:addversion")
            {
                Item currentItem = LayoutDetailsForm.GetCurrentItem();
                Dispatcher.Dispatch(message, currentItem);
            }
            else
                base.HandleMessage(message);
        }

        /// <summary>Copy the device.</summary>
        /// <param name="deviceID">The device ID.</param>
        protected void CopyDevice(string deviceID)
        {
            Assert.ArgumentNotNullOrEmpty(deviceID, nameof(deviceID));
            Context.ClientPage.Start((object)this, "CopyDevicePipeline", new NameValueCollection()
      {
        {
          "deviceid",
          deviceID
        }
      });
        }

        /// <summary>Copy the device pipeline.</summary>
        /// <param name="args">The arguments.</param>
        protected void CopyDevicePipeline(ClientPipelineArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            if (args.IsPostBack)
            {
                if (string.IsNullOrEmpty(args.Result) || !(args.Result != "undefined"))
                    return;
                string[] strArray = args.Result.Split('^');
                string str = StringUtil.GetString(args.Parameters["deviceid"]);
                ListString devices = new ListString(strArray[0]);
                string itemPath = strArray[1];
                XmlNode sourceDevice = this.GetDoc().SelectSingleNode("/r/d[@id='" + str + "']");
                if (itemPath == WebUtil.GetQueryString("id"))
                {
                    if (sourceDevice != null)
                        this.CopyDevice(sourceDevice, devices);
                }
                else if (sourceDevice != null)
                {
                    Language result;
                    if (!Language.TryParse(WebUtil.GetQueryString("la"), out result))
                        result = Context.Language;
                    Sitecore.Data.Version version = Sitecore.Data.Version.Parse(WebUtil.GetQueryString("ve"));
                    Item itemNotNull = Client.GetItemNotNull(itemPath, result, version);
                    this.CopyDevice(sourceDevice, devices, itemNotNull);
                }
                this.Refresh();
            }
            else
            {
                WebUtil.SetSessionValue("SC_DEVICEEDITOR", (object)this.GetDoc().OuterXml);
                SheerResponse.ShowModalDialog(new UrlString(UIUtil.GetUri("control:CopyDeviceTo"))
                {
                    ["de"] = StringUtil.GetString(args.Parameters["deviceid"]),
                    ["fo"] = WebUtil.GetQueryString("id")
                }.ToString(), "1200px", "700px", string.Empty, true);
                args.WaitForPostBack();
            }
        }

        /// <summary>Gets the layout value from the active tab.</summary>
        /// <returns>The layout value.</returns>
        protected string GetActiveLayout() => this.ActiveTab == LayoutDetailsForm.TabType.Shared ? this.Layout : this.FinalLayout;

        /// <summary>Gets the dialog result.</summary>
        /// <returns>An aggregated XML with the both layouts shared and final.</returns>
        protected string GetDialogResult() => new LayoutDetailsDialogResult()
        {
            Layout = this.Layout,
            FinalLayout = this.FinalLayout,
            VersionCreated = this.VersionCreated
        }.ToString();

        /// <summary>Sets the layout value on the active tab.</summary>
        /// <param name="value">The value.</param>
        protected void SetActiveLayout(string value)
        {
            if (this.ActiveTab == LayoutDetailsForm.TabType.Final)
                this.FinalLayout = value;
            else
                this.Layout = value;
        }

        /// <summary>Edits the placeholder.</summary>
        /// <param name="deviceID">The device ID.</param>
        /// <param name="uniqueID">The unique ID.</param>
        protected void EditPlaceholder(string deviceID, string uniqueID)
        {
            Assert.ArgumentNotNull((object)deviceID, nameof(deviceID));
            Assert.ArgumentNotNullOrEmpty(uniqueID, nameof(uniqueID));
            Context.ClientPage.Start((object)this, "EditPlaceholderPipeline", new NameValueCollection()
      {
        {
          "deviceid",
          deviceID
        },
        {
          "uniqueid",
          uniqueID
        }
      });
        }

        /// <summary>Edits the placeholder pipeline.</summary>
        /// <param name="args">The arguments.</param>
        protected void EditPlaceholderPipeline(ClientPipelineArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            LayoutDefinition layoutDefinition = LayoutDefinition.Parse(this.GetDoc().OuterXml);
            PlaceholderDefinition placeholder = layoutDefinition.GetDevice(args.Parameters["deviceid"]).GetPlaceholder(args.Parameters["uniqueid"]);
            if (placeholder == null)
                return;
            if (args.IsPostBack)
            {
                if (string.IsNullOrEmpty(args.Result) || !(args.Result != "undefined"))
                    return;
                string placeholderKey;
                Item dialogResult = SelectPlaceholderSettingsOptions.ParseDialogResult(args.Result, Client.ContentDatabase, out placeholderKey);
                if (dialogResult != null)
                    placeholder.MetaDataItemId = dialogResult.ID.ToString();
                if (!string.IsNullOrEmpty(placeholderKey))
                    placeholder.Key = placeholderKey;
                this.SetActiveLayout(layoutDefinition.ToXml());
                this.Refresh();
            }
            else
            {
                Item itemByPathOrId = this.DatabaseHelper.GetItemByPathOrId(Client.ContentDatabase, placeholder.MetaDataItemId);
                SelectPlaceholderSettingsOptions placeholderSettingsOptions1 = new SelectPlaceholderSettingsOptions();
                placeholderSettingsOptions1.TemplateForCreating = (Template)null;
                placeholderSettingsOptions1.PlaceholderKey = placeholder.Key;
                placeholderSettingsOptions1.CurrentSettingsItem = itemByPathOrId;
                placeholderSettingsOptions1.SelectedItem = itemByPathOrId;
                placeholderSettingsOptions1.IsPlaceholderKeyEditable = true;
                SelectPlaceholderSettingsOptions placeholderSettingsOptions2 = placeholderSettingsOptions1;
                SafeDictionary<string> queryString = WebUtil.ParseQueryString(HttpContext.Current.Request.Url.Query);
                if (queryString.ContainsKey("id"))
                {
                    string str1 = HttpUtility.UrlDecode(queryString["id"]);
                    string str2 = "contextItemId";
                    placeholderSettingsOptions2.Parameters = str2 + "=" + str1;
                }
                SheerResponse.ShowModalDialog(placeholderSettingsOptions2.ToUrlString().ToString(), "460px", "460px", string.Empty, true);
                args.WaitForPostBack();
            }
        }

        /// <summary>Edits the rendering.</summary>
        /// <param name="deviceID">The device ID.</param>
        /// <param name="index">The index.</param>
        protected void EditRendering(string deviceID, string index)
        {
            Assert.ArgumentNotNull((object)deviceID, nameof(deviceID));
            Assert.ArgumentNotNull((object)index, nameof(index));
            Context.ClientPage.Start((object)this, "EditRenderingPipeline", new NameValueCollection()
      {
        {
          "deviceid",
          deviceID
        },
        {
          nameof (index),
          index
        }
      });
        }

        /// <summary>Edits the rendering pipeline.</summary>
        /// <param name="args">The arguments.</param>
        protected void EditRenderingPipeline(ClientPipelineArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            RenderingParameters renderingParameters = new RenderingParameters();
            renderingParameters.Args = args;
            renderingParameters.DeviceId = StringUtil.GetString(args.Parameters["deviceid"]);
            renderingParameters.SelectedIndex = MainUtil.GetInt(StringUtil.GetString(args.Parameters["index"]), 0);
            renderingParameters.Item = UIUtil.GetItemFromQueryString(Client.ContentDatabase);
            if (!args.IsPostBack)
                WebUtil.SetSessionValue("SC_DEVICEEDITOR", (object)this.GetDoc().OuterXml);
            if (!renderingParameters.Show())
                return;
            XmlDocument doc = XmlUtil.LoadXml(WebUtil.GetSessionString("SC_DEVICEEDITOR"));
            WebUtil.SetSessionValue("SC_DEVICEEDITOR", (object)null);
            this.SetActiveLayout(LayoutDetailsForm.GetLayoutValue(doc));
            this.Refresh();
        }

        /// <summary>Raises the load event.</summary>
        /// <param name="e">
        /// The <see cref="T:System.EventArgs" /> instance containing the event data.
        /// </param>
        /// <remarks>
        /// This method notifies the server control that it should perform actions common to each HTTP
        /// request for the page it is associated with, such as setting up a database query. At this
        /// stage in the page lifecycle, server controls in the hierarchy are created and initialized,
        /// view state is restored, and form controls reflect client-side data. Use the IsPostBack
        /// property to determine whether the page is being loaded in response to a client postback,
        /// or if it is being loaded and accessed for the first time.
        /// </remarks>
        protected override void OnLoad(EventArgs e)
        {
            Assert.CanRunApplication("Content Editor/Ribbons/Chunks/Layout");
            Assert.ArgumentNotNull((object)e, nameof(e));
            base.OnLoad(e);
            this.Tabs.OnChange += (EventHandler)((sender, args) => this.Refresh());
            if (!Context.ClientPage.IsEvent)
            {
                Item currentItem = LayoutDetailsForm.GetCurrentItem();
                Assert.IsNotNull((object)currentItem, "Item not found");
                this.Layout = LayoutField.GetFieldValue(currentItem.Fields[FieldIDs.LayoutField]);
                Sitecore.Data.Fields.Field field = currentItem.Fields[FieldIDs.FinalLayoutField];
                this.LayoutDelta = !(currentItem.Name != "__Standard Values") ? field.GetStandardValue() : field.GetValue(false, false) ?? field.GetInheritedValue(false) ?? field.GetValue(false, false, true, false, false);
                this.ToggleVisibilityOfControlsOnFinalLayoutTab(currentItem);
                this.Refresh();
            }
            SiteContext site = Context.Site;
            if (site == null)
                return;
            site.Notifications.ItemSaved += new ItemSavedDelegate(this.ItemSavedNotification);
        }

        /// <summary>
        /// Toggles the visibility of controls on final layout tab.
        /// </summary>
        /// <param name="item">The item.</param>
        protected void ToggleVisibilityOfControlsOnFinalLayoutTab(Item item)
        {
            bool flag = item.Versions.Count > 0;
            this.FinalLayoutPanel.Visible = flag;
            this.FinalLayoutNoVersionWarningPanel.Visible = !flag;
            if (flag)
                return;
            this.WarningTitle.Text = string.Format(Translate.Text("The current item does not have a version in \"{0}\"."), (object)item.Language.GetDisplayName());
        }

        /// <summary>Handles a click on the OK button.</summary>
        /// <param name="sender">The sender.</param>
        /// <param name="args">The arguments.</param>
        /// <remarks>
        /// When the user clicks OK, the dialog is closed by calling
        /// the <see cref="M:Sitecore.Web.UI.Sheer.ClientResponse.CloseWindow">CloseWindow</see> method.
        /// </remarks>
        protected override void OnOK(object sender, EventArgs args)
        {
            Assert.ArgumentNotNull(sender, nameof(sender));
            Assert.ArgumentNotNull((object)args, nameof(args));
            SheerResponse.SetDialogValue(this.GetDialogResult());
            base.OnOK(sender, args);
        }

        /// <summary>Opens the device.</summary>
        /// <param name="deviceID">The device ID.</param>
        protected void OpenDevice(string deviceID)
        {
            Assert.ArgumentNotNullOrEmpty(deviceID, nameof(deviceID));
            Context.ClientPage.Start((object)this, "OpenDevicePipeline", new NameValueCollection()
      {
        {
          "deviceid",
          deviceID
        }
      });
        }

        /// <summary>Opens the device pipeline.</summary>
        /// <param name="args">The arguments.</param>
        protected void OpenDevicePipeline(ClientPipelineArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            if (args.IsPostBack)
            {
                if (string.IsNullOrEmpty(args.Result) || !(args.Result != "undefined"))
                    return;
                XmlDocument doc = XmlUtil.LoadXml(WebUtil.GetSessionString("SC_DEVICEEDITOR"));
                WebUtil.SetSessionValue("SC_DEVICEEDITOR", (object)null);
                if (doc != null)
                    this.SetActiveLayout(LayoutDetailsForm.GetLayoutValue(doc));
                else
                    this.SetActiveLayout(string.Empty);
                this.Refresh();
            }
            else
            {
                WebUtil.SetSessionValue("SC_DEVICEEDITOR", (object)this.GetDoc().OuterXml);
                UrlString urlString = new UrlString(UIUtil.GetUri("control:DeviceEditor"));
                urlString.Append("de", StringUtil.GetString(args.Parameters["deviceid"]));
                urlString.Append("id", WebUtil.GetQueryString("id"));
                urlString.Append("vs", WebUtil.GetQueryString("vs"));
                urlString.Append("la", WebUtil.GetQueryString("la"));
                Context.ClientPage.ClientResponse.ShowModalDialog(new ModalDialogOptions(urlString.ToString())
                {
                    Response = true,
                    Width = "700"
                });
                args.WaitForPostBack();
            }
        }

        /// <summary>Copies the device2.</summary>
        /// <param name="sourceDevice">The device node.</param>
        /// <param name="devices">The devices.</param>
        /// <param name="item">The item.</param>
        private void CopyDevice(XmlNode sourceDevice, ListString devices, Item item)
        {
            Assert.ArgumentNotNull((object)sourceDevice, nameof(sourceDevice));
            Assert.ArgumentNotNull((object)devices, nameof(devices));
            Assert.ArgumentNotNull((object)item, nameof(item));
            Sitecore.Data.Fields.Field layoutField = this.GetLayoutField(item);
            XmlDocument data = ((LayoutField)layoutField).Data;
            LayoutDetailsForm.CopyDevices(data, devices, sourceDevice);
            item.Editing.BeginEdit();
            layoutField.Value = data.OuterXml;
            item.Editing.EndEdit();
        }

        /// <summary>Called when the item is saved.</summary>
        /// <param name="sender">The sender.</param>
        /// <param name="args">The arguments.</param>
        private void ItemSavedNotification(object sender, ItemSavedEventArgs args)
        {
            this.VersionCreated = true;
            this.ToggleVisibilityOfControlsOnFinalLayoutTab(args.Item);
            SheerResponse.SetDialogValue(this.GetDialogResult());
        }

        /// <summary>Copies the devices.</summary>
        /// <param name="doc">The doc.</param>
        /// <param name="devices">The devices.</param>
        /// <param name="sourceDevice">The source device.</param>
        private static void CopyDevices(XmlDocument doc, ListString devices, XmlNode sourceDevice)
        {
            Assert.ArgumentNotNull((object)doc, nameof(doc));
            Assert.ArgumentNotNull((object)devices, nameof(devices));
            Assert.ArgumentNotNull((object)sourceDevice, nameof(sourceDevice));
            XmlNode xmlNode1 = doc.ImportNode(sourceDevice, true);
            foreach (string device in devices)
            {
                if (doc.DocumentElement != null)
                {
                    XmlNode node = doc.DocumentElement.SelectSingleNode("d[@id='" + device + "']");
                    if (node != null)
                        XmlUtil.RemoveNode(node);
                    XmlNode xmlNode2 = xmlNode1.CloneNode(true);
                    XmlUtil.SetAttribute("id", device, xmlNode2);
                    doc.DocumentElement.AppendChild(xmlNode2);
                }
            }
        }

        /// <summary>Gets the current item.</summary>
        /// <returns>The current item.</returns>
        /// <contract>
        ///   <ensures condition="nullable" />
        /// </contract>
        private static Item GetCurrentItem() => Client.ContentDatabase.GetItem(WebUtil.GetQueryString("id"), Language.Parse(WebUtil.GetQueryString("la")), Sitecore.Data.Version.Parse(WebUtil.GetQueryString("vs")));

        /// <summary>Gets the layout value.</summary>
        /// <param name="doc">The doc.</param>
        /// <returns>The layout value.</returns>
        /// <contract>
        ///   <requires name="doc" condition="not null" />
        ///   <ensures condition="not null" />
        /// </contract>
        private static string GetLayoutValue(XmlDocument doc)
        {
            Assert.ArgumentNotNull((object)doc, nameof(doc));
            XmlNodeList xmlNodeList = doc.SelectNodes("/r/d");
            if (xmlNodeList == null || xmlNodeList.Count == 0)
                return string.Empty;
            foreach (XmlNode node in xmlNodeList)
            {
                if (node.ChildNodes.Count > 0 || XmlUtil.GetAttribute("l", node).Length > 0)
                    return doc.OuterXml;
            }
            return string.Empty;
        }

        /// <summary>Copies the device.</summary>
        /// <param name="sourceDevice">The source device.</param>
        /// <param name="devices">The devices.</param>
        private void CopyDevice(XmlNode sourceDevice, ListString devices)
        {
            Assert.ArgumentNotNull((object)sourceDevice, nameof(sourceDevice));
            Assert.ArgumentNotNull((object)devices, nameof(devices));
            XmlDocument doc = XmlUtil.LoadXml(this.GetActiveLayout());
            LayoutDetailsForm.CopyDevices(doc, devices, sourceDevice);
            this.SetActiveLayout(doc.OuterXml);
        }

        /// <summary>Gets the doc.</summary>
        /// <returns>The doc.</returns>
        /// <contract>
        ///   <ensures condition="not null" />
        /// </contract>
        private XmlDocument GetDoc()
        {
            XmlDocument doc = new XmlDocument();
            string activeLayout = this.GetActiveLayout();
            if (activeLayout.Length > 0)
                doc.LoadXml(activeLayout);
            else
                doc.LoadXml("<r/>");
            return doc;
        }

        /// <summary>Refreshes this instance.</summary>
        private void Refresh() => this.RenderLayoutGridBuilder(this.GetActiveLayout(), this.ActiveTab == LayoutDetailsForm.TabType.Shared ? (Sitecore.Web.UI.HtmlControls.Control)this.LayoutPanel : (Sitecore.Web.UI.HtmlControls.Control)this.FinalLayoutPanel);

        /// <summary>Renders the LayoutGridBuilder.</summary>
        /// <param name="layoutValue">The layout value.</param>
        /// <param name="renderingContainer">The rendering container.</param>
        private void RenderLayoutGridBuilder(string layoutValue, Sitecore.Web.UI.HtmlControls.Control renderingContainer)
        {
            string str = renderingContainer.ID + "LayoutGrid";
            LayoutGridBuilder layoutGridBuilder = new LayoutGridBuilder()
            {
                ID = str,
                Value = layoutValue,
                EditRenderingClick = "EditRendering(\"$Device\", \"$Index\")",
                EditPlaceholderClick = "EditPlaceholder(\"$Device\", \"$UniqueID\")",
                OpenDeviceClick = "OpenDevice(\"$Device\")",
                CopyToClick = "CopyDevice(\"$Device\")"
            };
            renderingContainer.Controls.Clear();
            layoutGridBuilder.BuildGrid((System.Web.UI.Control)renderingContainer);
            if (!Context.ClientPage.IsEvent)
                return;
            SheerResponse.SetOuterHtml(renderingContainer.ID, (System.Web.UI.Control)renderingContainer);
            SheerResponse.Eval("if (!scForm.browser.isIE) { scForm.browser.initializeFixsizeElements(); }");
        }

        /// <summary>Gets the layout field.</summary>
        /// <param name="item">The item.</param>
        /// <returns></returns>
        private Sitecore.Data.Fields.Field GetLayoutField(Item item) => this.ActiveTab == LayoutDetailsForm.TabType.Final ? item.Fields[FieldIDs.FinalLayoutField] : item.Fields[FieldIDs.LayoutField];

        /// <summary>The tab enumeration.</summary>
        private enum TabType
        {
            /// <summary>The shared layout tab.</summary>
            Shared,
            /// <summary>The final layout tab.</summary>
            Final,
            /// <summary>The unknown tab.</summary>
            Unknown,
        }
    }
}
