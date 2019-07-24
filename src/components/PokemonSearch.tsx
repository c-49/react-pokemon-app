import React, { Component } from "react";
import User from "../interfaces/UserInterface";
import "./../App.css";

interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}

interface Pokemon {
  name: string;
  imageUrl: string;
}

export class PokemonSearch extends Component<User, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;
  constructor(props: User) {
    super(props);
    this.state = {
      error: false,
      pokemon: null
    };
    this.pokemonRef = React.createRef();
  }
  onSearchClick = () => {
    const inputValue = this.pokemonRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then(res => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then(data => {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            imageUrl: data.sprites.front_default
          }
        });
      });
    });
  };
  render() {
    const { name: userName, numOfPokemon } = this.props;
    const { error, pokemon } = this.state;

    let resultMarkup;

    if (error) {
      resultMarkup = <p>Pokemon not found, please try again</p>;
    } else if (this.state.pokemon) {
      resultMarkup = (
        <div className="flex-container">
          <div className="row">
            <div>
              <img src={pokemon.imageUrl} alt="pokemon" />
            </div>

            <div>{pokemon.name}</div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>
          Trainer {userName}{" "}
          {numOfPokemon && <span>has {numOfPokemon} pokemons</span>}
        </p>
        <div>{resultMarkup}</div>
        <div className="search">
          <input
            type="text"
            ref={this.pokemonRef}
            placeholder="Search Pokemon"
          />
          <button onClick={this.onSearchClick} className="fa fa-search">
            <div>GO</div>
          </button>
        </div>
      </div>
    );
  }
}

export default PokemonSearch;
