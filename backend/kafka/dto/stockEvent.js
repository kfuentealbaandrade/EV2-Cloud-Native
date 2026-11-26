function createStockEvent(producto) {
  return {
    productoId: producto.id,
    nombre: producto.nombre,
    stock: producto.stock,
    timestamp: new Date().toISOString()
  };
}

module.exports = createStockEvent;
