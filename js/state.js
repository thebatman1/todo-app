export const appState = {
  tiles: [],
};

export const tile = {
  title: '',
  todoItems: [],
  /**
   * @param {string} titleString The title of the TODO
   */
  set title(titleString) {
    this.title = titleString;
  },
  get title() {
    return this.title;
  },
  /**
   * @param {string} item The todo item of a particular list
   */
  addTodoItem: function(item) {
    this.todoItems.push(item);
  },
  get todoItems() {
    return this.todoItems;
  },
};
