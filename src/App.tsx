import { ConfigProvider, message } from "antd";
import Routers from "routers";

import antdPtBR from "antd/lib/locale/pt_BR";
import "moment/locale/pt-br";

import "./App.css";

message.config({
  duration: 3,
});

function App() {
  return (
    <ConfigProvider componentSize="small" locale={antdPtBR}>
      <Routers />
    </ConfigProvider>
  );
}

export default App;
