using Sitecore.Data;

namespace Platform.Foundation.Core.Constants
{
    public static class TemplateIds
    {
        public static class Foundation
        {
            public static class Core
            {
                public static class BaseTemplates
                {
                    public static class Containers
                    {
                        public static class _BaseSharedChildDataSource
                        {
                            public static readonly ID Template = new ID("{F06168B6-15F3-4807-9767-BA92C5077506}");
                        }
                    }

                    public static class Pages
                    {
                        public static class _BasePage
                        {
                            public static readonly ID Template = new ID("{ABF549D3-3225-4821-9336-3D395CD86D32}");
                        }
                    }
                }

                public static class FieldSets
                {
                    public static class Containers
                    {
                        public static class _ChildDataSourceContainer
                        {
                            public static readonly ID Template = new ID("{F451762A-D34F-4554-BAA9-E5F3F6013B1F}");
                        }
                        public static class _FieldDataSourceContainer
                        {
                            public static readonly ID Template = new ID("{07B8BF2C-54FD-40CB-934D-2BEFB6E8CD31}");
                        }
                    }

                    public static class Search
                    {
                        public static class _IndexableItem
                        {
                            public static readonly ID Template = new ID("{BCD96EB5-B307-4230-918E-A5F9FC5DBCEF}");
                        }
                    }
                }
            }

            public static class EnhancedInsertOptions
            {
                public static class InsertOptions
                {
                    public static readonly ID Template = new ID("{D70D43E4-AEF9-43BF-89E5-B49F22675F43}");

                    public static class Fields
                    {
                        public static readonly ID Rules = new ID("{F0C111FF-F7DD-405F-8703-432CDC877F9B}");
                    }
                }

                public static class InsertOptionsSettings
                {
                    public static readonly ID Template = new ID("{7DCF5D52-57C1-49B3-B452-F27F980D51E3}");
                }

                public static class InsertOptionsTab
                {
                    public static readonly ID Template = new ID("{57314660-99FE-4363-9AA4-16E701DC4E54}");

                    public static class Fields
                    {
                        public static readonly ID Templates = new ID("{9AC18EDF-76B4-46F8-AFBE-56A079E13E35}");
                    }
                }
            }
        }
    }
}
