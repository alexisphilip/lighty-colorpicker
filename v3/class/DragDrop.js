/**
 * DragDrop
 *
 * Sets up a drag & drop stack of events on 2 elements:
 * - the drop zone (must be a canvas);
 * - the drag & drop element.
 */
class DragDrop {
    /**
     * The drag and drop HTML element, parent of the '<canvas>' and pointer.
     * @var {HTMLElement}
     */
    static dragDropZone;
    /**
     * The canvas HTML Element.
     * TODO: remove?
     * @var {HTMLElement}
     */
    canvas;
    /**
     * The drag and drop pointer HTML element.
     * @var {HTMLElement}
     */
    static dragDropPointer;
    /**
     * The drag and drop pointer HTML element's X offset (if element's width is 15px, width offset is 7px).
     * @var {number}
     */
    static dragDropPointerOffsetX;
    /**
     * The drag and drop pointer HTML element's Y offset (if element's height is 15px, height offset is 7px).
     * @var {number}
     */
    static dragDropPointerOffsetY;
    /**
     * If mouse is currently down.
     * @var {boolean}
     * @default false
     */
    static #isMouseDown = false;
    // TODO: remove? give in parameters instead?
    static classType;
    // TODO: remove? give in parameters instead?
    static orientation;

    /**
     * Initializes the drag and drop global listeners.
     * They are instanciated only once.
     */
    static init() {
        window.addEventListener("mousedown", (e) => {
            this.dragDropZone = e.target.closest(".cp-element");
            if (this.dragDropZone) {
                this.#isMouseDown = true;
                this.dragDropPointer = this.dragDropZone.querySelector(".cp-pointer");
                // TODO: floor or round?
                this.dragDropPointerOffsetX = Math.floor(this.dragDropPointer.offsetWidth / 2);
                this.dragDropPointerOffsetY = Math.floor(this.dragDropPointer.offsetHeight / 2);

                this.classType = this.dragDropZone.dataset.classtype;

                if (this.classType === "slider") {
                    this.orientation = this.dragDropZone.dataset.orientation;
                }

                // Moves pointer where the mouse is down.
                this.#movePointer(e);
            }
        });

        window.addEventListener("mousemove", (e) => {
            if (this.#isMouseDown) {
                // If mouse down and moving, move pointer.
                this.#movePointer(e);
            }
        });

        window.addEventListener("mouseup", (e) => {
            if (this.#isMouseDown) {
                this.#isMouseDown = false;
            }
        });
    }

    /**
     * Moves the pointer on the canvas.
     * @param {Event} e
     */
    static #movePointer(e) {
        let dragDropInnerWidth = this.dragDropZone.clientWidth,
            dragDropInnerHeight = this.dragDropZone.clientHeight,
            dragDropDistances = this.dragDropZone.getBoundingClientRect(),
            visualX = Math.max(0, Math.min(e.pageX - dragDropDistances.left, dragDropInnerWidth - 1)),
            visualY = Math.max(0, Math.min(e.pageY - dragDropDistances.top, dragDropInnerHeight - 1));

        // If it's a slider.
        if (this.classType === "slider") {
            // If slider's orientation is vertical, only move on Y freely.
            if (this.orientation === "vertical") {
                this.dragDropPointer.style.top = visualY - this.dragDropPointerOffsetY + "px";
            } // If slider's orientation is horizontal, only move on X freely.
            else {
                this.dragDropPointer.style.left = visualX - this.dragDropPointerOffsetX + "px";
            }
        } // If it's a palette, move on X and Y freely.
        else {
            this.dragDropPointer.style.left = visualX - this.dragDropPointerOffsetX + "px";
            this.dragDropPointer.style.top = visualY - this.dragDropPointerOffsetY + "px";
        }
    }
}