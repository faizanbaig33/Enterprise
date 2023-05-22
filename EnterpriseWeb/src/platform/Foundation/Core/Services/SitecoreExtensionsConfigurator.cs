using Microsoft.Extensions.DependencyInjection;
using Sitecore.Buckets.FieldTypes;
using Sitecore.DependencyInjection;

namespace Platform.Foundation.Core.Services
{
    public class SitecoreExtensionsConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<SourceFilterBuilderFactory, QueryTokenSourceFilterBuilderFactory>();
        }
    }
}
