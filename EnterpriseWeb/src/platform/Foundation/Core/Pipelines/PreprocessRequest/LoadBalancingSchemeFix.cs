using System.Web;
using Sitecore.Configuration;
using Sitecore.Pipelines.PreprocessRequest;

namespace Platform.Foundation.Core.Pipelines.PreProcessRequest
{
    /// <summary>
    /// Known issue with Sitecore JSS Headless image rendering. Applied the fix here as suggested by Sitecore.
    /// https://sitecore.stackexchange.com/questions/31578/next-js-headless-images-not-working-from-rendering-fe-instance-system-uribuil
    /// </summary>
    public class LoadBalancingSchemeFix : PreprocessRequestProcessor
    {
        public override void Process(PreprocessRequestArgs args)
        {
            var scheme = HttpContext.Current?.Request?.Headers?[Settings.LoadBalancingScheme];
            if (Settings.LoadBalancingEnabled && (scheme?.Contains(",") ?? false))
            {
                HttpContext.Current.Request.Headers[Settings.LoadBalancingScheme] = scheme.Split(',')[0];
            }
        }
    }
}
