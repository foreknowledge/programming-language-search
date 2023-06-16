import api from '../api.js';
import { KEY_APP_STATES, loadData, saveData } from '../storage.js';
import { debounce } from '../utils.js';
import SearchInput from './SearchInput.js';
import SelectedLanguages from './SelectedLanguages.js';
import Suggestion from './Suggestions.js';

export default class App {
  state = {
    keyword: '',
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  searchKeyword = debounce(async (keyword) => {
    if (keyword === '') {
      this.setState({ keyword, fetchedLanguages: [] });
      return;
    }

    const langs = await api.searchKeyword(keyword);
    this.setState({ keyword, fetchedLanguages: langs });
  }, 300);

  constructor($target) {
    this.$target = $target;

    this.state = loadData(KEY_APP_STATES, this.state);

    const { keyword, fetchedLanguages, selectedLanguages } = this.state;
    this.selectedLanguages = new SelectedLanguages($target, {
      items: selectedLanguages,
    });
    this.searchInput = new SearchInput($target, { value: keyword }, (value) =>
      this.searchKeyword(value)
    );
    this.suggestion = new Suggestion(
      $target,
      { items: fetchedLanguages, focusedIdx: 0, keyword },
      (item) => {
        if (!item) {
          alert('언어를 선택해주세요.');
          return;
        }

        alert(item);
        const nextSelectedLanguages = selectedLanguages.filter(
          (lang) => lang !== item
        );
        nextSelectedLanguages.push(item);

        this.setState({ selectedLanguages: nextSelectedLanguages });
      }
    );
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };

    this.suggestion.setState({
      items: this.state.fetchedLanguages,
      keyword: this.state.keyword,
    });
    this.selectedLanguages.setState({ items: this.state.selectedLanguages });

    saveData(KEY_APP_STATES, this.state);
  }
}
