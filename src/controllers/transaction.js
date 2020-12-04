const {Transaction, User, Product, Toping} = require('../../models')
const Joi = require('joi')

// ================ //
// GET ALL PRODUCTS //
// ================ //
exports.getTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "UserId", "userId"]
            },
            include: [{
                model: User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "status"]
                },
            },
            {
                model: Product,
                through: {attributes: []},
                as: "products",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [{
                    model: Toping,
                    as: "topings",
                    through: {attributes: []},
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }]
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
            data: {
                transaction
            }
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

// ================= //
// GET PRODUCT BY ID //
// ================= //
exports.getTransaction = async (req, res) => {
    try {
        const {id} = req.params
        const transaction = await Transaction.findOne({
            where: {id},
            attributes: {
                exclude: ["createdAt", "updatedAt", "UserId", "userId"]
            },
            include: [{
                model: User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "status"]
                },
            },
            {
                model: Product,
                through: {attributes: []},
                as: "products",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [{
                    model: Toping,
                    as: "topings",
                    through: {attributes: []},
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }]
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
            data: {
                transaction
            }
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

// =============== //
// ADD NEW PRODUCT //
// =============== //
exports.addTransaction = async (req, res) => {
    try {
        const {body, files} = req
        const fileName = files.attachment[0].filename

        const schema = Joi.object({
            userId: Joi.number().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().max(12).min(5).required(),
            address: Joi.string().min(5).required(),
            posCode: Joi.string().required(),
            status: Joi.string().required(),
            income: Joi.number().required()
        })

        const {error} = schema.validate(body, {
            abortEarly: false
        })

        if (error) {
            return res.status(400).send({
                status: 'validation error',
                errors: {
                    message: error.details.map((detail) => detail.message)}
            })
        }
        
        const transaction = await Transaction.create({...body, attachment: fileName })

        if(!transaction) {
            return res.status(400).send({
                status: "failed to add new transaction",
                data: []
            })
        }

        const response = await Transaction.findOne({where: {id: transaction.id}})

        res.send({
            status: "success",
            data: {
                response
            }
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

// ================ //
// EDIT TRANSACTION //
// ================ //
exports.updateTransaction = async (req, res) => {
    try {
        const {id} = req.params
        console.log("value id", id)
        const {body, files} = req
        const fileName = files.attachment[0].filename
        console.log("value filename", fileName)

        const schema = Joi.object({
            userId: Joi.number().required(),
            name: Joi.string().required(),
            email: Joi.string().email(),
            phone: Joi.string().required(),
            address: Joi.string().min(5).required(),
            posCode: Joi.string().required(),
            status: Joi.string().required(),
            income: Joi.number().required()
        })

        const {error} = schema.validate(body, {
            abortEarly: false
        })

        if (error) {
            return res.status(400).send({
                status: 'validation error',
                errors: {
                    message: error.details.map((detail) => detail.message)}
            })
        }
        
        const transaction = await Transaction.update({...body, attachment: fileName },{where: {id}})

        if(!transaction) {
            return res.status(400).send({
                status: "failed to edit transaction",
                data: []
            })
        }

        const response = await Transaction.findOne({where: {id}})

        res.send({
            status: "success",
            data: {
                response
            }
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

// ================== //
// DELETE TRANSACTION //
// ================== //
exports.deleteTransaction = async (req, res) => {
    try {
        const {id} = req.params
        const transaction = await Transaction.findOne({where: {id}})

        if(!transaction) {
            return res.status(400).send({
                status: "data transaction not found",
                data: []
            })
        }

        await Transaction.destroy({where: {id}})

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