import Header from "../../components/Header";
import background from "../../assets/background.png";
import './styles.css';
import ItemList from '../../components/ItemList'
import { useState } from "react";
import api from "../../services/api";

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [repos, setRepos] = useState('');

  const handleGetData = async () => {
    if (user === '') {
      alert('Digite um usuário válido');
      return;
    }

    try {
      const response = await api.get(`https://api.github.com/users/${user}`);
      const data = await response.data;

      if (data.message === 'Not Found') {
        setCurrentUser('');
        setRepos('');
        alert('Usuário não encontrado');
        return;
      }

      setCurrentUser(data);
      
      const reposResponse = await fetch(data.repos_url);
      const reposData = await reposResponse.json();
      
      setRepos(reposData);
    } catch (error) {
      if (error.status === 404) {
        alert('Usuário não encontrado');
      } else {
        console.error('Erro ao buscar dados do usuário:', error);
        alert('Erro ao buscar dados do usuário. Tente novamente mais tarde.');
      }
      setCurrentUser('');
      setRepos('');
    }
  }

  const handleOnRemove = (title) => {
    const filteredRepos = repos.filter(repo => repo.name !== title);
    setRepos(filteredRepos);
  }

  return (
    <div className="App">
        <Header></Header>
        <div className="conteudo">
          <img src={background} className="background" alt="Imagem de fundo"></img>
          <div className="info">
            <div>
              <input 
                name="usuario" 
                value={user} 
                onChange={event => setUser(event.target.value)} 
                placeholder="@username">
                </input>
              <button onClick={handleGetData}>Buscar</button>
            </div>
            { currentUser && currentUser.name ? (
            <>
              <div className="perfil">
                <img className="perfilImg" src={currentUser.avatar_url} alt="Foto do Perfil" />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>Descrição</span>
                  <p>{currentUser.bio ? currentUser.bio : 'N/A'}</p>
                </div>
              </div>
              <hr></hr>
            </>
            ) : null}
            { repos && repos.length ? (
            <>
              <div>
                <h4 className="repositorio">Repositórios</h4>
                {repos.map(repo => (
                  <ItemList title={repo.name} description={repo.description} onRemove={() => handleOnRemove(repo.name)}></ItemList>
                ))}
              </div>
            </>
            ) : null}
          </div>
        </div>
    </div>
  );
}

export default App;
