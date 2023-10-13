import React from 'react';
import { Helmet } from 'react-helmet';

import decoration from '../assets/img/vision.png';

import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import SearchCharacterForm from '../components/searchCharacterForm/SearchCharacterForm';

const MainPage = () => {
	const [selectedChar, setSelectedChar] = React.useState(null);

	const onCharSelected = (id) => {
		setSelectedChar(id);
	};
	return (
		<>
			<Helmet>
				<meta name="description" content="Page with list of our characters" />
				<title>Characters</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>

				<div className="char__content-right">
					<ErrorBoundary>
						<CharInfo charId={selectedChar} />
					</ErrorBoundary>
					<ErrorBoundary>
						<SearchCharacterForm />
					</ErrorBoundary>
				</div>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	);
};

export default MainPage;
