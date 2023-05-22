using Sitecore.Pipelines.ExpandInitialFieldValue;

namespace Platform.Foundation.Core.Pipelines.ExpandInitialFieldValue
{
    public class NameKebabToken : ExpandInitialFieldValueProcessor
    {
        public override void Process(ExpandInitialFieldValueArgs args)
        {
            if (args.SourceField.Value.Contains("$ewNameKebab"))
            {
                if (args.TargetItem != null)
                {
                    args.Result = args.Result.Replace("$ewNameKebab", args.TargetItem.Name.ToLowerInvariant().Replace(' ', '-').Replace('_', '-'));
                }
            }
        }
    }
}
