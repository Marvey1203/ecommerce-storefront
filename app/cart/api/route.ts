
export async function POST(cartInput: { /* your CartInput type here */ }) {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN!;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
  
  const query = `
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
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
      body: JSON.stringify({
        query,
        variables: {
          cartInput: cartInput
        }
      })
    });

    const data = await result.json();

    return new Response(JSON.stringify({ data }), {
      status: result.status, // Pass the status from the Shopify response to the Response object
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
