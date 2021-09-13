import React, { useState, useEffect } from 'react';
import Types from '../../../assets';
import styles from './PokemonType.module.scss';

const PokemonType = ({ type }) => {
	const [pokemonTypeImg, setPokemonTypeImg] = useState('No Image');

	useEffect(() => {
		switch (type.type.name) {
			case 'bug':
				setPokemonTypeImg(Types.Bug);
				break;
			case 'dark':
				setPokemonTypeImg(Types.Dark);
				break;
			case 'dragon':
				setPokemonTypeImg(Types.Dragon);
				break;
			case 'electric':
				setPokemonTypeImg(Types.Electric);
				break;
			case 'fairy':
				setPokemonTypeImg(Types.Fairy);
				break;
			case 'fighting':
				setPokemonTypeImg(Types.Fighting);
				break;
			case 'fire':
				setPokemonTypeImg(Types.Fire);
				break;
			case 'flying':
				setPokemonTypeImg(Types.Flying);
				break;
			case 'ghost':
				setPokemonTypeImg(Types.Ghost);
				break;
			case 'grass':
				setPokemonTypeImg(Types.Grass);
				break;
			case 'ground':
				setPokemonTypeImg(Types.Ground);
				break;
			case 'ice':
				setPokemonTypeImg(Types.Ice);
				break;
			case 'normal':
				setPokemonTypeImg(Types.Normal);
				break;
			case 'poison':
				setPokemonTypeImg(Types.Poison);
				break;
			case 'psychic':
				setPokemonTypeImg(Types.Psychic);
				break;
			case 'rock':
				setPokemonTypeImg(Types.Rock);
				break;
			case 'steel':
				setPokemonTypeImg(Types.Steel);
				break;
			case 'water':
				setPokemonTypeImg(Types.Water);
				break;
			default:
				break;
		}
	}, []);

	return (
		<img
			src={pokemonTypeImg}
			className={styles['type-img']}
			alt='Pokémon Type'
		/>
	);
};

export default PokemonType;
