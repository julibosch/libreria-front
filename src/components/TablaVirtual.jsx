import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>
    <p>Anashe {index}</p>
    <p>Anashe asdasd</p>
    <p>Anashe  123123 </p>
    <p>Anashe dasdss</p>
    <p>Anashdaddddaaade</p>
  </div>
);

const TablaVirtual = () => (
  <List
    className=''
    height={450}
    itemCount={10000}
    itemSize={45}
    width={500}
  >
    {Row}
  </List>
);

export default TablaVirtual