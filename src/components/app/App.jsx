import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../header/Header';

import { Suspense } from 'react';
import Spinner from '../Spinner/Spinner';
import { Navigate } from 'react-router-dom';

const NotFoundPage = React.lazy(() => import('../../pages/notFoundPage/NotFoundPage'));
const MainPage = React.lazy(() => import('../../pages/MainPage'));
const ComicsPage = React.lazy(() => import('../../pages/ComicsPage'));
const SingleComic = React.lazy(() => import('../../pages/singleComic/SingleComic'));
const SingleCharPage = React.lazy(() => import('../../pages/singleCharPage/SingleCharPage'));

// 714, 736    716, 752

const App = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<Router>
				<div className="app">
					<Header />
					<main>
						<Routes>
							<Route path="/" element={<Navigate to="/characters" />} />
							<Route path="/characters" element={<MainPage />} />
							<Route path="/comics" element={<ComicsPage />} />
							<Route path="/comics/:id" element={<SingleComic />} />
							<Route path="/characters/:id" element={<SingleCharPage />} />
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</main>
				</div>
			</Router>
		</Suspense>
	);
};

export default App;
