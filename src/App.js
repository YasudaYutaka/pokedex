import { useState } from 'react';
import List from './components/List/List';
import Header from './components/Header/Header';
import styles from './Styles.module.scss';
import SinglePokemon from './components/SinglePokemon/SinglePokemon';

/**
 * Main component to show all the components inside a <body>
 * @returns a Header with the PokéDex logo, a Forms with input and select elements,
 * along with a grid rendering the Pokémon list, wich shows a Modal when clicked.
 */
function App() {
	const [pokemonModalIsShown, setPokemonModalIsShown] = useState(false);
	const [pokemonName, setPokemonName] = useState('');
	const [pokemonUrl, setPokemonUrl] = useState('');

	const showPokemonModalHandler = (pokemon) => {
		setPokemonModalIsShown(true);
		setPokemonName(pokemon.name);
		setPokemonUrl(pokemon.url);
	};

	const hidePokemonModalHandler = () => {
		setPokemonModalIsShown(false);
	};

	return (
		<div className={styles.container}>
			{pokemonModalIsShown && (
				<SinglePokemon
					onClose={hidePokemonModalHandler}
					pokemonName={pokemonName}
					pokemonUrl={pokemonUrl}
				/>
			)}
			<Header />
			<List onShowPokemonModal={showPokemonModalHandler} />
		</div>
	);
}

export default App;
