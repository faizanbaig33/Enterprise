// Note: $ is Prototype, not jQuery
var MultiRootTreeList = (function () {
  return {
    SelectedListBox: {
      OnChange: function (control, fieldId) {
        if (control.selectedIndex < 0) return;
        var values = control.options[control.selectedIndex].value.split('|');
        var name = control.options[control.selectedIndex].innerHTML;
        if (values.length != 2) return;

        MultiRootTreeList.SelectedListBox.GetItem(values[1], fieldId, function (item) {

          var dataContextId = MultiRootTreeList.SelectedListBox.GetDataContextId(item, fieldId);
          // Select this item in the All box
          MultiRootTreeList.SelectedListBox.SelectNode(fieldId, dataContextId, item, function () {
            // Show the item path
            document.getElementById(fieldId + '_help').innerHTML = item.ItemPath;
          }, function () {
            // Show the item path and a message
            document.getElementById(fieldId + '_help').innerHTML = item.ItemPath + ' [Item not in list]';
          });
        }, function () {
          // Show the item name since we can't find it (deleted?)
          document.getElementById(fieldId + '_help').innerHTML = name;
        });
      },
      SelectNode: function (fieldId, dataContextId, item, found, notFound) {
        // Problem, if the folder we are in isn't expanded, then we don't exist in the dom, so work our way up until we find a parent element
        var $element = MultiRootTreeList.SelectedListBox.GetTreeNode(fieldId, dataContextId, item);
        if ($element == null) {
          MultiRootTreeList.SelectedListBox.GetItem(item.ParentID, fieldId, function (parent) {
            MultiRootTreeList.SelectedListBox.ExpandNode(fieldId, dataContextId, parent, function () {
              MultiRootTreeList.SelectedListBox.SelectNode(fieldId, dataContextId, item, found, notFound)
            }, notFound);
          });
        } else {
          $element.down('a').click();
          found();
        }
      },
      ExpandNode: function (fieldId, dataContextId, item, found, notFound) {
        // Problem, if the folder we are in isn't expanded, then we don't exist in the dom, so work our way up until we find a parent element
        var $element = MultiRootTreeList.SelectedListBox.GetTreeNode(fieldId, dataContextId, item);
        if ($element == null) {
          // Check if we are at the root
          if (item.ParentID == '00000000-0000-0000-0000-000000000000') {
            notFound();
            return;
          }
          MultiRootTreeList.SelectedListBox.GetItem(item.ParentID, fieldId, function (parent) {
            MultiRootTreeList.SelectedListBox.ExpandNode(fieldId, dataContextId, parent, found, notFound);
          });
        } else {
          // Expand the node
          var isMultiRoot = false;
          var id = item.ItemID.replace(/[{}-]/g, '').toUpperCase();
          var content = $F(fieldId + "_all_Database");
          var dataContext = MultiRootTreeList.SelectedListBox.GetDataContext($element);
          var body = fieldId + "_all_Selected=" + escape($F(fieldId + "_all_Selected")) + "&" + fieldId + "_all_Parameters=";
          if (dataContext) {
            isMultiRoot = true;
            body += escape(dataContext.parameters);
            if (dataContext.id) {
              body += "&" + fieldId + "_all_cur_datacontext=" + escape(dataContext.id);
            }
          }
          else {
            body += escape($F(fieldId + "_all_Parameters"));
          }

          var templateIDs = $(fieldId + "_all_templateIDs");
          if (templateIDs) {
            body += "&" + fieldId + "_all_templateIDs=" + escape(templateIDs.value);
          }

          var displayFieldName = $(fieldId + "_all_displayFieldName");
          if (displayFieldName) {
            body += "&" + fieldId + "_all_displayFieldName=" + escape(displayFieldName.value);
          }

          if (window.scCSRFToken && window.scCSRFToken.key && window.scCSRFToken.value) {
            body += "&" + window.scCSRFToken.key + "=" + window.scCSRFToken.value;
          }

          var contentLanguage;
          var treeviewLanguage = window.document.getElementById(fieldId + "_all_Language");

          if (treeviewLanguage) {
            contentLanguage = "&la=" + treeviewLanguage.value;
          } else {
            contentLanguage = "";
          }

          new Ajax.Request("/sitecore/shell/Controls/TreeviewEx/TreeviewEx.aspx?treeid=" + encodeURIComponent(fieldId + "_all") + "&id=" + encodeURIComponent(id) + (content != null ? "&sc_content=" + content : "") + contentLanguage + (isMultiRoot ? "&mr=1" : ""), {
            method: "post",
            postBody: body,
            onSuccess: function (transport) { Sitecore.Treeview.expandTreeNode($element, transport.responseText); found(); },
            onException: function (request, ex) { alert(ex) },
            onFailure: function (request) { alert("Failed") }
          });
        }
      },
      GetItem: function (itemId, fieldId, success, failure) {
        var content = $F(fieldId + "_all_Database");
        var treeviewLanguage = window.document.getElementById(fieldId + "_all_Language");
        var api = "/sitecore/api/ssc/item/" + itemId + "?database=" + content;
        if (treeviewLanguage !== null && treeviewLanguage !== undefined)
          api += "&language=" + treeviewLanguage.value;
        new Ajax.Request(api, {
          method: 'get',
          requestHeaders: {
            accept: 'application/json'
          },
          onSuccess: function (transport) {
            success(transport.responseJSON);
          },
          onException: function (request, ex) { alert(ex); },
          onFailure: function (request) {
            if (typeof failure === 'function') {
              failure();
            } else {
              alert('Failed');
            }
          }
        });
      },
      GetDataContextId: function (item, fieldId) {
        var dataContextId;
        var elementId = fieldId + "_all_ewDataContextsMapping";
        var dataContextMappingDiv = document.getElementById(elementId)
        if (dataContextMappingDiv !== null && dataContextMappingDiv !== undefined) {
          var children = dataContextMappingDiv.children;
          if (children !== null && children !== undefined) {
            for (let i = 0; i < children.length; i++) {
              if (item.ItemPath.includes(children[i].dataset.path)) {
                dataContextId = children[i].dataset.contextId;
              }
            }
          }
        }

        return dataContextId;
      },
      GetTreeNode: function (fieldId, dataContextId, item) {
        var id = item.ItemID.replace(/[{}-]/g, '').toUpperCase();
        var $element = $(fieldId + '_all_' + id);
        if ($element == null) {
          $element = $(fieldId + '_all_' + dataContextId + "_" + id);
        }

        return $element;
      },
      GetDataContext: function (node) {
        var startIdx = node.id.indexOf("_");
        var endIdx = node.id.lastIndexOf("_");
        if (endIdx <= startIdx) {
          return null;
        }

        var dataContextId = node.id.substring(startIdx + 5, endIdx);
        var dataContextLowered;
        if (dataContextId) {
          dataContextLowered = dataContextId.toLowerCase();
        }

        var datacontexts = node.up().previous(".scDataContexts");
        if (!datacontexts) {
          return null;
        }

        var r = datacontexts.childElements().find(function (e) {
          var id = e.readAttribute("data-context-id");
          return id && id.toLowerCase() === dataContextLowered;
        });

        if (!r) {
          return null;
        }

        return { id: dataContextId, parameters: r.value || "" };
      }
    }
  };
})();
