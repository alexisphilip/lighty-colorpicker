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
    dragDrop;

    /**
     * Sets up a ColorPickerElement's (Palette or Slider) common attributes.
     *
     * @param data {object|boolean} data:
     * - {DOMString} canvas - DOM element selector string.
     * - {string} [type=classic] - "classic" or "hue".
     * - {int} [width=300] - palette's width in pixel.
     * - {int} [height=300] - palettes's height in pixel.
     * - {int} [widthResolution=2] - palette's width's resolution in pixel.
     * - {int} [heightResolution=2] - palette's width's resolution in pixel.
     * - {array[number]} [colorTopLeft=[255, 255, 255]] - top left color in RGB [R, G, B] format.
     * - {array[number]} [colorTopRight=[255, 0, 0]] - top right color in RGB [R, G, B] format.
     * - {array[number]} [colorBottomLeft=[0, 0, 0]] - bottom left color in RGB [R, G, B] format.
     * - {array[number]} [colorBottomRight=[0, 0, 0]] - bottom right color in RGB [R, G, B] format.
     * @param classType {string} The type of element ("Palette" or "Slider").
     */
    constructor(data, classType) {
        this.classType = classType;

        if (data === false) {
            throw this.classType + ": no data given.";
        }

        this.type = data.type ? data.type : "classic";
    }

    init(data) {

        // If a selector is given.
        if (data.selector) {
            this.element = document.querySelector(data.selector);
            // If the element exists.
            if (this.element !== undefined) {
                // Sets the parent's CSS.
                this.element.setAttribute("style",
                    "position: relative; width: " + this.width + "px; height: " + this.height + "px;");
                // Creates & appends the 'canvas' element.
                this.elementCanvas = document.createElement("canvas");
                this.elementCanvas.setAttribute("id", this.element.id + "Canvas");
                this.elementCanvas.setAttribute("class", "cp-canvas");
                this.element.appendChild(this.elementCanvas);
            } else {
                throw this.classType + ".selector: specified DOM element not found.";
            }
        } else {
            throw this.classType + ".selector: value is not specified.";
        }

        // If a custom pointer selector is given.
        if (data.selectorPointer) {
            this.elementPointer = document.querySelector(data.selectorPointer);
            // If the pointer's element exists.
            if (this.elementPointer !== undefined) {
                this.elementPointer.style.position = "absolute";
            } else {
                throw this.classType + ".selectorPointer: specified DOM pointer element not found.";
            }
        } // Default pointer element.
        else {
            // Creates the pointer element.
            this.elementPointer = document.createElement("div");
            this.elementPointer.setAttribute("id", this.element.id + "Pointer");
        }

        // Sets the pointer's HTML class.
        if (this.classType === "Palette") {
            this.elementPointer.classList.add("cp-pointer-palette");
        } else {
            this.elementPointer.classList.add("cp-pointer-slider-" + data.orientation);
            // Sets the pointer size.
            if (this.orientation === "vertical") {
                this.elementPointer.style.width = this.width + "px";
                this.elementPointer.style.height = "7px";
            } else {
                this.elementPointer.style.width = "7px";
                this.elementPointer.style.height = this.height + "px";
            }
        }

        // Moves or appends the pointer element after the 'canvas' element.
        this.element.appendChild(this.elementPointer);
    }

    addDragDrop() {
        this.dragDrop = new DragDrop(this.element, this.elementPointer);
        this.elementPointer.style.top = 0;
        this.elementPointer.style.left = 0;
    }

    remove() {
        // TODO: test if it works
        //  remove listeners from DragDrop class, and destroy object.
        // this.elementCanvas.removeEventListener("mousedown", DragDrop.handleMouseMoveDown);
        this.element.remove();
    }
}