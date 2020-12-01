const {Topings} = require('../../models')

exports.getTopings = async (req, res) => {
    try {
        const topings = await Topings.findAll()

        if(!topings) {
            return res.status(400).send({
                status: "DATA TOPINGS EMPTY",
                data: []
            })
        }

        res.send({
            status: "GET TOPINGS SUCCESS",
            topings
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

exports.getToping = async (req, res) => {
    try {
        const toping = await Topings.findOne({where: {id: req.params.id}})

        if(!toping) {
            return res.status(400).send({
                status: "DATA TOPING NOT FOUND",
                data: []
            })
        }

        res.send({
            status: "GET DETAIL PRODUCT SUCCESS",
            toping
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