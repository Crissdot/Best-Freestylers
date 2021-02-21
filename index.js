class DOMHelper {
    static move(el, coords) {
        el.style.top = coords.y - el.clientHeight + 'px';
        el.style.left = coords.x - (el.clientWidth / 2) + 'px';
    }

    static whereIs(el, pointerCoords) {
        let elCoords = el.getBoundingClientRect();

        if(pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)) {
            if(pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)) {
                if(pointerCoords.y < elCoords.top + (elCoords.height / 2)) return 1;
                return 2;
            }
        }
        return -1;
    }
}


class DragList {
    constructor(listSelector='ul', itemsSelector='li') {
        this.list = document.querySelector(listSelector);
        this.items = this.list.querySelectorAll(itemsSelector);
        this.finalPosition = null;
        this.finalElementHover = null;

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);

        this.canvas = document.createElement('canvas');

        this.buildFakeElement();

        this.addDragListeners();
    }

    buildFakeElement() {
        this.fakeElement = document.createElement('div');
        this.fakeElement.style.backgroundColor = '#eee';
        this.fakeElement.classList.add('card');
    }

    addDragListeners() {
        this.items.forEach(item => {
            item.addEventListener('dragstart', this.handleDragStart);
            item.addEventListener('drag', this.handleDrag);
            item.addEventListener('dragend', this.handleDragEnd);
        });
    }

    handleDragStart(event) {
        let el = event.currentTarget;
        event.dataTransfer.setDragImage(this.canvas, 0, 0);
        el.classList.add('dragging');
    }

    handleDrag(event) {
        let mouseCoords = {
            x: event.clientX,
            y: event.clientY,
        };
        DOMHelper.move(event.currentTarget, mouseCoords);

        this.items.forEach(item => this.compareElement(item, event));
    }

    compareElement(item, event) {
        if(item === event.currentTarget) return;
        let mouseCoords = {
            x: event.clientX,
            y: event.clientY,
        };
        let result = DOMHelper.whereIs(item, mouseCoords);
        if(result === -1) return;

        this.finalPosition = result;
        this.finalElementHover = item;

        if(result === 1) {
            this.list.insertBefore(this.fakeElement, item);
        }
        if(result === 2) {
            this.list.insertBefore(this.fakeElement, item.nextSibling);
        }
    }

    handleDragEnd(event) {
        let el = event.currentTarget;
        el.classList.remove('dragging');
        el.style.top = '';
        el.style.left = '';

        if(this.finalPosition === 1) {
            this.list.insertBefore(el, this.finalElementHover);
        }
        if(this.finalPosition === 2) {
            this.list.insertBefore(el, this.finalElementHover.nextSibling);
        }
        this.fakeElement.remove();
    }
}

new DragList('.freestylers ul');
