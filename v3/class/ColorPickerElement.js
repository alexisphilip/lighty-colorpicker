/**
 * ColorPickerElement
 */
class ColorPickerElement {
    classType;
    type;
    width;
    height;
    element;
    elementCanvas;
    elementPointer;
    colorTopLeft;

    init(data) {
        if (data === false) {
            throw this.classType + ": no data given.";
        }

        this.type = data.type ? data.type : "classic";

        if (data.selector) {
            this.element = document.querySelector(data.selector);
            if (this.element !== undefined) {
                this.elementCanvas = document.createElement("canvas");
                this.elementPointer = document.createElement("div");
                this.elementCanvas.setAttribute("id", this.element.id + "Canvas");
                this.elementPointer.setAttribute("id", this.element.id + "Pointer");
                this.element.appendChild(this.elementCanvas);
                this.element.appendChild(this.elementPointer);
            } else {
                throw this.classType + ".selector: specified DOM element not found.";
            }
        } else {
            throw this.classType + ".selector: value is not specified."
        }
    }
}