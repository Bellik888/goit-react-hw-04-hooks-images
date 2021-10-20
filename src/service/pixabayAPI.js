import axios from 'axios';

export class PixabayAPI {
  constructor(BASE_URL, API_KEY) {
    this.BASE_URL = BASE_URL;
    this.API_KEY = API_KEY;
    this._searchQuery = '';
    this._page = 1;
    this.perPage = 12;
    this.urlWithKey = '';
  }

  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }
  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page += value);
  }
  resetPage() {
    return (this._page = 1);
  }

  async searchPhotos() {
    this.urlWithKey = this.BASE_URL + `?key=${this.API_KEY}`;
    let params = `&q=${this._searchQuery}&page=${this.page}&per_page=${this.perPage}`;
    let url = this.urlWithKey + params;

    try {
      const result = await axios.get(url);
      const data = result.data.hits;
      return data;
    } catch (err) {
      return console.log(err);
    }
  }
}
