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

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
  }

  getAllCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  }
}

export default MarvelService;
