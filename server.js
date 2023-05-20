const express = require('express')
const dotenv = require('dotenv')
const app = express()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000


dotenv.config(
  {
    path:'./config/config.env'
  }
)

app.use(express.json({}))
app.use(express.json({
  extended:true
}))


//below config file=========

connectDB();

//==========================
//app.get('/', (req, res) => {var datetime = new Date();console.log(datetime);res.send(datetime)})

//user register url : https://localhost:3000/api/lotteryapp/auth/register
app.use('/api/lotteryapp/auth',require('./routes/user'))


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})