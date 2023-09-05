import { InjectedConnector } from "@web3-react/injected-connector";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import MintPage from "./pages/MintPage/index";
//import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MintPage />} />
            {/* <Route path="/admin" element={<AdminPage />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
export const Injected = new InjectedConnector({});
