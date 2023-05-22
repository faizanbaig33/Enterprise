using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web.UI.WebControls;
using Platform.Foundation.Core.Extensions;
using Sitecore;
using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Shell.Applications.ContentEditor.FieldHelpers;
using Sitecore.Web;
using Sitecore.Web.UI.HtmlControls;
using Sitecore.Web.UI.Sheer;
using Sitecore.XA.Foundation.SitecoreExtensions.CustomFields.FieldTypes;
using Sitecore.XA.Foundation.SitecoreExtensions.Services;

namespace Platform.Foundation.Core.Fields
{
    public class FilterableDroptree : Tree
    {
        public override string Value
        {
            get
            {
                return base.Value;
            }
            set
            {
                base.Value = value ?? string.Empty;
                SetAttribute(ID, "value", GetDisplayValue());
            }
        }

        protected readonly TreeListFilterQueryBuilder FilterQueryBuilder = new TreeListFilterQueryBuilder();
        private string _source = "";
        private readonly IQueryService _queryService = ServiceLocator.ServiceProvider.GetService(typeof(IQueryService)) as IQueryService;

        public string DatabaseName
        {
            get => this.GetViewStateString(nameof(DatabaseName));
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                this.SetViewStateString(nameof(DatabaseName), value);
            }
        }

