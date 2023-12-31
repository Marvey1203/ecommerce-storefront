export async function shopifyFetch({ query, variables }: { query: string; variables?: Record<string, any> }) {
    const endpoint = process.env.SHOPIFY_STORE_DOMAIN!;
    const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
  
    try {
      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': key
        },
        body: { query, variables } && JSON.stringify({ query, variables })
      });
  
      return {
        status: result.status,
        body: await result.json()
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        status: 500,
        error: 'Error receiving data'
      };
    }
  }
  export async function getAllProducts() {
    return shopifyFetch({
      query: `{
          products(sortKey: TITLE, first: 100) {
            edges{
              node {
                id
                title
                description
                featuredImage{
                  url
                }
                handle
              }
            }
          }
        }`
    });
  }

  export async function cartCreate() {
        return await shopifyFetch({
            query: `
            mutation createCart($cartInput: CartInput) {
              cartCreate(input: $cartInput) {
                cart {
                  id
                }
              }
            }
            `
        });

}

  export default async function getOneProducts(handle:string) {
    return shopifyFetch({
      query: `{
        productByHandle(handle: "${handle}") {
          id
          title
          description
          priceRange{
            maxVariantPrice{
              amount
              currencyCode
            }
          }
          images(first:3){
            nodes{
              altText
              id
              url
            }
          }
        }
      }
      
      `
    });
  }