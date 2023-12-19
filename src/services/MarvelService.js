import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=40f8f96384ddc910523218361b21b5ad';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const result = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(result.data.results[0]);
  }

  const _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension ,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items
    }
  }

  return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService;
