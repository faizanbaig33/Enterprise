using System;
using System.Linq;
using Sitecore;
using Sitecore.Buckets.FieldTypes;
using Sitecore.Data.Items;
using Sitecore.XA.Foundation.SitecoreExtensions.Services;

// https://www.coreysmith.co/sxa-multilist-search-query-tokens/

namespace Platform.Foundation.Core.Services
{
    public class QueryTokenSourceFilterBuilderFactory : SourceFilterBuilderFactory
    {
        private readonly IQueryService _queryService;

        public QueryTokenSourceFilterBuilderFactory(IQueryService queryService)
        {
            _queryService = queryService ?? throw new ArgumentNullException(nameof(queryService));
        }

        public override SourceFilterBuilder CreateSourceFilterBuilder(Item targetItem, string fieldId, string fieldSource)
        {
            if (targetItem == null) throw new ArgumentNullException(nameof(targetItem));
            if (fieldId == null) throw new ArgumentNullException(nameof(fieldId));
            if (fieldSource == null) throw new ArgumentNullException(nameof(fieldSource));

            var startSearchLocation = StringUtil.ExtractParameter("StartSearchLocation", fieldSource);
            if (!StartSearchLocationContainsQueryToken(startSearchLocation))
            {
                return base.CreateSourceFilterBuilder(targetItem, fieldId, fieldSource);
            }

            var resolvedStartSearchLocation = ResolveStartSearchLocation(startSearchLocation, targetItem);
            var resolvedFieldSource = fieldSource.Replace(startSearchLocation, resolvedStartSearchLocation);
            return base.CreateSourceFilterBuilder(targetItem, fieldId, resolvedFieldSource);
        }

        private static bool StartSearchLocationContainsQueryToken(string startSearchLocation)
        {
            return !string.IsNullOrEmpty(startSearchLocation)
                 && startSearchLocation.StartsWith("query:")
                 && startSearchLocation.Contains("$");
        }

        private string ResolveStartSearchLocation(string startSearchLocation, Item targetItem)
        {
            var query = ParseStartSearchLocationIntoQuery(startSearchLocation);
            var resolvedStartSearchLocation = _queryService.Resolve(query, targetItem.ID.ToString());

            // Multilist with Search fields only support one StartSearchLocation. If a pipe-delimited list
            // is set on the field source, no results will be returned; instead, return the first result.
            var firstStartSearchLocation = resolvedStartSearchLocation.Split('|').FirstOrDefault();
            return $"query:{firstStartSearchLocation}";
        }

        /// <summary>
        /// The StartSearchLocation parameter requires '->' in place of '=' within Sitecore queries.
        /// For example: StartSearchLocation=query:/sitecore/content//*[@@template->'SomeTemplate']
        /// The SXA query token resolver doesn't like '->', so replace with '=' for the Sitecore
        /// query engine.
        /// </summary>
        private static string ParseStartSearchLocationIntoQuery(string startSearchLocation)
        {
            return startSearchLocation.Replace("->", "=");
        }
    }
}
