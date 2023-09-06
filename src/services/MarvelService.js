import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=10d87c1c80be62f4ff27aa03d5f4c617';
	const _baseCharOffset = 291;
	const _baseComicOffset = 1000;

	const getAllCharacters = async (offset = _baseCharOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results[0] ? _transformCharacter(res.data.results[0]) : null;
	};

	const getCharacter = async (id, fullDescription) => {
		const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
		return _transformCharacter(res.data.results[0], fullDescription);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
		console.log('res', res);
		return _transformComic(res.data.results[0]);
	};

	const getAllComics = async (offset = _baseComicOffset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComic);
	};

	const _transformCharacter = (char, fullDescription = false) => {
		return {
			id: char.id,
			name: char.name,
			description: !char.description
				? 'There is no description for this character'
				: fullDescription
				? char.description
				: `${char.description.slice(0, 210)}...`,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	const _transformComic = (comic) => {
		return {
			id: comic.id,
			title: comic.title,
			description: comic.description || 'There is no description for this comic',
			pageCount: comic.pageCount
				? `${comic.pageCount} pages`
				: 'No information about the number of pages',
			thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
			language: comic.textObjects.language || 'en-us',
			price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'Not available',
		};
	};

	return {
		loading,
		error,
		getAllCharacters,
		getCharacter,
		getCharacterByName,
		clearError,
		getComic,
		getAllComics,
	};
};

export default useMarvelService;
