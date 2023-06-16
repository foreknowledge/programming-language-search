import SearchInput from './SearchInput.js';
import SelectedLanguages from './SelectedLanguages.js';
import Suggestion from './Suggestions.js';

export default class App {
  state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  constructor($target) {
    this.$target = $target;

    this.selectedLanguages = new SelectedLanguages($target, {
      items: this.state.selectedLanguages,
    });
    this.searchInput = new SearchInput($target, { value: '' }, (value) => {});
    this.suggestion = new Suggestion(
      $target,
      { items: this.state.fetchedLanguages },
      (item) => {}
    );
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };

    this.suggestion.setState({ items: this.state.fetchedLanguages });
    this.selectedLanguages.setState({ items: this.state.selectedLanguages });
  }
}
