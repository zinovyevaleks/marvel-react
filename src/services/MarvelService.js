class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=40f8f96384ddc910523218361b21b5ad'

  getResource = async (url) => {
    let resource = await fetch(url);

    if (!resource.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await resource.json();
  }

  getAllCharacters = async () => {
    const result = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    return result.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(result.data.results[0]);
  }

  _transformCharacter = (character) => {
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
}

export default MarvelService;
