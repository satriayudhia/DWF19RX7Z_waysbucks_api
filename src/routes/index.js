const express = require('express')

const router = express.Router()

//USERS
const {getUsers, deleteUsers} = require('../controllers/users')
//PRODUCTS
const {getProducts, getProduct, addProduct,
updateProduct, deleteProduct} = require('../controllers/product')
//PRODUCTSTOPINGS
const {getProductsTopings} = require('../controllers/productToping')
//TOPINGS
const {getTopings, getToping, addToping,
updateToping, deleteToping} = require('../controllers/toping')

//USERS PATH
router.get('/users', getUsers)
router.delete('/user/:id', deleteUsers)

//PRODUCTS PATH
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.post('/product', addProduct)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)
// router.post('/product/:id', restoreProduct)

// //TOPINGS PATH
router.get('/topings', getTopings)
router.get('/toping/:id', getToping)
router.post('/toping', addToping)
router.patch('/toping/:id', updateToping)
router.delete('/toping/:id', deleteToping)
// router.post('/toping/:id', restoreToping)

//PRODUCTSTOPINGS PATH
router.get('/product-toping', getProductsTopings)

module.exports = router