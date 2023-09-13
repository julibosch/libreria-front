# -----BACKEND-----

## adminRoutes.js
- Ruta para la actualizacion de precios masiva --> router.post('/articulo/actualizar-precio', actualizarPrecios)

## Articulo.js (Model de articulo)
- Cambio en el Datatype del codigo_buscador : INTEGER --> STRING 
- Cambio en el Datatype del codigo_barra : FLOAT --> STRING 
Cuando se devolvia la respuesta desde el back, los codigos de barra se devolvian como numero al estar asi determinado el Datatype, por eso me los imprimia como NaN en el front.
- Cambio en el Datatype del precio : DECIMAL(18,2) --> DECIMAL(18,3) 

## articuloController.js
- Funcion para actualizar los precios masivos --> actualizarPrecios


## package.json
- Dependencias instaladas de sweetalert2


# -----FRONTEND-----

## ModalAumentoPrecios.jsx
- Tuve que modificar la logica para eliminar duplicados, ya que el set solo elimina elementos que son duplicados identicos, es decir, todos sus campos, osea que si tengo un articulo con id=1 con precio=200 y otro articulo con id=1 pero con precio=300, lo toma como distinto.