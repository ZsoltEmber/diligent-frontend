/**
 * @param {string} tag - the tag of the html element
 * @param {object} attributes - a key-value pair, representing html attributes for expl. {id:'idOfElement'}
 * @param {Array} attributes - an array of nodes (html elements) to append to the element as children
 * @param {object} listenerObj - a key value pair, the key is the event name, value is the function to add as eventListener {'click':()=>{console.log('')}}

 */
export class Component {
  constructor(tag = "div", attributes = {}, children = [], listenerObj) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.listener = listenerObj; // {'click': ()=>{}}
    this.node = this.render(); // Only for developing reasons
  }

  render() {
    const node = document.createElement(this.tag);
    Object.keys(this.attributes).forEach((attrKey) =>
      node.setAttribute(attrKey, this.attributes[attrKey])
    );
    if (this.children && this.children.length) {
      this.children.forEach((child) => node.append(child));
    }

    if (this.listener) {
      Object.keys(this.listener).forEach((eventName) =>
        node.addEventListener(eventName, this.listener[eventName])
      );
    }

    return node;
  }

}

