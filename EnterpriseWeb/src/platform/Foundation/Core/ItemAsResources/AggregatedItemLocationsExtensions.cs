using System.Linq;

namespace Platform.Foundation.Core.ItemAsResources
{
    public static class AggregatedItemLocationsExtensions
    {
        public static bool IsResource(this AggregatedItemLocations location)
        {
            return location.ItemLocations.Any(l => l is ResourceItemLocation);
        }

        public static bool IsSql(this AggregatedItemLocations location)
        {
            return location.ItemLocations.Any(l => l is SqlItemLocation);
        }

        public static bool IsOverridden(this AggregatedItemLocations location)
        {
            return location.IsResource() && location.IsSql();
        }
    }
}
