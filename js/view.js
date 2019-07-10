const View = class {
  /**
   * Construct a View object
   * @param {string} type The type of element to be made
   * @param {boolean} firstTime If the view is being loaded or created
   *                            for the first time
   * @param {JSON} jsonObj Additional properties for the element
   */
  constructor(type, firstTime = true, jsonObj = null) {
    this._type = type;
    this._firstTime = firstTime;
    this._properties = jsonObj;
    create();
  }

  /**
   * Method to create a new view according to the provided properties
   */
  create() {
    const view = document.createElement(this._type);
  }
};

const removeElement = (node) => {
  node.parentNode.removeChild(node);
};

const createView = (type, firstTime = false, jsonObj = null) => {
  const view = document.createElement(type);
  switch (type) {
    case 'DIV':
      let createdOnString = '';
      if (!firstTime) {
        createdOnString = jsonObj.title;
      } else {
        createdOnString =
          `Created on ${(
            new Date()).toString().split(' ').slice(0, 5).join(' ')
          }`;
      }
      const textView = document.createTextNode(createdOnString);
      view.setAttribute('class', 'tile');
      view.appendChild(textView);
      const img = createView('IMG', false, {
        'src': 'images/rubbish-bin.png',
        'imageType': 'rem',
      });
      img.style.visibility = 'hidden';
      view.appendChild(img);
      appendView(view, 'IMG');
      view.addEventListener('mouseover', () => {
        img.style.visibility = 'visible';
      });
      view.addEventListener('mouseout', () => {
        img.style.visibility = 'hidden';
      });
      return view;
    case 'P':
      let innerString = `<input type="text" class="todo-item" 
                                    onfocusout="saveContents()"
                                    style="font-size:12px;width:85%"`;
      if (!firstTime) {
        innerString +=
          ` value='${(jsonObj['todo-item'] === '-1') ?
            ' ' : jsonObj['todo-item']}'`;
      }
      innerString += `>`;
      view.innerHTML = innerString;
      const im = createView('IMG', true, {
        'src': 'images/clear.png',
        'imageType': 'rem',
      });
      im.style.visibility = 'hidden';
      view.appendChild(im);
      view.addEventListener('mouseover', () => {
        im.style.visibility = 'visible';
      });
      view.addEventListener('mouseout', () => {
        im.style.visibility = 'hidden';
      });
      return view;
    case 'IMG':
      view.setAttribute('src', jsonObj['src']);
      switch (jsonObj['imageType']) {
        case 'plus':
          view.addEventListener('click', () => {
            appendView(view.parentNode.parentNode, 'P');
            console.log('CLICKED HERE!');
          });
          break;
        case 'rem':
          view.setAttribute('style', 'margin-left:8px;vertical-align:sub');
          view.addEventListener('click', () => {
            removeElement(view.parentNode);
            console.log(view.parentNode);
            console.log('DELETE CLICKED!');
          });
          break;
      }
      saveContents();
      return view;
  }
};
