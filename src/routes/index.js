const express = require('express')

const router = express.Router()

const {getTodos, getTodo, addTodo, patchTodo, deleteTodo} = require('../controllers/todos')
const {getPosts} = require('../controllers/post')
const {getUsers, deleteUsers} = require('../controllers/users')

router.get('/todos', getTodos)
router.get('/todo/:id', getTodo)
router.post('/todo', addTodo)
router.patch('/todo/:id', patchTodo)
router.delete('/todo/:id', deleteTodo)

router.get('/posts', getPosts)

//USER
router.get('/users', getUsers)
router.delete('/user/:id', deleteUsers)

module.exports = router