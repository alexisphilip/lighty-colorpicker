/**
 * DropDrop
 *
 * Sets up a drag & drop stack of events on 2 elements:
 * - the drop zone (must be a canvas);
 * - the drag & drop element.
 */
class DragDrop {

    constructor(data) {
        this.canvas = document.querySelector(data.canvas); // The canvas element.
        this.canvasWidth = this.canvas.offsetWidth;
        this.canvasHeight = this.canvas.offsetHeight;
        this.pointer = document.querySelector(data.pointer); // The pointer element.
        this.pointerHalfWidth = Math.round(this.pointer.offsetWidth / 2);
        this.pointerHalfHeight = Math.round(this.pointer.offsetHeight / 2);
        this.pointerX = data.pointerX; // The pointers X position.
        this.pointerY = data.pointerY; // The pointers Y position.

        this.addEvents();
        document.addEventListener("", (e) => {

        })
    }

    /**
     * Adds the events.
     */
    addEvents() {

        var isMouseDown = false;

        this.canvas.addEventListener("mousedown", (e) => {
            isMouseDown = true;
        });

        document.addEventListener("mouseup", (e) => {
            isMouseDown = false;
        });

        this.canvas.addEventListener("mousemove", (e) => {
            if (isMouseDown) {
                
            }
        });
    }

    /**
     * Removes the events.
     */
    removeEvents() {

    }
}