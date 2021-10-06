const express = require('express');
const { Router } = express

const productosRouter = require('./routers/productos');

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const PORT = 8080;



//Routing
app.get('/', (req, res) => {
    res.send({ mensaje: '7. Router y Multer'})
});


app.use('/api/productos', productosRouter);


//Server init y error
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});

app.on('error', (error) => console.log('Error: ', error));

