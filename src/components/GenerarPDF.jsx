import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: '15px',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24
  },
  tableColCodigo: {
    width: '15%',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '10px'
  },
  tableColPrecio: {
    width: '15%',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '10px'
  },
  tableColDescripcion: {
    width: '70%',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: '10px'
  },
  tableHeader: {
    backgroundColor: '#555',
    color: '#FFF',
    fontWeight: 'bold',
    paddingVertical: '5px'
  },
});

const GenerarPDF = ({ articulosSeleccionados, tituloPDF }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>{tituloPDF}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableColCodigo, styles.tableHeader]}>Codigo</Text>
              <Text style={[styles.tableColDescripcion, styles.tableHeader]}>Descripcion</Text>
              <Text style={[styles.tableColPrecio, styles.tableHeader]}>Precio</Text>
            </View>
            {articulosSeleccionados.map((articulo, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableColCodigo}>{articulo.codigo_buscador}</Text>
                <Text style={styles.tableColDescripcion}>{articulo.descripcion}</Text>
                <Text style={styles.tableColPrecio}>${Number(articulo.precio).toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GenerarPDF;
