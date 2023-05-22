using System.Collections.Generic;
using System.Linq;
using Sitecore.Data;

namespace Platform.Foundation.Core.ItemAsResources
{
    public class AggregatedItemLocations
    {
        public AggregatedItemLocations(ID itemId, ItemLocation itemLocation)
            : this(itemId, new ItemLocation[1] { itemLocation })
        {
        }

        public AggregatedItemLocations(AggregatedItemLocations aggregatedLocations, IEnumerable<ItemLocation> itemLocations)
            : this(aggregatedLocations.ItemId, itemLocations.Concat<ItemLocation>((IEnumerable<ItemLocation>)aggregatedLocations.ItemLocations))
        {
        }

        public AggregatedItemLocations(ID itemId, IEnumerable<ItemLocation> itemLocations)
        {
            this.ItemId = itemId;
            this.ItemLocations = itemLocations.ToArray();
        }

        public IReadOnlyCollection<ItemLocation> ItemLocations { get; }

        public ID ItemId { get; }
    }
}
