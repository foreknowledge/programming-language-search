export default class SelectedLanguages {
  constructor($target, initialState) {
    this.$target = $target;
    this.state = initialState;

    this.$el = document.createElement('div');
    this.$el.className = 'SelectedLanguage';
    $target.appendChild(this.$el);

    this.render();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {
    this.$el.innerHTML = `
        <ul>
            ${this.state.items
              .map((item) => {
                return `<li>${item}</li>`;
              })
              .join('')}
        </ul>
    `;
  }
}
