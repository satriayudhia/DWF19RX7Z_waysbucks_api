const express = require('express')

const router = express.Router()

const {getTodos, getTodo, addTodo, patchTodo, deleteTodo} = require('../controllers/todos')
const {getPosts} = require('../controllers/post')

//USERS
const {getUsers, deleteUsers} = require('../controllers/users')
//PRODUCTS
const {getProducts, getProduct, addProduct, 
    updateProduct, deleteProduct, restoreProduct} = require('../controllers/products')
//TOPINGS
const {getTopings, getToping} = require('../controllers/topings')

router.get('/todos', getTodos)
router.get('/todo/:id', getTodo)
router.post('/todo', addTodo)
router.patch('/todo/:id', patchTodo)
router.delete('/todo/:id', deleteTodo)

router.get('/posts', getPosts)

//USERS
router.get('/users', getUsers)
router.delete('/user/:id', deleteUsers)

//PRODUCTS
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.post('/product', addProduct)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)
router.post('/product/:id', restoreProduct)

//TOPINGS
router.get('/topings', getTopings)
router.get('/toping/:id', getToping)

module.exports = router