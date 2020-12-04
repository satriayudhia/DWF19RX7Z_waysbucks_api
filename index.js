const express = require('express')

const app = express()

const router = require('./src/routes')

const port = 5000

app.use(express.json())

app.use("/uploads", express.static("uploads"));

app.use('/api/v1', router)

app.listen(port, () => console.log(`port ${port} berhasil dijalankan`))