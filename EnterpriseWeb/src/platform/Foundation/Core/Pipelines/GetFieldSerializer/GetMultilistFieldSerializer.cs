using Platform.Foundation.Core.LayoutService.Serialization.FieldSerializers;
using Sitecore.Abstractions;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.Pipelines.GetFieldSerializer;

namespace Platform.Foundation.Core.Pipelines.GetFieldSerializer
{
    public class GetMultilistFieldSerializer : BaseGetFieldSerializer
    {
        protected readonly BaseMediaManager MediaManager;

        public GetMultilistFieldSerializer(IFieldRenderer fieldRenderer, BaseMediaManager mediaManager)
          : base(fieldRenderer)
        {
            this.MediaManager = mediaManager;
        }

        protected override void SetResult(GetFieldSerializerPipelineArgs args)
        {
            Assert.ArgumentNotNull(args, nameof(args));
            Assert.IsNotNull(args.Field, "args.Field is null");
            Assert.IsNotNull(args.ItemSerializer, "args.ItemSerializer is null");
            args.Result = new ExtendedMultilistFieldSerializer(args.ItemSerializer, this.FieldRenderer, this.MediaManager);
        }
    }
}
