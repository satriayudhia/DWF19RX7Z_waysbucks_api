const express = require('express')
const router = express.Router()
const {uploadFile} = require('../middleware/upload')
const {auth} = require('../middleware/auth')

// ================= //
// CONTROLLER IMPORT //
// ================= //

//AUTHORIZATION
const {register, login} = require('../controllers/auth')

//USERS
const {getUsers, deleteUsers} = require('../controllers/user')

//PRODUCTS
const {getProducts, getProduct, addProduct,
updateProduct, deleteProduct} = require('../controllers/product')

//TOPINGS
const {getTopings, getToping, addToping,
updateToping, deleteToping} = require('../controllers/toping')

//TRANSACTION
const {getTransactions, getTransaction,
addTransaction, updateTransaction,
deleteTransaction} = require('../controllers/transaction')


// ==== //
// PATH //
// ==== //

//AUTHORIZATION PATH
router.post('/register', register)
router.post('/login', login)

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

//TRANSACTIONS PATH
router.get('/transactions', getTransactions)
router.get('/transaction/:id', getTransaction)
router.post('/transaction', uploadFile("attachment"), addTransaction)
router.patch('/transaction/:id', uploadFile("attachment"), updateTransaction)
router.delete('/transaction/:id', deleteTransaction)

module.exports = router