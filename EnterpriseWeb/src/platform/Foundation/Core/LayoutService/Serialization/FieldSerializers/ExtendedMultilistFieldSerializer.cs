using System.Collections.Generic;
using Sitecore.Abstractions;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.LayoutService.Serialization;
using Sitecore.LayoutService.Serialization.FieldSerializers;
using Sitecore.LayoutService.Serialization.ItemSerializers;

namespace Platform.Foundation.Core.LayoutService.Serialization.FieldSerializers
{
    public class ExtendedMultilistFieldSerializer : MultilistFieldSerializer
    {
        public ExtendedMultilistFieldSerializer(IItemSerializer itemSerializer, IFieldRenderer fieldRenderer, BaseMediaManager mediaManager) : base(itemSerializer, fieldRenderer, mediaManager)
        {
        }

        protected override IEnumerable<Property> GetProperties(Item item, MultilistField field, int depth)
        {
            var result = new List<Property>(base.GetProperties(item, field, depth));

            result.Add(new Property("templateId", item.TemplateID.Guid.ToString()));
            result.Add(new Property("templateName", item.TemplateName));

            return result;
        }
    }
}
