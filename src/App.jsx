import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/rotas";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}