using System.Collections.Generic;
using System.Linq;
using Sitecore.Data;
using Sitecore.Data.DataProviders;

namespace Platform.Foundation.Core.ItemAsResources
{
    public static class DataSourceExtensions
    {
        public static AggregatedItemLocations GetItemLocations(this DataSource @this, ID itemId)
        {
            //var providers = @this.GetDataProviders();
            //var context = @this.CreateCallContext();
            var providers = @this.DataManager.Database.GetDataProviders();
            var context = new CallContext(@this.DataManager, providers.Length);

            foreach (var provider in providers)
            {
                if (provider.IsEnabled(nameof(GetItemLocations)))
                {
                    //DataProvider.UpdateContext(provider.GetItemLocations(itemId, context), context);
                    var result = provider.GetItemLocations(itemId, context);
                    if (result != null)
                    {
                        context.CurrentResult = result;
                    }
                    context.SetNextIndex(context.Index + 1);
                }
            }
            return context.CurrentResult as AggregatedItemLocations;
        }

        public static AggregatedItemLocations GetItemLocations(this DataSource @this, IEnumerable<ID> itemIds)
        {
            //var providers = @this.GetDataProviders();
            //var context = @this.CreateCallContext();
            var providers = @this.DataManager.Database.GetDataProviders();
            var context = new CallContext(@this.DataManager, providers.Length);

            foreach (var provider in providers)
            {
                if (provider.IsEnabled(nameof(GetItemLocations)))
                {
                    //DataProvider.UpdateContext(provider.GetItemLocations(itemIds, context), context);
                    var result = provider.GetItemLocations(itemIds, context).ToList();
                    if (result != null)
                    {
                        if (context.CurrentResult is List<AggregatedItemLocations> currentResult)
                        {
                            var collection = result;
                            result = new List<AggregatedItemLocations>();
                            result.AddRange(currentResult);
                            result.AddRange(collection);
                        }
                        context.CurrentResult = (object)result;
                    }
                    context.SetNextIndex(context.Index + 1);
                    if (context.Aborted)
                        break;
                }
            }
            return context.CurrentResult as AggregatedItemLocations;
        }
    }
}
