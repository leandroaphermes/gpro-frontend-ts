import { ConfigProvider } from "antd";
import Routers from "routers";

import "./App.css";

function App() {
  return (
    <ConfigProvider componentSize="small">
      <Routers />
    </ConfigProvider>
  );
}

export default App;
