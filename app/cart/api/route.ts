export async function POST() {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN!;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
  
  const query = `
  mutation {
    cartCreate(input: {}) {
      cart {
        id
        checkoutUrl
        cost{
          checkoutChargeAmount{
            amount
          }
        }
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
