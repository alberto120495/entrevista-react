import "./App.css";
import Tabla from "./components/Tabla";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container p-4">
      <Tabla />
      <ToastContainer />
    </div>
  );
}

export default App;
