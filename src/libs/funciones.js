export const formatearPrecio = (precio) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(precio);
};

export const formatearFecha = (fecha) => {
  const fechaFormateada = new Date(fecha);
  const opciones = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return fechaFormateada.toLocaleDateString("es-AR", opciones);
};