import GenerarPDF from "../components/GenerarPDF"
import { PDFViewer } from '@react-pdf/renderer';

const VistaPDF = () => {
  return (
    <section>
    <PDFViewer width="100%" height="100%">
      <GenerarPDF />
    </PDFViewer>
</section>
  )
}

export default VistaPDF;