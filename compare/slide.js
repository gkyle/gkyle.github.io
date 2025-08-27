class Slider {
    constructor(elem) {
        this.elem = elem;
        this.imgLeft = elem.querySelector(".img-comp-overlay");
        this.imgRight = elem.querySelector(".img-comp-base");

        this.bar = document.createElement("div");
        this.bar.setAttribute("class", "img-comp-slider");
        this.elem.insertBefore(this.bar, this.imgLeft);
        this.sliding = false;

        this.resetDimensions();
        this.initEvents();
    }

    initEvents() {
        this.bar.addEventListener("mousedown", this.slideReady.bind(this));
        window.addEventListener("mouseup", this.slideFinish.bind(this));
        this.bar.addEventListener("touchstart", this.slideReady.bind(this));
        window.addEventListener("touchend", this.slideFinish.bind(this));
        this.imgRight.querySelector("img").addEventListener("load", this.resetDimensions.bind(this));
        this.elem.addEventListener("mousedown", this.jump.bind(this));
        this.elem.addEventListener("touchstart", this.slideReady.bind(this));
    }

    resetDimensions() {
        this.w = this.elem.offsetWidth;
        this.h = this.elem.offsetHeight;
        this.bar.style.height = this.h + "px";
        this.bar.style.top = (this.h / 2) - (this.bar.offsetHeight / 2) + "px";
        if (!this.bar.style.left || parseInt(this.bar.style.left) <= 0) {
            this.imgLeft.style.width = (this.w / 2) + "px";
            this.bar.style.left = (this.w / 2) - (this.bar.offsetWidth / 2) + "px";
        }
    }

    setImageLeft(src) {
        this.imgLeft.querySelector("img").src = ""
        this.imgLeft.querySelector("img").src = src;
    }

    setImageRight(src) {
        this.imgRight.querySelector("img").src = ""
        this.imgRight.querySelector("img").src = src;
    }

    slideReady(e) {
        e.preventDefault();
        this.sliding = true;
        window.addEventListener("mousemove", this.slideMove.bind(this));
        window.addEventListener("touchmove", this.slideMove.bind(this));

        this.slideMove(e);
    }

    slideFinish() {
        this.sliding = false;
    }

    slideMove(e) {
        if (!this.sliding) return;
        let pos = this.getCursorPos(e);
        if (pos < 0) pos = 0;
        if (pos > this.w) pos = this.w;
        this.slide(pos);
    }

    getCursorPos(e) {
        let a, x = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;
        a = this.imgLeft.getBoundingClientRect();
        x = e.pageX - a.left;
        x = x - window.pageXOffset;
        return x;
    }

    jump(e) {
        e.preventDefault();
        let pos = this.getCursorPos(e);
        if (pos < 0) pos = 0;
        if (pos > this.w) pos = this.w;
        this.slide(pos);
        this.slideReady(e)
    }

    slide(x) {
        this.imgLeft.style.width = x + "px";
        this.bar.style.left = this.imgLeft.offsetWidth - (this.bar.offsetWidth / 2) + "px";
    }
}
