const express = require('express')
const dotenv = require('dotenv')
const app = express()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000
var CronJob = require('cron').CronJob;
//const TodayNumbers = require('./functions/GenerateLotteryNo')

//var job2 = new CronJob('* * * * *',function() {
//  console.log('Generating in 10 3-digit numbers minutes') 
//  TodayNumbers();
//}
//);

//job2.start();//



 

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

//USER DATA
app.use('/api/lotteryapp/users',require('./routes/addUserDataRoute'))

app.use('/api/lotteryapp/tickets',require('./routes/LotteryTicketRoute'))

app.use('/api/lotteryapp/results',require('./routes/LotteryResultRoute'))

//daily surprise lottery route
app.use('/api/lotteryapp/dailysurp',require('./routes/dailySurprizelottertRoute'))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})