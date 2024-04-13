import express from 'express';

const app = express();
const port = 3000|| process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));

app.get('/', (req, res) => {
    res.render('firstpage', { title: 'Express' });
}
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);
