import React from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import { Link } from 'react-router-dom';

const CharInfo = ({ charId }) => {
	const [char, setChar] = React.useState(null);
	const { loading, error, getCharacter, clearError } = useMarvelService();

	React.useEffect(() => {
		updateChar();
	}, [charId]);

	const updateChar = () => {
		if (!charId) {
			return;
		}

		clearError();

		getCharacter(charId).then(onCharLoaded);
	};

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;

	let imgStyle = { objectFit: 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle.objectFit = 'unset';
	}

	return (
		<>
			<div className="char__basics">
				<img style={imgStyle} src={thumbnail} alt={name} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 || 'There is no comics with this character'}
				{comics.map((item, i) =>
					i < 10 ? (
						<li key={i} className="char__comics-item">
							<Link to={item.id}>{item.name}</Link>
						</li>
					) : null,
				)}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	charId: PropTypes.number,
};

export default CharInfo;