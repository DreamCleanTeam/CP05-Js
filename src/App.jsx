import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

export default function App() {

  return (
    <>
      <div className={styles.container}>
        <Cabecalho />
          <Outlet />
        <Rodape/>
      </div>
    </>
  );
}
