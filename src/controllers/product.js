const {Product} = require('../../models')

//GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
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

//GET SPECIFIC PRODUCT BY ID
exports.getProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findOne({where: {id},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }})

        if(!product) {
            return res.status(400).send({
                status: "data product not found",
                data: []
            })
        }

        res.send({
            status: "success",
            product
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

//ADD NEW PRODUCT
exports.addProduct = async (req, res) => {
    try {
        const {body} = req
        const product = await Product.create(body)

        res.send({
            status: "success",
            product
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

//EDIT PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const {body} = req

        //Cek apakah produk dengan id yg input ada
        const checkProduct = await Product.findOne({where: {id}})

        if (!checkProduct) {
            return res.status(400).send({
              status: "data not found",
              data: {
                post: null,
              },
            });
          }

        await Product.update(body, {where: {id}})

        const getUpdatedProduct = await Product.findOne({where: {id}})

        res.send({
            status: "success",
            getUpdatedProduct
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

//DELETE PRODUCT BY ID (SOFT DELETE)
exports.deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findOne({where: {id},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }})

        if(!product) {
            return res.status(400).send({
                status: "data product not found",
                data: []
            })
        }

        await Product.destroy({where: {id}})

        res.send({
            status: "success",
            product
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

//RESTORE DELETED PRODUCT
// exports.restoreProduct = async (req, res) => {
//     try {
//         const {id} = req.params
//         const product = await Products.restore({where: {id}})

//         res.send({
//             status: `product with id: ${id} successfully restored`,
//             product
//         })
//     } catch (err) {
//         console.log(err)
//         return res.status(500).send({
//             error: {
//                 status: "server error"
//             }
//         })
//     }
// }
