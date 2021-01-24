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
    static dragDropZone;
    /**
     * The pointer DOM element.
     * @var {HTMLElement}
     */
    static dragDropPointer;
    /**
     * The pointer DOM element's offset (if element is 15px, offset is 7px).
     * @var {number}
     */
    static dragDropPointerOffset;
    static classType;
    static orientation;

    /**
     * Initializes the drag and drop global listeners.
     * This function is called at each ColorPicker instance, but its
     * listeners are only instantiated once (to prevent duplicates).
     */
    static init() {
        window.addEventListener("mousedown", (e) => {
            let dragDropZone = e.target.closest(".cp-dragdrop");
            if (dragDropZone !== null) {
                DragDrop.isMouseDown = true;
                DragDrop.dragDropZone = dragDropZone;
                DragDrop.dragDropPointer = dragDropZone.querySelector(".cp-pointer");
                DragDrop.dragDropPointerOffsetX = Math.floor(DragDrop.dragDropPointer.offsetWidth / 2);
                DragDrop.dragDropPointerOffsetY = Math.floor(DragDrop.dragDropPointer.offsetHeight / 2);
                DragDrop.classType = dragDropZone.dataset.classtype;
                if (DragDrop.classType === "slider") {
                    DragDrop.orientation = dragDropZone.dataset.orientation;
                }
                DragDrop.movePointer(e);
            }
        });

        window.addEventListener("mousemove", (e) => {
            if (DragDrop.isMouseDown) {
                DragDrop.movePointer(e);
            }
        });
        window.addEventListener("mouseup", (e) => {
            if (DragDrop.isMouseDown) {
                DragDrop.isMouseDown = false;
            }
        });
    }

    /**
     * Moves the pointer on the canvas.
     *
     * @param {Event} e
     */
    static movePointer(e) {
        let dragDropInnerWidth = DragDrop.dragDropZone.clientWidth,
            dragDropInnerHeight = DragDrop.dragDropZone.clientHeight,
            dragDropDistances = DragDrop.dragDropZone.getBoundingClientRect(),
            visualX = Math.max(0, Math.min(e.pageX - dragDropDistances.left, dragDropInnerWidth - 1)),
            visualY = Math.max(0, Math.min(e.pageY - dragDropDistances.top, dragDropInnerHeight - 1));

        if (DragDrop.classType === "slider") {
            if (DragDrop.orientation === "vertical") {
                this.dragDropPointer.style.top = visualY - DragDrop.dragDropPointerOffsetY + "px";
            } else {
                this.dragDropPointer.style.left = visualX - DragDrop.dragDropPointerOffsetX + "px";
            }
        } else {
            this.dragDropPointer.style.left = visualX - DragDrop.dragDropPointerOffsetX + "px";
            this.dragDropPointer.style.top = visualY - DragDrop.dragDropPointerOffsetY + "px";
        }
    }
}