import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './List.module.scss';
import Spinner from '../../assets/img/pokeball-spinner.gif';

/**
 * Filters Pokémon, renders a list and consumes an API.
 * @param {*} props from App.js
 * @returns dropdown with Pokémon regions, input to search pokemons by name and the Pokémon list in a grid.
 */
const List = (props) => {
	const [pokemons, setPokemons] = useState([]);
	const [text, setText] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [pokemonOffset, setPokemonOffset] = useState(0);
	const [pokemonLimit, setPokemonLimit] = useState(151);
	const [isValid, setIsValid] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadPokemons = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/?limit=${pokemonLimit}&offset=${pokemonOffset}`
				);
				setPokemons(response.data.results);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		loadPokemons();
	}, [pokemonOffset, pokemonLimit]);

	/**
	 * Render a list with all the pokemons called from the API
	 * @param {*} pokemons Pokemon data to be shown regarding the filtering input value.
	 * @param {*} isLoading Verifies if the API is still being called
	 * @returns the full grid-list according to the region selected
	 */
	const renderList = (pokemons, isLoading) => {
		if (isLoading) {
			return <img className={styles['list-loading']} src={Spinner} alt='' />;
		}
		return createPokemonList(pokemons);
	};

	/**
	 * Filter the grid list according to the input value, and render a list with them
	 * @param {*} suggestions Pokemon data to be shown regarding the filtering input value.
	 * @param {*} isValid Verifies if the pokemon searched exists
	 * @returns a grid list with filtered pokemons
	 */
	const filterList = (suggestions, isValid) => {
		if (!isValid) {
			return <p className={styles['list-notfound']}>No such Pokémon name.</p>;
		}
		return createPokemonList(suggestions);
	};

	/**
	 * Creates div with Pokémon inside a grid
	 * @param {*} pokemons Pokémon items to be shown in each div
	 * @returns A grid with all pokémons received by the filter/API call
	 */
	const createPokemonList = (pokemons) => (
		<div className={styles['list-grid']}>
			{pokemons.map((pokemon, i) => (
				<div className={styles['list-pokemon']} key={i}>
					<p
						className={styles['pokemon-name']}
						onClick={() => {
							props.onShowPokemonModal(pokemon);
						}}
					>
						{pokemon.name}
					</p>
					<div className={styles['pokemon-before']}>
						<img
							className={styles['pokemon-img']}
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
								pokemon.url.match(/\d+/g)[1]
							}.png`}
							alt='Pokemon'
							onClick={() => {
								props.onShowPokemonModal(pokemon);
							}}
						/>
					</div>
				</div>
			))}
		</div>
	);

	/**
	 * Switch function to select a Pokémon region
	 * @param {*} event Dropdown value with user-selectable Pokémon regions.
	 */
	const handleListRange = (event) => {
		switch (event.target.value) {
			case 'Kanto':
				setPokemonOffset(0);
				setPokemonLimit(151);
				break;
			case 'Johto':
				setPokemonOffset(151);
				setPokemonLimit(100);
				break;
			case 'Hoenn':
				setPokemonOffset(251);
				setPokemonLimit(135);
				break;
			case 'Sinnoh':
				setPokemonOffset(386);
				setPokemonLimit(107);
				break;
			case 'Unova':
				setPokemonOffset(493);
				setPokemonLimit(156);
				break;
			case 'Kalos':
				setPokemonOffset(649);
				setPokemonLimit(72);
				break;
			case 'Alola':
				setPokemonOffset(721);
				setPokemonLimit(88);
				break;
			case 'Galar':
				setPokemonOffset(809);
				setPokemonLimit(89);
				break;
			default:
				break;
		}
	};

	/**
	 * Filters an array of Pokémon according to the searched name, getting all matched pokemon names.
	 * @param {*} text Searched text
	 */
	const onChangeHandler = (text) => {
		let matches = [];
		if (text.length > 0) {
			matches = pokemons.filter((pokemon) => {
				const regex = new RegExp(`${text}`, 'gi');
				return pokemon.name.match(regex);
			});
		}
		if (matches.length > 0) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
		setSuggestions(matches);
		setText(text);
	};

	return (
		<div className={styles.container}>
			<form>
				<div className={styles.dropdown}>
					<label htmlFor='regions'>Region:</label>
					<select name='regions' id='regions' onChange={handleListRange}>
						<option value='Kanto'>Kanto</option>
						<option value='Johto'>Johto</option>
						<option value='Hoenn'>Hoenn</option>
						<option value='Sinnoh'>Sinnoh</option>
						<option value='Unova'>Unova</option>
						<option value='Kalos'>Kalos</option>
						<option value='Alola'>Alola</option>
						<option value='Galar'>Galar</option>
					</select>
				</div>
				<input
					placeholder='Search...'
					onChange={(e) => onChangeHandler(e.target.value)}
					value={text}
				/>
			</form>
			{text && filterList(suggestions, isValid)}
			{!text && renderList(pokemons, isLoading)}
		</div>
	);
};

export default List;
