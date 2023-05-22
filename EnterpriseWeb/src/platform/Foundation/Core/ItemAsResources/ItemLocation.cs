using System;

namespace Platform.Foundation.Core.ItemAsResources
{
    public abstract class ItemLocation : IEquatable<ItemLocation>
    {
        public static bool operator ==(ItemLocation left, ItemLocation right) => (object)left == null ? (object)right == null : left.Equals(right);

        public static bool operator !=(ItemLocation left, ItemLocation right) => !(left == right);

        public virtual bool Equals(ItemLocation other) => other != (ItemLocation)null && this.GetType().IsInstanceOfType((object)other);

        public override bool Equals(object obj) => this.Equals(obj as ItemLocation);

        /// <inheritdoc />
        public override int GetHashCode() => this.GetType().GetHashCode();
    }
}
