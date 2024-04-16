import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import connectDB from './Db/connectdb.js';
const app = express();
dotenv.config({
    path: "./.env" 
})

const port = 3000|| process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));
app.use('/', routes);

connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`server is listening at ${port}`);
    })
})
.catch((error)=>{
    console.error(error);
})

export default app;