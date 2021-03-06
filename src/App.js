import React from "react";
import { AppRouting } from "./app.routing.jsx";
import { ToastContainer } from "material-react-toastify";
function App() {
  return (
    <div className="App">
      <AppRouting></AppRouting>
      <ToastContainer />
    </div>
  );
}

export default App;
