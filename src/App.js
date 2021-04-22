import './App.css';
import {
  BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom';
import { Layout } from "antd";
import "antd/dist/antd.css";
import PokemonList from './pages/PokemonList';
import Pokemons from './pages/Pokemons';

function App() {

  return (
    <Layout.Content style={{ padding: 20 }}>
      <Router>
        <Link to="/">Perfil do treinador</Link> | <Link to="/pokemonlists/">Lista de Pokemons</Link>
        <Switch>
          <Route exact path="/">
            <PokemonList />
          </Route>
          <Route exact path="/pokemonlists/">
            <Pokemons />
          </Route>
        </Switch>
      </Router>
    </Layout.Content>
  );
}

export default App;
