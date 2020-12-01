const {Post} = require('../../models')

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll()

        if(!posts) {
            return res.status(400).send({
                status: "DATA EMPTY",
                data: []
            })
        }

        res.send({
            status: "GET POST SUCCESS",
            data: {
                posts
            }
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