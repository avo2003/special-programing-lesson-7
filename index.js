const express = require('express');
const app = express()
const PORT = process.PORT || 8000;
app.use(express.json());

const products = require('./data/products')



app.get('/api/products', (req, res) => {
    res.json(products);
});



app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id))
    if (!product) return res.status(404).json({ massage: 'not found' });
    res.json(product);
});

app.post('/api/products', (req, res) => {
    if (!req.body.name || !req.body.price)
        return res.status(404).json({ massage: 'Name and price are required' });
    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,

    };
    products.push(product);
    res.json(product);


});


app.patch('/api/products/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id))
    if (!product) return res.status(404).json({ massage: 'not found' });

    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
});



app.delete('/api/products/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id))
    if (!product) return res.status(404).json({ massage: 'not found' });

    const index = products.indexOf(product);
    products.splice(index, 1);



    res.json(product);
});


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));