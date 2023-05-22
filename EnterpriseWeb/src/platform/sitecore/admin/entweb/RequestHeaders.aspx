<%@ Page Title="Server Variables" Language="C#" MasterPageFile="~/sitecore/admin/entweb/master/Default.Master" AutoEventWireup="true" Inherits="Sitecore.sitecore.admin.AdminPage" %>

<script runat="server">
  protected void Page_Init(EventArgs e)
  {
    CheckSecurity(true); //Required!
  }
</script>

<asp:Content ID="HeadContent" ContentPlaceHolderID="head" runat="server" />

<asp:Content ID="BodyContent" ContentPlaceHolderID="ContentContainer" runat="server">
  <div class="row">
    <div class="col-10 offset-1">
      <div class="card text-bg-light mb-3">
        <div class="card-header text-bg-primary">
          Server Variables
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><a class="btn btn-secondary" href="default.aspx">Back</a></li>
        </ul>
        <div class="table-responsive">
          <table class="table table-striped">
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
<% var headers = base.Request.Headers; %>
<% for (var i = 0; i < headers.Count; i++) { %>
<% var key = headers.GetKey(i); %>
            <tr>
              <td nowrap><%= key %></td>
              <td><%= headers.Get(i) %></td>
            </tr>
<% } %>
          </table>
        </div>
      </div>
    </div>
  </div>
</asp:Content>
