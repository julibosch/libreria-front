# -----BACKEND-----
## ARTICULOCONTROLLER
- altaArticulo: Modifique la respuesta, ahora se devuelve tambien la descripcion del tipoArticulo al front, ya que antes solo se devolvia la claveforanea, y al hacer el setArticulos en el front se seteaba el numero y no la descripcion, por lo que al hacer el .map para renderizar el nuevo articulo el campo Tipo Articulo aparecia vacio ya que no coincidia el tipo de dato con el esperado.

- editarArticulo: Luego de hacer el update a la db, me creo un objeto de articuloActualizado con los datos del articulo actualizado para devolverlo al front, tambien devuelvo la respuesta(1 si se edito con exito, 0 si no hubo modificaciones) para luego dependiendo del exito o no, actualizo el arreglo y muestro mensaje de exito o muestro mensaje de error que no hubo modificaciones.


# -----FRONTEND-----
## PROVIDER
- Agregué un estado para el id del articulo que se quiere editar, ya que la funcion editarArticulo se encuentra en el provider.
- Cambie el nombre del state activarModal a activarAltaModal porque era confuso.	
- Movi la funcion eliminarArticulo que estaba en Articulo al provider para tener todas las peticiones de axios en el provider asi queda mas limpio, para saber que articulo tiene que eliminar toma el articuloProp como parametro, que tiene el id.
- Movi tambien la funcion handleCerrar al provider, que lo que hace basicamente es resetear todos los estados, y poner en false los modals tanto de Alta como de Editar.

## ARTICULO
- El handleEliminar lo pase al provider y ahora se llama eliminarArticulo.
- La funcion handleEditar lo que hace es poner en true el state activarEditar, es decir, muestra el modal AltaArticulo pero en modo edicion, y tambien setea todos los states con los campos del articulo a editar para que el modal se rellene con el articulo que se quiere editar.

## ALTA_ARTICULO
- Al hacer submit en el form, la funcion handleSubmit lo unico que hace es validar que el formulario no tenga campos vacios y setear el state de articulo con dichos campos.
- Agregue 2 useEffects, uno en caso de que el state articulo se llene y el modal este en modo ALTA y el otro en caso de que se llene el state articulo y este el modal en modo EDICION, dependiendo de cada caso se llama a la funcion guardarArticulo o editarArticulo que estan en el provider, donde se hacen las respectivas consultas al back.

