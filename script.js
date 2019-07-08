console.log("Hello there!");


// const createView = (type, firstTime=false) => { 
//     switch (type) { 
//         case "DIV":
//             if (firstTime) { 

//             }

//     }
// }

/**
 * A function to append a View to a <div> or a <p> node
 * @param {Node} node The type of node to attach the new view to
 * @param {string} type The type of HTML element that you want to append
 */
const appendView = (node, type) => {
    const view = document.createElement(type);
    if (type === "P") {
        view.innerHTML = `<input type="text" class="todo-item" style="font-size:12px;width:100%">`;
        node.insertBefore(view, node.lastChild);
    } else if (type === "DIV") {
        // Create a new tile and append
        const createdOnString = `Created on ${(new Date()).toString().split(" ").slice(0, 5).join(" ")}`;
        const textView = document.createTextNode(createdOnString);
        view.setAttribute("class", "tile");
        view.appendChild(textView);
        appendView(view, "IMG");
        appendView(view, "P");
        node.insertBefore(view, node.firstChild);
    } else { 
        const p = document.createElement("p");
        p.setAttribute("style", "text-align:center");
        view.setAttribute("src", "images/icons8-plus-40.png");
        view.addEventListener("click", () => {
            appendView(node, "P");
        })
        p.appendChild(view);
        node.appendChild(p);
    }
}

const onClick = (elementId) => {
    const node = document.getElementById(elementId);
    if (elementId === "container") {
        appendView(node, "DIV");
    } else {
        appendView(node, "P");
    }
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
    for (element of root.getElementsByClassName("tile")) { 
        jsonString += `{
                           "title": "${element.childNodes[0].data}",
                           "todos": [`;
        for (child of element.getElementsByClassName("todo-item")) {
            if (child.value) {
                jsonString += `"${child.value}", `;
            }
        }
        jsonString = `${jsonString.substring(0, jsonString.length - 2)}]},`
    }
    if (jsonString[jsonString.length - 1] === ",") {
        jsonString = `${jsonString.substring(0, jsonString.length - 1)}]}`;
    } else { 
        jsonString += `]}`;
    }
    return jsonString;
}

const saveContents = () => { 
    localStorage.setItem("greetings", "Hello world!");
    localStorage.setItem("name", "Mrinmay");
    localStorage.setItem("jsonString", getContents("container"));
}

const loadContents = () => {
    if ("greetings" in localStorage) {
        console.log(localStorage.getItem("greetings"));
    }
    if ("name" in localStorage) {
        console.log(localStorage.getItem("name"));
    }
    if ("username" in localStorage) {
        console.log(localStorage.getItem("username"));
    }
    if ("jsonString" in localStorage) {
        console.log(JSON.parse(localStorage.getItem("jsonString")));
        loadViews(JSON.parse(localStorage.getItem("jsonString")));
    } else {
        console.log("New user!")
    }
}

/**
 * A function to load the data and recreate the views 
 * @param {JSON} jsonObj The json object stored in local storage for the last session 
 */
const loadViews = (jsonObj) => {
    const root = document.getElementById("container");
    const tiles = jsonObj.tiles;
    for (element of tiles) { 
        addView(root, "DIV");
    }
}


window.onbeforeunload = saveContents;
window.onload = loadContents;