'use strict';

module.exports = {
  get_all_products: get_all_products,
    get_product: get_product
};
const db = require('./surreal.js');


function get_all_products(req, res) {
    console.log('Got all products');
    // get all products from the database
    db.select('product')
    .then((result) => {
        if(result.length > 0){
            res.json(result);
        } else {
            res.status(204).send("No products found")
        }
    }).catch((err) => {
        res.status(204).send("No products found")
    });
}

function get_product(req, res) {
    console.log('Got product');
    // get all information about a single product from the database
    db.query('SELECT * FROM product WHERE slug = "' + req.swagger.params.id.value +'"').then((result) => {
        if(result[0].result.length > 0){
            res.json(result[0].result[0]);
        } else {
            res.status(204).send("No product found")
        }
    }).catch((err) => {
        res.status(204).send("No product found")
    });
}





    // CREATE product CONTENT {
    //     id: 1,
    //     name: 'Nerdy Rubber Duck',
    //     price: 28,
    //     slug: 'nerdy-duck',
    //     stock: 100,
    //     image: 'https://i.ibb.co/7tG563K/2bf49c52-92e4-496b-b23f-5e34c4f5e698.jpg',
    //     description: 'This is a nerdy rubber duck. It is a rubber duck that is nerdy.',
    //     colors: ['red', 'green', 'blue'],
    //     sizes: ['Small', 'Medium', 'Large'],
    // };
    // CREATE product CONTENT {
    //     id: 2,
    //     name: 'Server Farm Planters',
    //     price: 135,
    //     slug: 'server-farm-planters',
    //     stock: 100,
    //     image: 'https://i.ibb.co/9gY76tp/cd9c964c-036a-406f-8197-df0bdd00146b.jpg',
    //     description: 'These are planters that look like server farms. They are planters that look like server farms.',
    //     colors: ['red', 'green', 'blue'],
    //     sizes: ['Small', 'Medium', 'Large'],
    // };
    // CREATE product CONTENT {
    //     id: 3,
    //     name: 'Van Gogh Drawing of a computer',
    //     price: 89,
    //     slug: 'van-gogh-drawing',
    //     stock: 100,

    //     image: 'https://i.ibb.co/1R7wr06/aea52ba8-2fb2-4282-962f-2058c9d42fdf.jpg',
    //     description: 'This is a Van Gogh drawing of a computer. It is a Van Gogh drawing of a computer.',
    //     colors: ['red', 'green', 'blue'],
    //     sizes: ['Small', 'Medium', 'Large'],
    // };
