import React from 'react';
import './charList.scss';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />;
		case 'loading':
			return newItemLoading ? <Component /> : <Spinner />;
		case 'confirmed':
			return <Component />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error('Unexpected process state');
	}
};

const CharList = ({ onCharSelected }) => {
	const [charList, setCharList] = React.useState([]);
	const [newItemLoading, setNewItemLoading] = React.useState(false);
	const [offset, setOffset] = React.useState(291);
	const [charEnded, setCharEnded] = React.useState(false);

	const { getAllCharacters, process, setProcess } = useMarvelService();

	React.useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		setNewItemLoading(!initial);
		getAllCharacters(offset)
			.then(onCharListLoaded)
			.then(() => setProcess('confirmed'));
	};

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList((prev) => [...prev, ...newCharList]);
		setNewItemLoading(false);
		setOffset((prev) => prev + 9);
		setCharEnded(ended);
	};

	const itemsRefs = React.useRef([]);

	const focusOnItem = (id) => {
		itemsRefs.current.forEach((item) => item.classList.remove('char__item_selected'));
		itemsRefs.current[id].classList.add('char__item_selected');
		console.log(itemsRefs);
	};

	const renderItems = (arr) => {
		const items = arr.map((item, i) => {
			let imgStyle = { objectFit: 'cover' };

			if (
				item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			) {
				imgStyle.objectFit = 'unset';
			}

			return (
				<li
					key={item.id}
					tabIndex={0}
					ref={(el) => (itemsRefs.current[i] = el)}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							onCharSelected(item.id);
							focusOnItem(i);
						}
					}}
					onClick={() => {
						onCharSelected(item.id);
						focusOnItem(i);
					}}
					className="char__item">
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});

		return <ul className="char__grid">{items}</ul>;
	};

	const elements = React.useMemo(() => {
		return setContent(process, () => renderItems(charList), newItemLoading);
	}, [process]);

	return (
		<div className="char__list">
			{elements}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{ display: charEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default CharList;
