<%@ Control Language="C#" AutoEventWireup="true" %>

<script runat="server">
  public string Title { get; set; }

  public string Description { get; set; }

  public string Url { get; set; }

  protected void Page_Load(object sender, EventArgs e)
  {
    Image.Attributes["alt"] = Title;
    ImageLink.NavigateUrl = Url;
    HeaderLiteral.Text = Title;
    BodyLiteral.Text = Description;
  }
</script>

<div class="col">
  <div class="card h-100">
    <asp:HyperLink runat="server" ID="ImageLink" CssClass="stretched-link pt-3">
      <img runat="server" id="Image" src="/sitecore/admin/entweb/img/document_gear.png" class="mx-auto d-block" />
    </asp:HyperLink>
    <div class="card-body">
      <h5 class="card-title"><asp:Literal runat="server" ID="HeaderLiteral" /></h5>
      <p class="card-text"><asp:Literal runat="server" ID="BodyLiteral" /></p>
    </div>
  </div>
</div>
