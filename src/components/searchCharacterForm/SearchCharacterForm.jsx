import React from 'react';
import './searchCharacterForm.scss';
import { ButtonToolbar } from 'react-bootstrap';
import useMarvelService from '../../services/MarvelService';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SearchCharacterForm = () => {
	const [char, setChar] = React.useState(null);
	const [charNotFound, setCharNotFound] = React.useState(false);
	const { loading, error, getCharacterByName, clearError } = useMarvelService();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		clearError();
		getCharacterByName(data.name).then(onCharLoaded);
	};

	const onCharLoaded = (char) => {
		if (char) {
			setCharNotFound(false);
			setChar(char);
		} else {
			setChar(null);
			setCharNotFound(true);
		}
	};

	const fetchError = charNotFound ? (
		<p className="error">The character was not found. Check the name and try again.</p>
	) : null;
	const contentChar =
		!loading && char ? (
			<>
				<p className="success">There is! Visit {char.name} page?</p>
				<Link to={`/characters/${char.id}`} className="button button__secondary">
					<div className="inner">To page</div>
				</Link>
			</>
		) : null;

	return (
		<div className="search-char">
			<h2 className="search-char__title">Or find a character by name</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="search-char__wrapper">
					<input
						{...register('name', { required: true })}
						className="search-char__input"
						type="name"
						placeholder="Enter name"
					/>
					<button className="button button__main">
						<div className="inner">Find</div>
					</button>
					{errors.name && <p className="error">This field is required!</p>}
				</div>
			</form>
			<div style={{ marginTop: 15 }} className="search-char__wrapper">
				{fetchError}
				{contentChar}
			</div>
		</div>
	);
};

export default SearchCharacterForm;
