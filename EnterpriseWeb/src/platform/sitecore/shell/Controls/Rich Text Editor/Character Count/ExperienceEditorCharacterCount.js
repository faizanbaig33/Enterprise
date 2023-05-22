//$rtecc is just a placeholder to check for jQuery
var $rtecc = $sc || $j || jQuery || $;
$rtecc(document).ready(function () {
  try
  {
    $rtecc('body').append('<span class="characterCount scChromeCommandText" style="display: none;"></span>')
    var $characterCount = $rtecc('.characterCount');
    $characterCount.css({
      'position': 'absolute',
      'text-align': 'right',
      'z-index': '10000',
      'padding': '0px 10px',
      'background': '#474747',
      'color': '#fff'
    })

    var $richTextFields = $rtecc('[scfieldtype="rich text"]');
    var characterCountVerbiage = "Character Count: ";

    $richTextFields.live('focus', function () {
      var $this = $rtecc(this);
      var text = $this.text();
      $characterCount.text(characterCountVerbiage + text.length);

      $characterCount.css(
        {
          'left': $this.offset().left,
          'top': $this.offset().top + $this.height(),
        }).show();
    });

    $richTextFields.live('focusout', function () {
      $characterCount.hide();
    });

    $richTextFields.live('keyup', function () {
      var $this = $rtecc(this);
      var text = $this.text();
      $characterCount.text(characterCountVerbiage + text.length);

      $characterCount.css(
        {
          'left': $this.offset().left,
          'top': $this.offset().top + $this.height(),
        });
    });
  } catch (ex)
  {
    console.log(ex);
  }
});
