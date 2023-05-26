import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
