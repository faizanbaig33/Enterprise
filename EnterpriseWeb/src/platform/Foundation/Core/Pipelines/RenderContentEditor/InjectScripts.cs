using Sitecore.Pipelines;
using Sitecore.StringExtensions;
using System.Web;
using System.Collections.Generic;
using System.Web.UI;

namespace Platform.Foundation.Core.Pipelines.RenderContentEditor
{
    public class InjectScripts
    {
        private readonly IList<string> _scripts = new List<string>();
        private readonly IList<string> _styles = new List<string>();

        public void Process(PipelineArgs args)
        {
            var page = HttpContext.Current.Handler as Sitecore.Web.UI.HtmlControls.Page;

            foreach (string script in _scripts)
            {
                page.Header.Controls.Add(new LiteralControl("<script type='text/javascript' language='javascript' src='{0}'></script>".FormatWith(script)));
            }

            foreach (string css in _styles)
            {
                page.Header.Controls.Add(new LiteralControl("<link rel='stylesheet' type='text/css' href='{0}' />".FormatWith(css)));
            }
        }

        public void AddStyleResource(string resource)
        {
            _styles.Add(resource);
        }

        public void AddScriptResource(string resource)
        {
            _scripts.Add(resource);
        }
    }
}
