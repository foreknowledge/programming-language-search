export default class SearchInput {
  constructor($target, initialState, onChange) {
    this.$target = $target;
    this.state = initialState;

    this.$el = document.createElement('form');
    this.$el.className = 'SearchInput';
    $target.appendChild(this.$el);

    this.render();
  }

  render() {
    this.$el.innerHTML = `
        <input 
            class="SearchInput__input" 
            type="text" 
            value="${this.state.value}" 
            placeholder="프로그램 언어를 입력하세요." 
            autofocus
        >
    `;
  }
}
