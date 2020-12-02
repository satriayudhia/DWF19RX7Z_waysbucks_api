const {Topings} = require('../../models')

//GET ALL TOPINGS
exports.getTopings = async (req, res) => {
    try {
        const topings = await Topings.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"]
            }
        })

        if(!topings) {
            return res.status(400).send({
                status: "data product empty",
                data: []
            })
        }

        res.send({
            status: "success",
            topings
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

//GET SPECIFIC TOPING BY ID
exports.getToping = async (req, res) => {
    try {
        const {id} = req.params
        const toping = await Topings.findOne({where: {id},
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"]
        }})

        if(!toping) {
            return res.status(400).send({
                status: "data toping not found",
                data: []
            })
        }

        res.send({
            status: "success",
            toping
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

//ADD NEW TOPING
exports.addToping = async (req, res) => {
    try {
        const {body} = req
        const toping = await Topings.create(body)

        res.send({
            status: "success",
            toping
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

//EDIT TOPING
exports.updateToping = async (req, res) => {
    try {
        const {id} = req.params
        const {body} = req

        //Cek apakah toping dengan id yg input ada
        const checkToping = await Topings.findOne({where: {id}})

        if (!checkToping) {
            return res.status(400).send({
              status: "data not found",
              data: {
                post: null,
              },
            });
          }

        await Topings.update(body, {where: {id}})

        const getUpdatedToping = await Topings.findOne({where: {id}})

        res.send({
            status: "success",
            getUpdatedToping
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

//DELETE TOPING BY ID (SOFT DELETE)
exports.deleteToping = async (req, res) => {
    try {
        const {id} = req.params
        const toping = await Topings.findOne({where: {id},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }})

        if(!toping) {
            return res.status(400).send({
                status: "data product not found",
                data: []
            })
        }

        await Topings.destroy({where: {id}})

        res.send({
            status: "success",
            toping
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

//RESTORE DELETED TOPING
exports.restoreToping = async (req, res) => {
    try {
        const {id} = req.params
        const toping = await Topings.restore({where: {id}})

        res.send({
            status: `toping with id: ${id} successfully restored`,
            toping
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
