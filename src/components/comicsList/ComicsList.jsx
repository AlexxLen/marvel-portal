import React from 'react';
import './comicsList.scss';
import uw from '../../assets/img/UW.png';
import xMen from '../../assets/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

const ComicsList = () => {
	const [comicsList, setComicsList] = React.useState([]);
	const [newItemLoading, setNewItemLoading] = React.useState(false);
	const [offset, setOffset] = React.useState(500);
	const [ended, setEnded] = React.useState(0);

	const { loading, error, getAllComics } = useMarvelService();

	React.useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial = false) => {
		setNewItemLoading(!initial);
		getAllComics(offset).then(onComicsListLoaded);
	};

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}

		setComicsList((prev) => [...prev, ...newComicsList]);
		setNewItemLoading(false);
		setOffset((prev) => prev + 8);
		setEnded(ended);
	};

	const renderItems = (arr) => {
		const items = arr.map((comic, index) => {
			let imgStyle = { objectFit: 'cover' };

			if (
				comic.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			) {
				imgStyle.objectFit = 'unset';
			}

			return (
				<li key={index} className="comics__item">
					<Link to={`/comics/${comic.id}`}>
						<img
							style={imgStyle}
							src={comic.thumbnail}
							alt={comic.title}
							className="comics__item-img"
						/>
						<div className="comics__item-name">{comic.title}</div>
						<div className="comics__item-price">{comic.price}</div>
					</Link>
				</li>
			);
		});
		return <ul className="comics__grid">{items}</ul>;
	};

	const items = renderItems(comicsList);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="comics__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				className="button button__main button__long"
				style={{ display: ended ? 'none' : 'block' }}
				disabled={newItemLoading}
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
