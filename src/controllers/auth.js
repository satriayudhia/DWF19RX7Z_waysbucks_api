const {User} = require('../../models')
const Joi = require('joi')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const {body} = req

        const schema = Joi.object({
            fullname: Joi.string().min(2).required(),
            email: Joi.string().email().min(10).required(),
            password: Joi.string().min(8).required(),
            status: Joi.string()
        })

        const { error } = schema.validate(body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).send({
              status: "input validation error",
              error: {
                message: error.details.map((error) => error.message),
              },
            });
        }

        const {email} = req.body
        const userCheck = await User.findOne({where: {email}})

        if(userCheck) {
            return res.status(400).send({
                status: "email already registered",
                data: []
            })
        }

        const {fullname, password, status} = body
        const hashedPassword = await bcrypt.hash(password, 10)

        console.log("hashpassword::", hashedPassword)

        const newUser = await User.create({
            fullname,
            password: hashedPassword,
            email,
            status
        })

        const privateKey = "W4ysBucks"

        const token = jwt.sign({id: newUser.id}, privateKey)

        res.send({
            status: "your account successfully registered",
            data: {
                name: newUser.name,
                email: newUser.email,
                token
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

exports.login = async (req, res) => {
    try {
      const { body } = req
  
      //validasi login
      const schema = Joi.object({
        email: Joi.string().email().min(10).required(),
        password: Joi.string().min(8).required()
      })
  
      const { error } = schema.validate(body, {
        abortEarly: false
      })
  
      //jika ada error stop disini dan kirim response error
      if (error) {
        return res.status(400).send({
          status: "input validation error",
          error: {
            message: error.details.map((error) => error.message)
          }
        })
      }
  
      const { email, password } = req.body;
  
      //cek apakah email terdaftar
      const user = await User.findOne({
        where: {
          email
        },
      })
  
      //jika tidak terdaftar makan invalid login
      if (!user) {
        return res.status(400).send({
          status: "login failed",
          error: {
            message: "invalid login"
          }
        })
      }
  
      //melakukan comparasi terhadapat password yang diinput oleh user
      //dengan password yang ada di database
      const validPass = await bcrypt.compare(password, user.password);
  
      //jika password gak valid maka bilang invalid login
      if (!validPass) {
        return res.status(400).send({
          status: "login failed",
          error: {
            message: "invalid login"
          }
        })
      }
  
      const privateKey = "W4ysBucks"
      const token = jwt.sign(
        {
          id: user.id,
        },
        privateKey
      );
  
      //response login dengan token
      res.send({
        status: "success",
        message: "login success",
        data: {
          name: user.name,
          email: user.email,
          token,
        },
      });
    } catch (err) {
      //error here
      console.log(err);
      return res.status(500).send({
        error: {
          message: "Server Error",
        },
      });
    }
  };
  