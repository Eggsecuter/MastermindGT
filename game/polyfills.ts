interface Array<T> {
    remove(item: T);
}

Array.prototype.remove = function (item) {
    this.splice(this.indexOf(item), 1);
};

// const app = Node.prototype.appendChild;

// (Node.prototype as any).appendChild = function (newNode: Node): void {
//     console.log("append", newNode);

//     newNode.setAttribute("xxxtentacion", "");

//     app.bind(this)(newNode);
// }