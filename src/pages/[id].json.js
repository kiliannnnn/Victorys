export const prerender = false;

export async function GET({ params }) {
    const id = params.id;
    const product = await getProduct(id);

    if (!product) {
        return new Response(null, {
            status: 404,
            statusText: 'Not found'
        });
    }

    return new Response(
        JSON.stringify(product), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    );
}

async function getProduct(id) {
    // simulate fetching product from database
    const products = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
        { id: '3', name: 'Product 3' }
    ];
    return products.find(p => p.id === id);
}