const {Product, Toping} = require('../../models')

exports.getProductsTopings = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: {
                model: Toping,
                through: {attributes: []},
                as: "topings",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }
        })

        if(!products) {
            return res.status(400).send({
                status: "data product empty",
                data: []
            })
        }

        res.send({
            status: "success",
            products
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