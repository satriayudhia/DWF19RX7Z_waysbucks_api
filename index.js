const express = require('express')

const app = express()

// const db = require("./models");
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("sequelize db sync");
// });

const router = require('./src/routes')

const port = 5000

app.use(express.json())

app.use('/api/v1', router)

app.listen(port, () => console.log(`port ${port} berhasil dijalankan`))