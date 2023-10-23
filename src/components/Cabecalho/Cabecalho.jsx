import { Link, useLocation } from "react-router-dom"
import styles from "./Cabecalho.module.css"
import "./Cabecalho.scss"

export default function cabecalho() {
  
  const rotaAtual = useLocation()

  return (
    <>
      <header className={styles.cabecalho}>
        <img src="/public/img/produtos.png" alt="Carrinho de compras" />

        <nav>
          <ul>
            <li><Link to='/' className={rotaAtual.pathname == "/" ? "active" : ""}>HOME</Link></li>
            <li><Link to='/produtos' className={rotaAtual.pathname == "/produtos" ? "active" : ""}>PRODUTOS</Link></li>
            <li><Link to='/postar/produtos' className={rotaAtual.pathname == "/postar/produtos" ? "active" : ""}>ADICIONAR</Link></li>
          </ul>
        </nav>
      </header>
    </>
    )
}
