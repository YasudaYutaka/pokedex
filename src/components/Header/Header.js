import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../assets/img/PokeDex_logo.png';

/**
 * Header with PokéDex logo
 * @returns {<div><img></div>}
 */
const Header = () => {
	return (
		<header className={styles['header']}>
			<img className={styles['header-logo']} src={Logo} alt='PokéDex Logo' />
		</header>
	);
};

export default Header;
