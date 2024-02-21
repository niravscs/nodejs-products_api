require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose")
const productRouter = require("./routes/productRoute")
const cors = require("cors")
const errorMiddleware = require("./middlewares/errorMiddleware")



const app = express();
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 4000

// const corsOptions = {
//   origin: "http://example.com",
//   optionSuccessStatus: 200 // some legacy browsers (IE11, various smartTVs) choke on 204
// }

// app.use(cors(corsOptions))

app.use(cors())
app.use(express.json())
app.use('/api', productRouter)


app.get('/', (req, res) => {
  throw new Error('fake error')
})


app.use(errorMiddleware)

mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URL)
.then(()=>{
  console.log("Mongo Database is connected");
}).catch((error) => {
  console.log(error);
})



app.listen(PORT, ()=> {
  console.log(`Nodejs api running on port ${PORT}`);
})