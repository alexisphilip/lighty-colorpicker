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
        // this.canvasWidth = this.canvas.clientWidth;
        // this.canvasHeight = this.canvas.clientHeight;
        this.pointer = document.querySelector(data.pointer); // The pointer element.
        this.pointerHalfWidth = Math.round(this.pointer.offsetWidth / 2);
        this.pointerHalfHeight = Math.round(this.pointer.offsetHeight / 2);
        // this.pointerX = data.pointerX; // The pointers X position.
        // this.pointerY = data.pointerY; // The pointers Y position.

        this.addEvents();
        document.addEventListener("", (e) => {

        })
    }

    /**
     * Adds the events.
     */
    addEvents() {

        var isMouseDown = false,
            mouseX,
            mouseY;

        // Places cursor on the canvas.
        this.pointer.style.top = 0 - this.pointerHalfWidth + "px";
        this.pointer.style.right = 0 - this.pointerHalfHeight + "px";

        this.canvas.addEventListener("mousedown", (e) => {
            isMouseDown = true;

            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener("mouseup", (e) => {
            isMouseDown = false;
        });

        document.addEventListener("mousemove", (e) => {
            // console.log(e.layerY, e.layerX);
            if (isMouseDown) {

                var diffX = e.clientX - mouseX,
                    diffY = e.clientY - mouseY;

                var moveX;
                console.log(diffX, diffY);

                // this.pointer.style.top = e.layerY - this.pointerHalfHeight + "px";
                // this.pointer.style.left = e.layerX - this.pointerHalfWidth + "px";
            }
        });
    }

    /**
     * Removes the events.
     */
    removeEvents() {

    }
}