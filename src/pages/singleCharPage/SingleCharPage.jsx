import React from 'react';
import { Helmet } from 'react-helmet';
import './singleCharPage.scss';

import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';
import AppBunner from '../../components/appBanner/AppBanner';
import { Link } from 'react-router-dom';

const SingleCharPage = () => {
	const { id } = useParams();

	const [char, setChar] = React.useState(null);
	const { loading, error, getCharacter, clearError } = useMarvelService();

	React.useEffect(() => {
		console.log(id);
		updateChar();
	}, [id]);

	const updateChar = () => {
		clearError();
		getCharacter(id, true).then(onCharLoaded);
	};

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<>
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

const View = ({ char }) => {
	const { thumbnail, name, description } = char;
	return (
		<>
			<Helmet>
				<meta name="description" content={`Information about ${name}`} />
				<title>{name}</title>
			</Helmet>
			<AppBunner />
			<div className="single-char">
				<img src={thumbnail} alt={name} className="single-char__img" />
				<div className="single-char__info">
					<h2 className="single-char">{name}</h2>
					<p className="single-char">{description}</p>
				</div>
				<Link to="/" className="single-char__back">
					Back to all
				</Link>
			</div>
		</>
	);
};

export default SingleCharPage;
