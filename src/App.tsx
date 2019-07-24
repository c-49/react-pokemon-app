import * as React from 'react';
import "./App.css";

import PokemonSearch from './components/PokemonSearch'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <PokemonSearch name="{User}" numOfPokemon={3} />
        </header>
      </div>
    );
  }
}

export default App