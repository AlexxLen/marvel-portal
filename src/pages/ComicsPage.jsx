import React from 'react';
import { Helmet } from 'react-helmet';

import AppBanner from '../components/appBanner/AppBanner';
import ComicsList from '../components/comicsList/ComicsList';

const ComicsPage = () => {
	return (
		<>
			<Helmet>
				<meta name="description" content="Page with list of our comics" />
				<title>Comics</title>
			</Helmet>
			<AppBanner />
			<ComicsList />
		</>
	);
};

export default ComicsPage;
