const {Transaction, User, Product, Toping} = require('../../models')

exports.getTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: [{
                model: User,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
            },
            {
                model: Product, include: [{
                    model: Toping,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
            }]
        })

        if(!transaction) {
            return res.status(400).send({
                status: "data product empty",
                data: []
            })
        }

        res.send({
            status: "success",
            transaction
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: {
                status: "server error"
            }
        })
    }
}