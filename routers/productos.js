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
  const findProduct = await contenedor.getByID(idRequested);
  
  if (!findProduct) {
    res.send({
       message: `No existe el producto con el id ${idRequested}`,
    });
  }
    
  else {
    const productUpdated = contenedor.update(idRequested, product);
      res.send({
      message: `Producto ${idRequested} actualizado`,
    });
  };
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

  if (!productReq) {
    res.send({
       message: `No existe el producto con el id ${idRequested}`,
    });
  }
    
   else {
    res.send({
    message: 'Your product is',
    data: {productReq}
  });

}});



productosRouter.delete('/:id', async (req, res) => {
  const idRequested = req.params.id;
  const findProduct = await contenedor.getByID(idRequested);

  if (!findProduct) {
        res.send({
            message: `No existe un producto con el id ${idRequested}`,
        });
    }
    
    else {
        const productReq = await contenedor.deleteById(idRequested);
        res.send({
            message: `ID ${idRequested} eliminado`,
        });
    }

});

module.exports = productosRouter;