console.log("Hello there!");
let appState = {};

const removeElement = (node) => {
    node.parentNode.removeChild(node);
}


const saveContents = () => {
    localStorage.setItem("jsonString", getContents("container"));
}




const createView = (type, firstTime = false, jsonObj = null) => {
    const view = document.createElement(type);
    switch (type) {
        case "DIV":
            let createdOnString = "";
            if (!firstTime) {
                createdOnString = jsonObj.title;
            } else {
                createdOnString = `Created on ${(new Date()).toString().split(" ").slice(0, 5).join(" ")}`;
            }
            const textView = document.createTextNode(createdOnString);
            view.setAttribute("class", "tile");
            view.appendChild(textView);
            view.appendChild(createView("IMG", false, {
                "src": "images/rubbish-bin.png",
                "imageType": "rem"
            }));
            appendView(view, "IMG");
            return view;
        case "P":
            if (firstTime) {
                view.innerHTML = `<input type="text" class="todo-item" 
                                    onfocusout="saveContents()"
                                    style="font-size:12px;width:85%">`;
            } else {
                view.innerHTML = `<input type="text" class="todo-item" 
                                    onfocusout="saveContents()"
                                    style="font-size:12px;width:85%"
                                    value="${(jsonObj["todo-item"] === "-1") ? " " : jsonObj["todo-item"]}">`;
            }
            console.log(view.innerHTML);
            console.log(view.innerHTML);
            view.appendChild(createView("IMG", true, {
                "src": "images/clear.png",
                "imageType": "rem"
            }));
            return view;
        case "IMG":
            view.setAttribute("src", jsonObj["src"]);
            switch (jsonObj["imageType"]) {
                case "plus":
                    view.addEventListener("click", () => {
                        appendView(view.parentNode, "P");
                        console.log("CLICKED HERE!");
                    });
                    break;
                case "rem":
                    view.setAttribute("style", "margin-left:8px;vertical-align:sub")
                    view.addEventListener("click", () => {
                        removeElement(view.parentNode)
                        console.log("DELETE CLICKED!")
                    });
                    break;

            }
            saveContents();
            return view;
    }
}


/**
 * A function to append a View to a <div> or a <p> node
 * @param {Node} node The type of node to attach the new view to
 * @param {string} type The type of HTML element that you want to append
 */
const appendView = (node, type) => {
    if (type === "P") {
        node.insertBefore(createView(type, true), node.lastChild);
    } else if (type === "DIV") {
        // Create a new tile and append
        const view = createView(type, true);
        appendView(view, "P");
        node.insertBefore(view, node.firstChild);
    } else {
        const view = createView(type, true, {
            "imageType": "plus",
            "src": "images/icons8-plus-40.png"
        });
        const p = document.createElement("p");
        p.setAttribute("style", "text-align:center");
        p.appendChild(view);
        node.appendChild(p);
    }
}

const onClick = () => {
    const node = document.getElementById('container');
    appendView(node, "DIV");
    saveContents();
}


/**
 * A function that iterates over all the elements of container and returns a json string
 * of the values of all the elements
 * @param {string} elementId The id of the container to be searched 
 * @returns {string} A JSON string of the values of the elements
 */
const getContents = (elementId) => {
    const root = document.getElementById(elementId);
    let jsonString = `{ "tiles": [`;
    const tiles = root.getElementsByClassName("tile");
    if (tiles.length === 0) {
        jsonString += `]}`;
        return jsonString;
    }
    for (element of tiles) {
        jsonString += `{
                           "title": "${element.childNodes[0].data}",
                           "todos": [`;
        const todoItems = element.getElementsByClassName("todo-item");
        if (todoItems.length === 0) {
            jsonString += `]},`;
            continue;
        }
        for (child of todoItems) {
            if (child.value) {
                jsonString += `"${child.value}", `;
            } else {
                jsonString += `"-1", `;
            }
        }
        if (jsonString[jsonString.length - 2] === ",") {
            jsonString = `${jsonString.substring(0, jsonString.length - 2)}]},`
        } else {
            jsonString += `]},`;
        }
    }
    if (jsonString[jsonString.length - 1] === ",") {
        jsonString = `${jsonString.substring(0, jsonString.length - 1)}]}`;
    } else {
        jsonString += `]}`;
    }
    return jsonString;
}


/**
 * A function to load the data and recreate the views 
 * @param {JSON} jsonObj The json object stored in local storage for the last session 
 */
const loadViews = (jsonObj) => {
    const root = document.getElementById("container");
    const tiles = jsonObj.tiles || [];

    tiles.forEach((element = {}) => {
        const todos = element.todos || [];
        const view = createView("DIV", false, { "title": element.title || '' });
        root.appendChild(view);
        todos.forEach(todo => {
            const todoItem = createView("P", false, { "todo-item": todo });
            view.insertBefore(todoItem, view.lastChild);
        })
    });

    // for (element of tiles) {
    //     if (element.todos.length === 0) {
    //         continue;
    //     }
    //     const view = createView("DIV", false, { "title": element.title });
    //     root.appendChild(view);
    //     for (todo of element.todos) {
    //         const todoItem = createView("P", false, { "todo-item": todo });
    //         view.insertBefore(todoItem, view.lastChild);
    //     }
    // }
}

const loadContents = () => {
    const jsonString = localStorage.getItem('jsonString');
    if (jsonString) {
        console.log(jsonString);
        loadViews(JSON.parse(jsonString));
    }
}

window.onbeforeunload = saveContents;
window.onload = loadContents;