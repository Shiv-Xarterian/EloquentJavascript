function talksAbout(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    //element type -> div span -> then check for childs
    for (let child of node.childNodes) {
      if (talksAbout(child, string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) {
    //text node -> <p> then
    return node.nodeValue.indexOf(string) > -1;
  }
}

console.log(talksAbout(document.body, "book"));
// start from the root -> body
// → true
