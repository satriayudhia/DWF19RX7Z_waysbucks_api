const {Users} = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.findAll()

        if(!users) {
            return res.status(400).send({
                status: "DATA USERS EMPTY",
                data: []
            })
        }

        res.send({
            status: "GET USERS SUCCESS",
            users
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: {
                message: "Server Error"
            }
        })
    }
}

exports.deleteUsers = async (req, res) => {
    try {
        // let users = await Users.findAll()
        const {id} = req.params
        await Users.destroy({where: {id: id}}).then(user => {
            res.send({
                status: "DELETE DATA SUCCESS",
                user
            })
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: {
                message: "Server Error"
            }
        })
    }
}