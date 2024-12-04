import express from 'express';
import dotenv from 'dotenv';
import { productRoute } from './routes/productRoutes.js';

const app = express();
dotenv.config();
app.use(express.json())


app.get('/',(req,res)=>{
    res.status(200).send("Welcome to backend")
})

// routes intialized 

app.use('/products',productRoute)




const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("server started",PORT);   
})
