import { ConfigProvider } from 'antd';
import LaoutBaseTemplate from 'components/LayoutBase'

function App() {


  return (
    <ConfigProvider componentSize="small" >
      <LaoutBaseTemplate />
    </ConfigProvider>
  );
}

export default App;
