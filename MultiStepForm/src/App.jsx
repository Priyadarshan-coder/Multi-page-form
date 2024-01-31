import React from "react";
import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Home from "./Home";
import Success from "./Success";
function App(){
  return (
<>
<BrowserRouter>
<Routes>
  <Route
  path="/" element={<Home/>}
  />
  <Route
  path="/success" element={<Success/>}
  />
</Routes>
</BrowserRouter>
</>
  );
}
export default App;