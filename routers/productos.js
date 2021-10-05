const express = require('express');

const Contenedor = require('../Contenedor');
const contenedor = new Contenedor('./productos.json');

const productosRouter = express.Router();

productosRouter.get('/', async (req, res) => {
  const list = await contenedor.getAll();
  res.send({
    message: 'operation successfull',
    data: list
  });
});

productosRouter.put('/:id', async (req, res) => {
  const idRequested = req.params.id;
  const product = req.body;
  
  const productUpdated = contenedor.update(idRequested, product);
  
  res.send({
    message: 'operation successfull',
    data: req.body
  });
});


productosRouter.post('/', async (req, res) => {
  const newProduct = req.body;

  const idProductSaved = await contenedor.save(newProduct);

  res.send({
    message: 'saved correctly',
    data: {
      ...newProduct},
    id: idProductSaved
  });
});

productosRouter.get('/:id', async (req, res) => {
  const idRequested = req.params.id;

  const productReq = await contenedor.getByID(idRequested);

  res.send({
    message: 'Your product is',
    data: {productReq}
  });
});


productosRouter.delete('/:id', async (req, res) => {
  const idRequested = req.params.id;

  const productReq = await contenedor.deleteById(idRequested);

  res.send({
    message: 'Your product was deleted.',
  });
});

module.exports = productosRouter;

/*deletebyID no esta funcionando, 
ver el tema del form
cambiar formato de productos
ver casos por errores y agregar ifs */
