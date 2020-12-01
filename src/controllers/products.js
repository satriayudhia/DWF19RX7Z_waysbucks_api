const {Products} = require('../../models')

exports.getProducts = async (req, res) => {
    try {
        const products = await Products.findAll()

        if(!products) {
            return res.status(400).send({
                status: "DATA PRODUCTS EMPTY",
                data: []
            })
        }

        res.send({
            status: "GET PRODUCTS SUCCESS",
            products
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

exports.getProduct = async (req, res) => {
    try {
        const products = await Products.findOne({where: {id: req.params.id}})

        if(!products) {
            return res.status(400).send({
                status: "DATA PRODUCTS NOT FOUND",
                data: []
            })
        }

        res.send({
            status: "GET DETAIL PRODUCT SUCCESS",
            products
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

// exports.deleteUsers = async (req, res) => {
//     try {
//         // let users = await Users.findAll()
//         const {id} = req.params
//         await Users.destroy({where: {id: id}}).then(user => {
//             res.send({
//                 status: "DELETE DATA SUCCESS",
//                 user
//             })
//         })
//     } catch (err) {
//         console.log(err)
//         return res.status(500).send({
//             error: {
//                 message: "Server Error"
//             }
//         })
//     }
// }