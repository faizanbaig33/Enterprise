using Platform.Foundation.Core.LayoutService.Serialization.FieldSerializers;
using Sitecore.Abstractions;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.Pipelines.GetFieldSerializer;

namespace Platform.Foundation.Core.Pipelines.GetFieldSerializer
{
    public class GetInternalLinkFieldSerializer : BaseGetFieldSerializer
    {
        protected readonly BaseMediaManager MediaManager;

        public GetInternalLinkFieldSerializer(
          IFieldRenderer fieldRenderer,
          BaseMediaManager mediaManager)
          : base(fieldRenderer)
        {
            this.MediaManager = mediaManager;
        }

        protected override void SetResult(GetFieldSerializerPipelineArgs args)
        {
            Assert.ArgumentNotNull(args, nameof(args));
            args.Result = new ExtendedInternalLinkFieldSerializer(args.ItemSerializer, this.FieldRenderer, this.MediaManager);
        }
    }
}
