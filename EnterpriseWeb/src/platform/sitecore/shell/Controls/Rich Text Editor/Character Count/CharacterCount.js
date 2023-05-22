$j(document).ready(function () {
  var $this = $j(this);
  setTimeout(function () {
    try
    {
      var okCancelContainer = $this.find('.footerOkCancel');
      var $characterCount = $j('<span class="characterCount"></span>');
      okCancelContainer.prepend($characterCount);
      var scRichTextEditor = scRichText.getEditor();
      var html = scRichTextEditor.get_html();
      var isHtml = $j.trim(html).startsWith("<");
      var text = isHtml ? $j(html).text() : html;
      $characterCount.text("Character Count: " + text.length + "  ");

      var $iframeContentBody = $this.find('#Editor_contentIframe').contents().find('body');
      var $rawHtmlTextArea = $this.find('#Editor .reTextArea');
      $iframeContentBody.add($rawHtmlTextArea).on('keyup', function () {
        var html = scRichTextEditor.get_html();
        var isHtml = $j.trim(html).startsWith("<");
        var text = isHtml ? $j(html).text() : html;
        $characterCount.text("Character Count: " + text.length + "  ");
      })
    } catch (ex)
    {
      console.log(ex);
    }
  }, 50);
});
