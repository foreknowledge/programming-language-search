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
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  renderMatchedItem = (keyword, item) => {
    const matchedText = item.match(new RegExp(keyword, 'gi'))[0];

    if (!matchedText) {
      return item;
    }

    return item.replace(
      new RegExp(matchedText, 'gi'),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );
  };

  render() {
    const { items, focusedIdx, keyword } = this.state;
    if (items.length === 0) {
      this.$el.style.display = 'none';
    } else {
      this.$el.style.display = 'block';
      this.$el.innerHTML = `
        <ul>
            ${items
              .map((item, i) => {
                const selected =
                  focusedIdx === i ? 'Suggestion__item--selected' : '';
                return `<li class="${selected}" data-index=${i}>
                    ${this.renderMatchedItem(keyword, item)}
                </li>`;
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
        this.setState({ focusedIdx: nextIdx });
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
      this.setState({ focusedIdx: 0 });
      this.onSelect(selectedItem);
    });
  }
}
