function createPedidoEvent(pedido) {
  return {
    pedidoId: pedido.pedidoId,
    clienteId: pedido.clienteId,
    productoId: pedido.productoId,
    producto: pedido.producto,
    cantidad: pedido.cantidad,
    precioUnitario: pedido.precioUnitario,
    fecha: pedido.fecha
  };
}

module.exports = createPedidoEvent;