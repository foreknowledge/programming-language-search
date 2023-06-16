export default class SearchInput {
  constructor($target, initialState, onChange) {
    this.$target = $target;
    this.state = initialState;
    this.onChange = onChange;

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

    const $input = this.$el.querySelector('.SearchInput__input');
    $input.addEventListener('input', (e) => {
      this.onChange(e.target.value);
    });
  }
}
