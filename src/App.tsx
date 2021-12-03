import { ConfigProvider } from "antd";
import Routers from "routers";

function App() {
  return (
    <ConfigProvider componentSize="small">
      <Routers />
    </ConfigProvider>
  );
}

export default App;
