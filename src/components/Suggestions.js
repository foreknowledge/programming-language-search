export default class Suggestion {
  constructor($target, initialState, onSelect) {
    this.$target = $target;
    this.state = initialState;
    this.onSelect = onSelect;

    this.$el = document.createElement('div');
    this.$el.className = 'Suggestion';
    $target.appendChild(this.$el);

    this.render();
    this.addKeyEvent();
    this.addClickEvent();
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

  addKeyEvent() {
    addEventListener('keyup', (e) => {
      const { key } = e;
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();
        const { focusedIdx, items } = this.state;
        const nextIdx =
          key === 'ArrowUp'
            ? focusedIdx - 1 < 0
              ? items.length - 1
              : focusedIdx - 1
            : focusedIdx + 1 > items.length - 1
            ? 0
            : focusedIdx + 1;
        this.setState({
          ...this.state,
          focusedIdx: nextIdx,
        });
      } else if (key === 'Enter') {
        const { focusedIdx, items } = this.state;
        const selectedItem = items[focusedIdx];
        this.onSelect(selectedItem);
      }
    });
  }

  addClickEvent() {
    this.$el.addEventListener('click', (e) => {
      if (e.target.tagName !== 'LI') return;

      const index = parseInt(e.target.dataset.index);
      const selectedItem = this.state.items[index];
      this.setState({
        ...this.state,
        focusedIdx: 0,
      });
      this.onSelect(selectedItem);
    });
  }
}
