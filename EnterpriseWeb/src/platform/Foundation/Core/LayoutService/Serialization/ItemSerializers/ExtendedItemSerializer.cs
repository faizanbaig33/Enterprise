using System;
using Platform.Foundation.Core.Constants;
using Sitecore.Data.Fields;
using Sitecore.LayoutService.Serialization.ItemSerializers;
using Sitecore.LayoutService.Serialization.Pipelines.GetFieldSerializer;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;

namespace Platform.Foundation.Core.LayoutService.Serialization.ItemSerializers
{
    public class ExtendedItemSerializer : DefaultItemSerializer
    {
        public ExtendedItemSerializer(IGetFieldSerializerPipeline getFieldSerializerPipeline)
            : base(getFieldSerializerPipeline)
        {
        }

        protected override bool FieldFilter(Field field)
        {
            if (field.Item.InheritsFrom(TemplateIds.Foundation.Core.FieldSets.Containers._FieldDataSourceContainer.Template) && field.Name.StartsWith("ph-", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }
            return base.FieldFilter(field);
        }
    }
}
