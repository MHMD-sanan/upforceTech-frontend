import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import AddUser from "./components/AddUser";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import EditUser from "./components/EditUser";
import View from "./components/View";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<AddUser />} />
          <Route exact path="/edit" element={<EditUser />} />
          <Route exact path="/view" element={<View />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
