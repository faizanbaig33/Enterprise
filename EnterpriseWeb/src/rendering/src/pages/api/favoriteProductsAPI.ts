import { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs';

const favoriteProductsAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const favoriteProductIDs = req.body.favoriteProducts;

  const productIDConditions = favoriteProductIDs
    .map((id: string) => {
      return `{ name: "productid", value: "${id}", operator: EQ }`;
    })
    .join('\n');

  const FavoriteProductsQuery = `
    query {
      product: search(
        where: {
          AND: [
            {
              name: "_path"
              value: "6BB32758-D223-484A-B7C8-0AE22613C318"
              operator: CONTAINS
            }
            {
              name: "_templates"
              value: "{15B220E7-B36D-4C65-8F33-AA8B635449D4}"
              operator: CONTAINS
            }
            {
              OR: [
                ${productIDConditions}
              ]
            }
          ]
        }
      ) {
        results {
          ...on Product {
            ItemId: id
            productId {
              value
            }
            productName {
              value
            }
            productSubtitle {
              value
            }
            productDescription {
              value
            }
            productImage{
              ...on ImageField
               {
								title                
                src
                height
                width
                alt                
              }
            }
            productImageMobile {
              ...on ImageField
               {
								title                
                src
                height
                width
                alt                
              }
            }
            productImageMobileFocusArea
            {
              targetItem
              {
              	...on Enum
                {
                  value{value}
                }
              }
            }
            productType {
              value
            }
            productSeries {
              value
            }
            windowProductType {
              value
            }
            stormDoorProductType {
              value
            }
            exteriorDoorProductType {
              value
            }
            priceLevel {
              targetItem {
                ...on PriceLevel {
                  priceLevelText {
                    value
                  }
                }
              }
            }
            featuredInteriorColors {
              value
              jsonValue
            }
            featuredExteriorColors {
              value
              jsonValue
            }
            productDetailPageLink {
              ...on LinkField {
                text
                target
                url
                anchor
              }
            }
            name
          }
        }
      }
    }
  `;

  const Endpoint = process.env.GRAPH_QL_ENDPOINT as string;

  const client = new GraphQLRequestClient(Endpoint, {
    apiKey: process.env.SITECORE_API_KEY,
  });

  try {
    const result = (await client.request(FavoriteProductsQuery)) as any;
    const productData = result.product.results;
    res.status(200).json({ productData });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default favoriteProductsAPI;
