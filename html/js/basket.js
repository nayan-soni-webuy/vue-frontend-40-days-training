//basket operations- add to basket, remove from basket..
//each func will retun new basket instead of updating old basked..

// add prod.. to basket, if already added increase its quantity.. 
const addToBasket = (basket, product) => {
    // console.log(product);
    const alreadyInBasket = basket.some((item) => {
        return item.id === product.id
    });

    if(alreadyInBasket) {
        return basket.map((item) => {
            return item.id === product.id ? {...item, quantity: item.quantity + 1} : item;
        });
    }

    //ni h to basket me dalo
    const {id, name, price} = product;
    return [...basket, {id, name, price, quantity: 1}];

};

//----------remove prodcut from basket------
const removeFromBasket = (basket, productId) => {
    return basket.filter((item) => {
        return item.id !== productId
    });
} 