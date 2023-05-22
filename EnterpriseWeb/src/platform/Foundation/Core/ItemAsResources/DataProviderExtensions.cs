using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
using Sitecore.Data;
using Sitecore.Data.DataProviders;
using Sitecore.Data.DataProviders.ReadOnly;
using Sitecore.Data.DataProviders.Sql;

namespace Platform.Foundation.Core.ItemAsResources
{
    public static class DataProviderExtensions
    {
        public static AggregatedItemLocations GetItemLocations(this DataProvider provider, ID itemId, CallContext context)
        {
            return provider.GetItemLocations(new ID[1] { itemId }, context).SingleOrDefault<AggregatedItemLocations>();
        }

        public static ICollection<AggregatedItemLocations> GetItemLocations(this DataProvider @this, IEnumerable<ID> itemIds, CallContext context)
        {
            if (@this is SqlDataProvider)
            {
                var sqlProvider = (SqlDataProvider)@this;
                var itemLocations = new Collection<AggregatedItemLocations>();
                foreach (var selectId in sqlProvider.SelectIDs(itemIds.ToArray(), context))
                {
                    itemLocations.Add(new AggregatedItemLocations(selectId, new SqlItemLocation(sqlProvider.Database.Name)));
                }
                return (ICollection<AggregatedItemLocations>)itemLocations;
            }
            else if (@this is CompositeDataProvider)
            {
                var compositeProvider = (CompositeDataProvider)@this;
                var headProvider = compositeProvider.GetType().GetProperty("HeadProvider", BindingFlags.NonPublic | BindingFlags.Instance)?.GetValue(compositeProvider) as DataProvider;
                var readOnlyProviders = compositeProvider.GetType().GetProperty("ReadOnlyDataProviders", BindingFlags.NonPublic | BindingFlags.Instance)?.GetValue(compositeProvider) as List<ReadOnlyDataProvider>;

                var dictionary = headProvider.GetItemLocations(itemIds, context).ToDictionary<AggregatedItemLocations, ID>((Func<AggregatedItemLocations, ID>)(x => x.ItemId));
                foreach (var readOnlyProvider in readOnlyProviders)
                {
                    ICollection<AggregatedItemLocations> itemLocations = readOnlyProvider.GetItemLocations(itemIds);
                    //this.MergeLocations(dictionary, itemLocations);
                    foreach (var aggregatedItemLocations in itemLocations)
                    {
                        AggregatedItemLocations aggregatedLocations;
                        dictionary[aggregatedItemLocations.ItemId] = !dictionary.TryGetValue(aggregatedItemLocations.ItemId, out aggregatedLocations) ? aggregatedItemLocations : new AggregatedItemLocations(aggregatedLocations, aggregatedItemLocations.ItemLocations);
                    }
                }
                return dictionary.Values;
            }
            else
            {
                return Array.Empty<AggregatedItemLocations>();
            }
        }
    }
}
