<%@ Page Title="Enterprise Web Admin Tools" Language="C#" MasterPageFile="~/sitecore/admin/entweb/master/Default.Master" AutoEventWireup="true" Inherits="Sitecore.sitecore.admin.AdminPage" %>

<%@ Register Src="~/sitecore/admin/entweb/control/AdminTool.ascx" TagPrefix="ew" TagName="AdminTool" %>

<script runat="server">
  protected void Page_Init(EventArgs e)
  {
    CheckSecurity(true); //Required!
  }
</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentContainer" runat="server">
  <div class="row">
    <div class="col-10 offset-1">
      <div class="card text-bg-light mb-3">
        <div class="card-header text-bg-primary">Enterprise Web Admin Tools</div>
        <div class="card-body">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            <ew:AdminTool runat="server" Title="Server Variables" Description="List all Server variables." Url="/sitecore/admin/entweb/ServerVariables.aspx" />
            <ew:AdminTool runat="server" Title="Request Headers" Description="List all Request Header variables." Url="/sitecore/admin/entweb/RequestHeaders.aspx" />
          </div>
        </div>
      </div>
    </div>
  </div>
</asp:Content>
