/**
 * DragDrop
 *
 * Sets up a drag & drop stack of events on 2 elements:
 * - the drop zone (must be a canvas);
 * - the drag & drop element.
 */
class DragDrop {
    static isInstantiated = false;
    static isMouseDown = false;
    /**
     * The drag and drop DOM element, parent of the 'canvas' and pointer.
     * @var {HTMLElement}
     */
    dragDropZone;
    /**
     * The pointer DOM element.
     * @var {HTMLElement}
     */
    dragDropPointer;
    /**
     * The pointer DOM element's offset (if element is 15px, offset is 7px).
     * @var {number}
     */
    dragDropPointerOffset;

    /**
     * Sets data and a listener per Palette/Slider instance.
     *
     * @param {HTMLElement} dragDropZone- The drag and drop DOM element, parent of the 'canvas' and pointer.
     * @param {HTMLElement} dragDropPointer - The pointer DOM element.
     */
    constructor(dragDropZone, dragDropPointer) {
        this.dragDropZone = dragDropZone;
        this.dragDropPointer = dragDropPointer;
        this.dragDropPointerOffset = Math.floor(dragDropPointer.offsetWidth / 2);

        // this.init();
        window.addEventListener("mousemove", (e) => {
            if (DragDrop.isMouseDown) {
                this.movePointer(e);
            }
        });
        window.addEventListener("mouseup", (e) => {
            if (DragDrop.isMouseDown) {
                DragDrop.isMouseDown = false;
            }
        });

        this.dragDropZone.addEventListener("mousedown", (e) => {
            DragDrop.isMouseDown = true;
            this.movePointer(e);
        });
    }

    /**
     * Initializes the drag and drop global listeners.
     * This function is called at each ColorPicker instance, but its
     * listeners are only instantiated once (to prevent duplicates).
     */
    init() {
        // if (!DragDrop.isInstantiated) {
        //     DragDrop.isInstantiated = true;
        //     window.addEventListener("mousemove", (e) => {
        //         if (DragDrop.isMouseDown) {
        //             this.movePointer(e);
        //         }
        //     });
        //     window.addEventListener("mouseup", (e) => {
        //         if (DragDrop.isMouseDown) {
        //             DragDrop.isMouseDown = false;
        //         }
        //     });
        // }
    }

    /**
     * Moves the pointer on the canvas.
     *
     * @param {Event} e
     */
    movePointer(e) {
        let dragDropInnerWidth = this.dragDropZone.clientWidth,
            dragDropInnerHeight = this.dragDropZone.clientHeight,
            dragDropDistances = this.dragDropZone.getBoundingClientRect(),
            visualX = Math.max(0, Math.min(e.pageX - dragDropDistances.left, dragDropInnerWidth - 1)),
            visualY = Math.max(0, Math.min(e.pageY - dragDropDistances.top, dragDropInnerHeight - 1));

        this.dragDropPointer.style.top = visualY - this.dragDropPointerOffset + "px";
        this.dragDropPointer.style.left = visualX - this.dragDropPointerOffset + "px";
    }
}