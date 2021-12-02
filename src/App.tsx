import { ConfigProvider } from 'antd';
import LaoutBaseTemplate from 'components/LayoutBase'
import Routers from 'routers';

function App() {


  return (
    <ConfigProvider componentSize="small" >
      <LaoutBaseTemplate>
        <Routers />
      </LaoutBaseTemplate>
    </ConfigProvider>
  );
}

export default App;
