import React from 'react';
import { Helmet } from 'react-helmet';
import './notFoundPage.scss';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<>
			<Helmet>
				<title>404 Not found</title>
			</Helmet>
			<div className="not-found">
				<ErrorMessage />
				<p className="not-found__message">404 Page Not Found </p>
				<Link className="not-found__link" to="/">
					Back
				</Link>
			</div>
		</>
	);
};

export default NotFoundPage;
