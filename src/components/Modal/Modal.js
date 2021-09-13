import styles from './Modal.module.scss';
import ReactDOM from 'react-dom';

/**
 * Creates a backdrop with onClick to close Modal
 * @param {*} props from Modal component
 * @returns a div with onClick
 */
const Backdrop = (props) => {
	return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

/**
 * Creates a div to display props.children
 * @param {*} props from Modal component
 * @returns a div that receives "props.children"
 */
const ModalOverlay = (props) => {
	return <div className={styles.modal}>{props.children}</div>;
};

const portalId = document.getElementById('overlays');

/**
 * Renders Backdrop & ModalOverlay components
 * @param {*} props from SinglePokemon.js
 * @returns Backdrop & ModalOverlay components
 */
const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalId)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalId
			)}
		</>
	);
};

export default Modal;
