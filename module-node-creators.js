function nodePlainCreator(type, parent) {
    let newNode = document.createElement(type);
    parent.appendChild(newNode);
    return newNode;
}

function nodeTextCreator(type, parent, text) {
    let newNode = document.createElement(type);
    parent.appendChild(newNode);
    let textFill = document.createTextNode(text);
    newNode.appendChild(textFill);
    return newNode;
}

function nodeClassCreator(type, parent, classes) {
    let newNode = document.createElement(type);
    parent.appendChild(newNode);
    newNode.classList.add(classes);
    return newNode;
}

function nodeTextClassCreator(type, parent, text, classes) {
    let newNode = document.createElement(type);
    parent.appendChild(newNode);
    newNode.classList.add(classes);
    let textFill = document.createTextNode(text);
    newNode.appendChild(textFill);
    return newNode;
}

function nodeLinkClassTextCreator(parent, text, link, classes) {
    let newNode = document.createElement('a');
    parent.appendChild(newNode);
    newNode.href = link;
    let textFill = document.createTextNode(text);
    newNode.appendChild(textFill);
    if (classes !== '' && classes !== undefined) {
        newNode.classList.add(classes);
    }
    return newNode;
}

function nodeImgSrcAlt(parent, source, alternate) {
    let newNode = document.createElement('img');
    parent.appendChild(newNode);
    newNode.src = source;
    newNode.alt = alternate;
    return newNode;
}

export {nodePlainCreator, nodeTextCreator, nodeClassCreator, nodeTextClassCreator, nodeLinkClassTextCreator, nodeImgSrcAlt}