const express =  require("express")
const querystring = require('querystring')
const app = express()
const cors = require("cors")
const { PORT } = require('./src/constants')
const router = require('./src/modules/')

app.use(express.json())
app.use(cors())

app.use("/api", router)




app.listen(PORT, () => console.log(PORT))