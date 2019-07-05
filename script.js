console.log("Hello there!");


/**
 * A function to append a View to a <div> or a <p> node
 * @param {Node} node The node to attach the new view to
 * @param {string} type The type of HTML element that you want to append
 */
const appendView = (node, type) => {
    const view = document.createElement(type);
    if (type === "P") {
        view.innerHTML = `<input type="text" style="font-size:12px;width:100%">`;
        node.insertBefore(view, node.lastChild);
    } else if (type === "DIV") {
        // Create a new tile and append
        const createdOnString = `Created on ${(new Date()).toString().split(" ").slice(0, 5).join(" ")}`;
        const textView = document.createTextNode(createdOnString);
        view.setAttribute("id", "tile");
        appendView(view, "IMG");
        view.appendChild(textView);
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
