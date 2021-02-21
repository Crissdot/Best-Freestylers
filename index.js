class DOMHelper {
    static move(el, coords) {
        el.style.top = coords.y - (el.clientHeight / 2) + 'px';
        el.style.left = coords.x - (el.clientWidth / 2) + 'px';
    }

    static isOver(el, pointerCoords) {
        let elCoords = el.getBoundingClientRect();

        if(pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)) {
            if(pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)) {
                return true;
            }
        }
        return false;
    }

    static whereIs(el, pointerCoords) {
        let elCoords = el.getBoundingClientRect();

        if(pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)) {
            if(pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)) {
                if(pointerCoords.y > elCoords.top + (elCoords.height / 2)) return 1;
                return 0;
            }
        }
        return -1;
    }
}
