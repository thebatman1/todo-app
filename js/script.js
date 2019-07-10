import {appState, tile} from 'state';

console.log('Hello there!');


/**
 * A function to append a View to a <div> or a <p> node
 * @param {Node} node The type of node to attach the new view to
 * @param {string} type The type of HTML element that you want to append
 */
const appendView = (node, type) => {
  if (type === 'P') {
    const view = createView(type, true);
    node.insertBefore(view, node.lastChild);
  } else if (type === 'DIV') {
    // Create a new tile and append
    const view = createView(type, true);
    appendView(view, 'P');
    node.insertBefore(view, node.firstChild);
  } else {
    const view = createView(type, true, {
      'imageType': 'plus',
      'src': 'images/icons8-plus-40.png',
    });
    const p = document.createElement('p');
    p.setAttribute('style', 'text-align:center');
    p.appendChild(view);
    node.appendChild(p);
  }
};

// eslint-disable-next-line no-unused-vars
const onClick = () => {
  const node = document.getElementById('container');
  appendView(node, 'DIV');
  saveContents();
};


window.onbeforeunload = saveContents;
window.onload = loadContents;
