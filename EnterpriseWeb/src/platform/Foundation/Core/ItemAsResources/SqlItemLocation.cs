using System;

namespace Platform.Foundation.Core.ItemAsResources
{
    public class SqlItemLocation : ItemLocation
    {
        public SqlItemLocation(string databaseName)
        {
            this.DatabaseName = databaseName;
        }

        public string DatabaseName { get; }

        public override bool Equals(ItemLocation other)
        {
            var sqlItemLocation = other as SqlItemLocation;
            return !(sqlItemLocation == null) && this.DatabaseName.Equals(sqlItemLocation.DatabaseName, StringComparison.InvariantCultureIgnoreCase);
        }
    }
}
