export async function POST() {
    const endpoint = process.env.SHOPIFY_STORE_DOMAIN!;
    const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
    const id = window.localStorage.getItem("CartIdIt")
    const query = `
    mutation cartLinesAdd($cartId: "${id}", $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            # Include other cart fields you need here
          }
          userErrors {
            field
            message
          }
        }
      }
      
    `;
  
    try {
      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': key
        },
        body: JSON.stringify({ query })
      });
  
      const data = await result.json();
  
      return new Response(JSON.stringify({ data }), {
        status: result.status,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Error receiving data' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
  