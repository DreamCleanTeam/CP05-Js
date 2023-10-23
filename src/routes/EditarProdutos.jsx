import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./EditarProdutos.scss"

export default function EditarProdutos() {
 
  //Recuperando o parâmetro ID com o useParams();

    const {id} = useParams()
    document.title = "Editar Produtos " + id
    const navigate = useNavigate()
    const [produto, setProduto] = useState({
      id:id,
      nome:'',
      desc:'',
      preco:''
    })

    useEffect(() => {
      fetch(`http://localhost:5000/produtos/${id}`)
        .then((response)=> response.json())
        .then((response)=> setProduto(response))
        .catch(error => console.log(error))
    }, [id])

    const handleChange = (e)=>{

      //Destructuring
      const {name,value} = e.target
      //Preencher o useState com a função set... utilizando
      // o operador SPREAD ...
      setProduto({...produto,[name]:value})

    }

    const handleSubmit = (e) =>{
      e.preventDefault()

      fetch(`http://localhost:5000/produtos/${id}`, {
        method: "PUT", 
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      })
      .then(response => console.log("STATUS DA REQUISIÇÃO: " + response.status))
      .catch(error => console.log(error))
    
    //Redirect
    navigate("/produtos")
    }
  
  return (
    <div>
      <h1>EDITAR PRODUTOS</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Produto Selecionado</legend>
          <div>
            <label htmlFor="idNome">Nome</label>
            <input type="text" name="nome" id="idNome" placeholder="Digite o nome do produto" value={produto.nome} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="idDesc">Descricao</label>
            <input type="text" name="desc" id="idDesc" placeholder='Digite a descrição do produto' value={produto.desc} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="idPreco">Valor</label>
            <input type="number" name="preco" id="idPreco" placeholder='Digite o preço do produto' value={produto.preco} onChange={handleChange}/>
          </div>
          <div>
            <button>EDITAR</button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}