/**
 * -------------------------------------------
 *             JQ (JakeQuery)
 * -------------------------------------------
 * 
 * Jacob's lil jQuery lite
 * 
 * Only what I need and only what I use.
 * This will grow overtime.
 */

 /**
  * Takes a query string and returns a JElem object
  * @param query - the document query selector (CSS format)
  */
const JQ = function (query){
    return new JElem(document.querySelector(query || document));
};

/**
 * Simple wrapper class that holds a dom element
 * and gives us helpful methods for interacting with 
 * it.
 * @param {*} elem 
 */
const JElem = function(elem){
    this.elem = elem;
}

/**
 * Calls the callback function when all DOM
 * content has been loaded :)
 * @param callback
 */
JQ.domReady = (callback) => {
    document.addEventListener("DOMContentLoaded", callback);
};

/**
 * simple AJAX GET wrapper
 *(This still needs to be tested)
 * @param url - URL to GET
 * @param err - error callback
 * @param success - success callback
 */
JQ.get = (url, err, success) => {
    console.log("Sending GET request to: "+ url);

    var req = new XMLHttpRequest();
    req.addEventListener("error", err);
    req.addEventListener("load", success);
    
    req.addEventListener("progress", (evt) => {
        if(evt.lengthComputable){
            var percent = evt.loaded / evt.total;
            console.log(`XHTTP progress update: ${percent}% loaded`);
        }
    });

    req.open("GET", url);
};

/**
 * Attaches a click event if a callback is recieved
 * if there is no callback, fire the click event on our
 * selected element.
 * @param callback - click event handler
 */
JElem.prototype.click = function(callback){
    if(typeof callback == "undefined" || callback == null)
        this.elem.click();
    else
        this.elem.addEventListener("click", callback);
};

/**
 * Gets or sets the value in the selected
 * element, depending on where the parameter
 * is passed or not.
 * @param value
 */
JElem.prototype.val = function (value) {
    if(typeof value == "undefined" || value == false){
        return this.elem.value;
    }else{
        return this.elem.value = value;
    }
};

/**
 * Appends a DOM node to the end of the selected element.
 * @param nodeType - the DOM node type to append
 * @param test - the text to add inside the new node
 */
JElem.prototype.appendNode = function (nodeType, text) {
    let node = document.createElement(nodeType || "span");
    let textNode = document.createTextNode(text);
    node.appendChild(textNode);
    if(typeof this.elem == "undefined" || this.elem ==  null){
        console.error("No element selected man...");
        return -1;
    }else{
        this.elem.appendChild(node);
    }
}