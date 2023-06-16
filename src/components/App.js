import api from '../api.js';
import { debounce } from '../utils.js';
import SearchInput from './SearchInput.js';
import SelectedLanguages from './SelectedLanguages.js';
import Suggestion from './Suggestions.js';

export default class App {
  state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  searchKeyword = debounce(async (keyword) => {
    const langs = await api.searchKeyword(keyword);
    this.setState({ fetchedLanguages: langs });
  }, 300);

  constructor($target) {
    this.$target = $target;

    this.selectedLanguages = new SelectedLanguages($target, {
      items: this.state.selectedLanguages,
    });
    this.searchInput = new SearchInput($target, { value: '' }, (value) =>
      this.searchKeyword(value)
    );
    this.suggestion = new Suggestion(
      $target,
      { items: this.state.fetchedLanguages, focusedIdx: 0 },
      (item) => {
        alert(item);

        const nextSelectedLanguages = this.state.selectedLanguages.filter(
          (lang) => lang !== item
        );
        nextSelectedLanguages.push(item);

        this.setState({ selectedLanguages: nextSelectedLanguages });
      }
    );
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };

    this.suggestion.setState({ items: this.state.fetchedLanguages });
    this.selectedLanguages.setState({ items: this.state.selectedLanguages });
  }
}
