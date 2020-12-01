let todos = [
    {
        id: 1,
        title: "Belajar Express",
        isDone: false,
    },
    {
        id: 2,
        title: "Belajar Javascript",
        isDone: true,
    }
]

exports.getTodos = (req, res) => {
    res.send({
        data: todos
    })
}

exports.getTodo = (req, res) => {
    const id = req.params.id
    const todo = todos.find((todo) => todo.id == id)
    if(!todo) {
        return res.send({
            status: "DATA EMPTY",
            data: null
        })
    }

    res.send({
        status: "GET DATA SUCCESS",
        data: todo
    })
}

exports.addTodo =  (req, res) => {
    const todo = req.body
    todos = [...todos, todo]
    res.send({
        status: "POST DATA SUCCESS",
        data: todo
    })
}

exports.patchTodo = (req, res) => {
    const id = req.params.id
    todos = todos.map((todo) => todo.id == id ? req.body : todo)
    res.send({
        status: "PATCH DATA SUCCESS",
        data: req.body
    })
}

exports.deleteTodo = (req, res) => {
    const {id} = req.params
    todos = todos.filter((todo) => todo.id != id)
    res.send({
        status: "DELETE DATA SUCCESS",
        data: id
    })
}