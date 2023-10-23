import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Post.scss"

export default function PostarProdutos() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    id: null,
    nome: '',
    desc: '',
    preco: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
   
    fetch('http://localhost:5000/produtos')
      .then((response) => response.json())
      .then((data) => {
        
        const existingIds = data.map((produto) => produto.id);
        const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
        const id = maxId + 1;
  
        const post_data = {
          id,
          nome: produto.nome,
          desc: produto.desc,
          preco: produto.preco,
        };
  
    
        fetch('http://localhost:5000/produtos', {
          method: 'POST',
          body: JSON.stringify(post_data),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => {
            console.log("STATUS DA REQUISIÇÃO: " + response.status);
            if (response.status === 201) {
              alert("Produto adicionado com sucesso!");
              // Redirect
              navigate("/produtos");
            } else {
              alert("Erro ao adicionar o produto");
              navigate('/postar/produtos');
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>ADICIONAR PRODUTOS</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Adicionar Produto</legend>
          <div>
            <label htmlFor="idNome">Nome</label>
            <input
              type="text"
              name="nome"
              id="idNome"
              placeholder="Digite o nome do produto"
              value={produto.nome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="idDesc">Descrição</label>
            <input
                type="text"
                name="desc" // Corrija o name para "descricao"
                id="idDesc"
                placeholder="Digite a descrição do produto"
                value={produto.desc}
                onChange={handleChange}
            />
            </div>
          <div>
            <label htmlFor="idPreco">Valor</label>
            <input
              type="number"
              name="preco"
              id="idPreco"
              placeholder="Digite o preço do produto"
              value={produto.preco}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" id="btnAdicionar">
              ADICIONAR
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
