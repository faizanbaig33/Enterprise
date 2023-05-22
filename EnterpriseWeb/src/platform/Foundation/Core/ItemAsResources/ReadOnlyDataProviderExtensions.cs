using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Data;
using Sitecore.Data.DataProviders.ReadOnly;
using Sitecore.Data.DataProviders.ReadOnly.Protobuf;

namespace Platform.Foundation.Core.ItemAsResources
{
    public static class ReadOnlyDataProviderExtensions
    {
        public static ICollection<AggregatedItemLocations> GetItemLocations(this ReadOnlyDataProvider @this, IEnumerable<ID> itemIds)
        {
            if (@this is ProtobufDataProvider)
            {
                var protobufProvider = (ProtobufDataProvider)@this;
                var itemLocations = new List<AggregatedItemLocations>();
                foreach (var id in protobufProvider.DataSet.Definitions.Keys.Intersect<Guid>(itemIds.Select(id => id.Guid)))
                {
                    itemLocations.Add(new AggregatedItemLocations(new ID(id), new ResourceItemLocation()));
                }
                return itemLocations;
            }
            else
            {
                return Array.Empty<AggregatedItemLocations>();
            }
        }
    }
}
