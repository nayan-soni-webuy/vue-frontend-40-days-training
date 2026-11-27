// fetch all products from api and create array of object's, each object is product
let products = [];

async function fetchProducts() {

    const response = await fetch('https://dummyjson.com/products?limit=0');
    if(!response.ok) {
        throw new Error('Something went wrong server sucide!');
    }
    const data = await response.json();

    products = data.products.map(product => ({
        id: product.id,
        name: product.title,
        category: product.category,
        brand: product.brand,
        price: product.price,
        rating: product.rating,
        stock: product.stock
    }));

    // console.log(products);
    return products;
}

