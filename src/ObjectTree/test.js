// Import the mount function from the module
import { mount ,reactive} from "./object-visualizer.esm.min.js";
import {ast} from "./ast.js"
// with option
console.log(ast)
const el = document.getElementById("option");
const privateObject = ast;

const option = {
  rootName: "privateObject",
  expandOnCreatedAndUpdated(path) {
    if (path.length === 0) return true;
    return false;
  },
  getKeys(object, path) {
    return Object.keys(object).filter(
      (key) => key.startsWith("_private") === false
    );
  },
  //需要传入的函数, mouseEnter鼠标移入结点名的时候, mouseOut鼠标移出结点名的时候
  mouseEnter(data) {
    console.log(data)
  },
  mouseOut(data) {
    console.log(data)
  }
};

mount(privateObject, el, option);