        [Category("Data")]
        [Description("Comma separated list of item names/ids.")]
        public string ExcludeItemsForDisplay
        {
            get => this.GetViewStateString(nameof(ExcludeItemsForDisplay));
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                this.SetViewStateString(nameof(ExcludeItemsForDisplay), value);
            }
        }

        [Category("Data")]
        [Description("Comma separated list of template names. If this value is set, items based on these template will not be displayed in the tree.")]
        public string ExcludeTemplatesForDisplay
        {
            get => this.GetViewStateString(nameof(ExcludeTemplatesForDisplay));
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                this.SetViewStateString(nameof(ExcludeTemplatesForDisplay), value);
            }
        }

        [Category("Data")]
        [Description("Comma separated list of template names. If this value is set, items based on these template will not be included in the menu.")]
        public string ExcludeTemplatesForSelection
        {
            get => this.GetViewStateString(nameof(ExcludeTemplatesForSelection));
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                this.SetViewStateString(nameof(ExcludeTemplatesForSelection), value);
            }
        }

        [Category("Data")]
        [Description("Comma separated list of template names. If this value is set, only items based on these template can be displayed in the menu.")]
        public string IncludeTemplatesForDisplay
        {
            get => this.GetViewStateString(nameof(IncludeTemplatesForDisplay));
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                this.SetViewStateString(nameof(IncludeTemplatesForDisplay), value);
            }
        }

        [Category("Data")]
        [Description("Comma separated list of items names/ids.")]
        public string IncludeItemsForDisplay
        {
            get => this.GetViewStateString(nameof(IncludeItemsForDisplay));
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                this.SetViewStateString(nameof(IncludeItemsForDisplay), value);
            }
        }

        [Category("Data")]
        [Description("Comma separated list of template names. If this value is set, only items based on these template can be included in the menu.")]
        public string IncludeTemplatesForSelection
        {
            get => this.GetViewStateString(nameof(IncludeTemplatesForSelection));
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                this.SetViewStateString(nameof(IncludeTemplatesForSelection), value);
            }
        }

        public new string Source
        {
            get => this._source;
            set
            {
                Assert.ArgumentNotNull((object)value, nameof(value));
                this._source = value;
            }
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

            if (!Sitecore.Context.ClientPage.IsEvent)
            {
                this.SetProperties();

                // find the existing DataContext that the base OnLoad added, get a ref to its parent, and remove it from controls
                var currentDataContext = this.GetDataContext();
                var dataContextParent = currentDataContext.Parent;
                dataContextParent.Controls.Remove(currentDataContext); // remove stock data context, we parse our own

                var holder = new System.Web.UI.WebControls.Panel();
                holder.ID = $"{ID}_contexts";
                dataContextParent.Controls.Add(holder);

                var dataContexts = this.CreateDataContexts();
                foreach (var dataContext in dataContexts)
                {
                    holder.Controls.Add(dataContext);
                }
            }
        }

        protected void SetProperties()
        {
            string str = StringUtil.GetString(this.Source);
            if (str.StartsWith("query:"))
            {
                if (Sitecore.Context.ContentDatabase == null || this.ItemID == null)
                {
                    return;
                }
                var current = Client.ContentDatabase.GetItem(this.ItemID);
                if (current == null)
                {
                    return;
                }
                var root = this._queryService.Resolve(str, this.ItemID);
                if (root == null)
                {
                    return;
                }
                this.DataSource = root;
            }
            else if (Sitecore.Data.ID.IsID(str))
            {
                this.DataSource = this.Source;
            }
            else if (this.Source != null && !str.Trim().StartsWith("/"))
            {
                this.ExcludeTemplatesForSelection = StringUtil.ExtractParameter("ExcludeTemplatesForSelection", this.Source).Trim();
                this.IncludeTemplatesForSelection = StringUtil.ExtractParameter("IncludeTemplatesForSelection", this.Source).Trim();
                this.IncludeTemplatesForDisplay = StringUtil.ExtractParameter("IncludeTemplatesForDisplay", this.Source).Trim();
                this.ExcludeTemplatesForDisplay = StringUtil.ExtractParameter("ExcludeTemplatesForDisplay", this.Source).Trim();
                this.ExcludeItemsForDisplay = StringUtil.ExtractParameter("ExcludeItemsForDisplay", this.Source).Trim();
                this.IncludeItemsForDisplay = StringUtil.ExtractParameter("IncludeItemsForDisplay", this.Source).Trim();
                var dataSource = StringUtil.ExtractParameter("DataSource", this.Source).Trim();
                if (dataSource.Contains('|'))
                {
                    this.DataSource = string.Join("|", dataSource.Split('|').Select(_ =>
                    {
                        var query = _.Trim();

                        if (query.StartsWith("query:"))
                        {
                            query = this._queryService.Resolve(query, this.ItemID);
                        }

                        return query;
                    }));
                }
                else if (dataSource.StartsWith("query:"))
                {
                    this.DataSource = this._queryService.Resolve(dataSource, this.ItemID);
                }
                else
                {
                    this.DataSource = dataSource;
                }
                this.DatabaseName = StringUtil.ExtractParameter("databasename", this.Source).Trim().ToLowerInvariant();
            }
            else
            {
                this.DataSource = this.Source;
            }
        }

        protected new void Select()
        {
            var treeview = Sitecore.Context.ClientPage.FindSubControl(Sitecore.Context.ClientPage.ClientRequest.Control) as DataTreeview;

            var source = Sitecore.Context.ClientPage.ClientRequest.Source;
            var selectionItem = treeview.GetSelectionItem();
            if (selectionItem != null)
            {
                if (!this.ValidateSelection(selectionItem))
                {
                    if (string.IsNullOrEmpty(Value))
                    {
                        treeview.ClearSelection();
                        var noneNode = Sitecore.Context.ClientPage.FindSubControl(ID + "_none") as DataTreeNode;
                        noneNode.Selected = true;
                    }
                    else
                    {
                        var dataContext = Sitecore.Context.ClientPage.FindSubControl(treeview.DataContext) as DataContext;
                        var current = dataContext.GetItem(Value);
                        var root = dataContext.GetRoot();
                        if (root.Axes.IsAncestorOf(current))
                        {
                            dataContext.Folder = Value;
                        }
                        else
                        {
                            treeview.ClearSelection();
                        }
                    }

                    SheerResponse.ClosePopups(false);
                    return;
                }

                this.Value = selectionItem.ID.ToString();
                if (source.EndsWith("header", StringComparison.InvariantCulture) || source.EndsWith("icon", StringComparison.InvariantCulture))
                {
                    SheerResponse.ClosePopups(true);
                }
            }
            else
            {
                this.Value = string.Empty;
            }
            SheerResponse.SetAttribute(this.ID + "_edit", "value", this.GetDisplayValue());
            this.DoChanged();
        }

        protected virtual bool ValidateSelection(Item selectedItem)
        {
            if (this.HasExcludeTemplateForSelection(selectedItem))
            {
                return false;
            }
            return this.HasIncludeTemplateForSelection(selectedItem);
        }

        protected virtual bool HasExcludeTemplateForSelection(Item item)
        {
            return item == null || this.HasItemTemplate(item, this.ExcludeTemplatesForSelection);
        }

        protected virtual bool HasIncludeTemplateForSelection(Item item)
        {
            Assert.ArgumentNotNull((object)item, nameof(item));
            return this.IncludeTemplatesForSelection.Length == 0 || this.HasItemTemplate(item, this.IncludeTemplatesForSelection);
        }

        protected virtual bool HasItemTemplate(Item item, string templateList)
        {
            Assert.ArgumentNotNull(templateList, nameof(templateList));
            if (item == null || String.IsNullOrEmpty(templateList))
            {
                return false;
            }

            var items = templateList.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            if (!items.Any())
            {
                return false;
            }

            return items.Any(template => item.HasBaseTemplate(template));
        }

        protected override void OnDataContextChanged(DataContext dataContext)
        {
            // Ignore these
        }

        protected override void DropDown()
        {
            var value = Value;

            var hiddenHolder = UIUtil.GetHiddenHolder(this);
            DataTreeNode noneNode = null;
            var scrollbox = new Scrollbox();
            scrollbox.Width = 300;
            scrollbox.Height = 400;
            Sitecore.Context.ClientPage.AddControl(hiddenHolder, scrollbox);

            var dataContextHolder = Sitecore.Context.ClientPage.FindSubControl($"{ID}_contexts");
            var dataContexts = WebUtil.FindControlsOfType(typeof(DataContext), dataContextHolder);
            var first = true;
            foreach (var dataContext in dataContexts)
            {
                var found = false;
                var context = ((DataContext)dataContext);

                // Check if we have a value and it is in the current datacontext tree
                if (!string.IsNullOrEmpty(value))
                {
                    var root = context.GetRoot();
                    var item = context.GetItem(value);
                    if (context.IsAncestorOf(root, item))
                    {
                        context.Folder = value;
                        found = true;
                    }
                }

                var treeview = new DataTreeview();
                treeview.ID = $"{ID}_treeview_{context.ID}";
                treeview.Class = "scTreeview scPopupTree";
                treeview.AllowDragging = false;
                treeview.Width = new Unit(100.0, UnitType.Percentage);
                treeview.Click = ID + ".Select";
                treeview.DataContext = context.ID;

                // The first datatree will hold the none vlaue if needed
                if (AllowNone && first)
                {
                    noneNode = new DataTreeNode();
                    noneNode.ID = ID + "_none";
                    noneNode.Header = Translate.Text("[none]");
                    noneNode.Expandable = false;
                    noneNode.Expanded = false;
                    noneNode.Value = "none";
                    noneNode.Icon = "Applications/16x16/forbidden.png";
                    Sitecore.Context.ClientPage.AddControl(treeview, noneNode);
                }

                Sitecore.Context.ClientPage.AddControl(scrollbox, treeview);

                if (string.IsNullOrEmpty(value))
                {
                    treeview.ClearSelection();
                    if (first)
                    {
                        if (AllowNone)
                        {
                            noneNode.Selected = true;
                        }
                        else
                        {
                            // If we don't have a value and we don't allow none, then set the first datatrees value, and it will select the root node by default
                            context.Folder = value;
                        }
                    }
                }
                else
                {
                    if (!found)
                    {
                        treeview.ClearSelection();
                    }
                }
                first = false;
            }

            SheerResponse.ShowPopup(ID, "below-right", scrollbox);
        }

        protected IEnumerable<DataContext> CreateDataContexts()
        {
            return DataSource.Split('|').Select(_ => CreateDataContext(_));
        }

        protected virtual DataContext CreateDataContext(string dataSource)
        {
            DataContext dataContext = new DataContext();
            dataContext.ID = GetUniqueID("D");
            dataContext.Filter = this.FilterQueryBuilder.BuildFilterQuery(this.IncludeTemplatesForDisplay, this.ExcludeTemplatesForDisplay, this.IncludeItemsForDisplay, this.ExcludeItemsForDisplay);
            dataContext.DataViewName = "Master";
            if (!string.IsNullOrEmpty(DatabaseName))
            {
                dataContext.Parameters = "databasename=" + DatabaseName;
            }

            dataContext.Root = dataSource;
            dataContext.Language = Language.Parse(ItemLanguage);
            dataContext.ClearSelected();

            return dataContext;
        }

        protected override string GetDisplayValue()
        {
            string value = Value;
            if (string.IsNullOrEmpty(Value))
            {
                return value;
            }

            var id = ID.EndsWith("_holder") ? ID.Substring(0, ID.Length - 7) : ID;
            var dataContextHolder = Sitecore.Context.ClientPage.FindSubControl($"{id}_contexts");
            if (dataContextHolder == null)
            {
                return value;
            }

            var dataContexts = WebUtil.FindControlsOfType(typeof(DataContext), dataContextHolder);
            if (dataContexts == null || dataContexts.Length == 0)
            {
                return value;
            }

            var dataContext = ((DataContext)dataContexts[0]);
            var item = dataContext.GetItem(value);
            if (item == null)
            {
                return value;
            }

            // Find the root
            Item root = null;
            foreach (var maybeContext in dataContexts)
            {
                var maybeRoot = ((DataContext)maybeContext).GetRoot();
                if (maybeRoot.Axes.IsAncestorOf(item))
                {
                    root = maybeRoot;
                    break;
                }
            }

            if (root == null)
            {
                return item.Paths.Path;
            }

            Item parent = root.Parent;
            if (parent != null)
            {
                root = parent;
                value = item.Paths.GetPath(root.Paths.Path, "/", ItemPathType.DisplayName);
            }
            else
            {
                value = item.Paths.Path;
            }

            if (value.StartsWith("/", StringComparison.InvariantCulture))
            {
                value = value.Substring(1);
            }

            return value;
        }
    }
}
