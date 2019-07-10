
const saveContents = () => {
  localStorage.setItem('jsonString', getContents('container'));
};

/**
 * A function that iterates over all the elements of container
 * and returns a json string of the values of all the elements
 * @param {string} elementId The id of the container to be searched
 * @return {string} A JSON string of the values of the elements
 */
const getContents = (elementId) => {
  const root = document.getElementById(elementId);
  let jsonString = `{ 'tiles': [`;
  const tiles = root.getElementsByClassName('tile');
  if (tiles.length === 0) {
    jsonString += `]}`;
    return jsonString;
  }
  for (element of tiles) {
    jsonString += `{
                           'title': '${element.childNodes[0].data}',
                           'todos': [`;
    const todoItems = element.getElementsByClassName('todo-item');
    if (todoItems.length === 0) {
      jsonString += `]},`;
      continue;
    }
    for (child of todoItems) {
      if (child.value) {
        jsonString += `'${child.value}', `;
      } else {
        jsonString += `'-1', `;
      }
    }
    if (jsonString[jsonString.length - 2] === ',') {
      jsonString = `${jsonString.substring(0, jsonString.length - 2)}]},`;
    } else {
      jsonString += `]},`;
    }
  }
  if (jsonString[jsonString.length - 1] === ',') {
    jsonString = `${jsonString.substring(0, jsonString.length - 1)}]}`;
  } else {
    jsonString += `]}`;
  }
  return jsonString;
};


/**
 * A function to load the data and recreate the views
 * @param {JSON} jsonObj The json object stored in local
 * storage for the last session
 */
const loadViews = (jsonObj) => {
  const root = document.getElementById('container');
  const tiles = jsonObj.tiles || [];

  tiles.forEach((element = {}) => {
    const todos = element.todos || [];
    const view = createView('DIV', false, {
      'title': element.title || '',
    });
    root.appendChild(view);
    todos.forEach((todo) => {
      const todoItem = createView('P', false, {
        'todo-item': todo,
      });
      view.insertBefore(todoItem, view.lastChild);
    });
  });
};

const loadContents = () => {
  const jsonString = localStorage.getItem('jsonString');
  if (jsonString) {
    console.log(jsonString);
    loadViews(JSON.parse(jsonString));
  }
};
