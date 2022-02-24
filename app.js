const express=require('express')
const app=express();
const connectDB=require('./db/connect')
require('dotenv').config()
require('express-async-errors');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//router
const authRoute=require('./routes/auth')


//middleware
app.use(express.json())


app.use('/api',authRoute)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// connecting database and server listening
const port=process.env.PORT||7000;
const start =async ()=>{
    try {
        await connectDB(process.env.mongo_uri)
        app.listen(port,()=>{
            console.log('server is listening on port 7000...');
        })
    } catch (error) {
        console.log(error);
    }
}
start()
