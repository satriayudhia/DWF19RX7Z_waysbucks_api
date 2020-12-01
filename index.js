const express = require('express')
// const bodyParser = require('body-parser')

const app = express()

const router = require('./src/routes')
const routerV2 = require('./src/routes/routeV2')

const port = 5000

app.use(express.json())

app.use('/api/v1', router)
app.use('/api/v2', routerV2)

app.listen(port, () => console.log(`port ${port} berhasil dijalankan`))