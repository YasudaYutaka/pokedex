import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import styles from './SinglePokemon.module.scss';
import axios from 'axios';
import PokemonType from './PokemonType/PokemonType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * Call the data and put it inside the modal, when clicked on Pokémon item.
 * @param {pokemonUrl} props
 * @returns {Pokémon modal}
 */
const SinglePokemon = (props) => {
	const pokemonUrl = props.pokemonUrl;
	const [pokemonObject, setPokemonObject] = useState({
		id: 0,
		name: 'Pokémon Name',
		types: [],
		weight: 0,
		spriteUrl: 'Página da Foto do Pokémon',
	});

	/**
	 * Call Data from the Pokémon to be shown at the modal.
	 * @object {Id, name, types, weight and image of the pokémon to be shown at the modal}.
	 */
	useEffect(() => {
		const fetchPokemonData = async () => {
			try {
				const response = await axios.get(pokemonUrl);
				const pokemonData = response.data;
				const pokemonTypes = pokemonData.types.map((type) => {
					return type;
				});
				setPokemonObject({
					id: pokemonData.id,
					name: pokemonData.name,
					types: pokemonTypes,
					weight: pokemonData.weight,
					spriteUrl:
						pokemonData.sprites.other['official-artwork']['front_default'],
				});
			} catch (error) {
				console.log('erro:');
				console.log(error);
			}
		};
		fetchPokemonData();
	}, []);

	/**
	 * @returns a flex div, with each type the pokémon shown at modal has
	 */
	const mapTypes = pokemonObject.types.map((type) => {
		return <PokemonType type={type} />;
	});

	return (
		<Modal onClose={props.onClose}>
			<div className={styles.pokemon}>
				<div className={styles['pokemon-id-close']}>
					<p className={styles['pokemon-id']}>&#35;{pokemonObject.id}</p>
					<button onClick={props.onClose} className={styles['pokemon-x-btn']}>
						<FontAwesomeIcon
							icon={faTimes}
							className={styles['pokemon-x-icon']}
						/>
					</button>
				</div>
				<img
					className={styles['pokemon-img']}
					src={pokemonObject.spriteUrl}
					alt='Pokemon'
				/>
				<p className={styles['pokemon-name']}>
					{pokemonObject.name[0].toUpperCase() +
						pokemonObject.name.substring(1)}{' '}
					{/* makes the first letter uppercase */}
				</p>
				<div className={styles['pokemon-types']}>{mapTypes}</div>
				<p className={styles['pokemon-weight']}>
					<span>
						Weight:&nbsp;
						{pokemonObject.weight / 10}
						<strong>Kg</strong>
					</span>
				</p>
			</div>
		</Modal>
	);
};

export default SinglePokemon;
