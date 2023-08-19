const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit =  require('express-rate-limit')
const router = require('./routes')
require('dotenv').config();
const PORT = process.env.PORT||5000
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	max: 5,


})


app.use(limiter);
app.set('trust proxy',1);


// parse application/json
app.use(bodyParser.json())


app.use('/api',router)

app.get('/',(req,res)=>{
    res.send("Backend Is Live...")
})



app.listen(PORT,()=>{
    console.log(`Listening to the port number ${PORT}`);
})
