export default class Suggestion {
  constructor($target, initialState, onSelect) {
    this.$target = $target;
    this.state = initialState;

    this.$el = document.createElement('div');
    this.$el.className = 'Suggestion';
    $target.appendChild(this.$el);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (this.state.items.length === 0) {
      this.$el.style.display = 'none';
    } else {
      this.$el.style.display = 'block';
      this.$el.innerHTML = `
        <ul>
            ${this.state.items
              .map((item, i) => {
                const selected =
                  this.state.focusedIdx === i
                    ? 'Suggestion__item--selected'
                    : '';
                return `<li class="${selected}" data-index=${i}>${item}</li>`;
              })
              .join('')}
        </ul>
      `;
    }
  }
}
