export class Application {
    htmlParent = null;
    htmlContentParent = null;

    windowWidth = 0;
    windowHeight = 0;

    fullscreen = false;
    layer = 0;

    position = { "x": 0, "y": 0 };

    constructor(windowWidth, windowHeight, position, fullscreen, layer) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.position = position;
        this.fullscreen = fullscreen;
        this.layer = layer;
    }

    /*
    * Build initial html structure of a base window.
    */
    init(cosmetics = true) {
        this.htmlParent = document.createElement("div");
        this.htmlParent.classList.add("window");
        if (cosmetics) {
            this.htmlParent.classList.add("styled");

            this.htmlParent.innerHTML = `
<div class="titleBar">
    <p class="title"><!-- Title of indow here --></p>
    <div class="options">
        <button id="minimize"></button>
        <button id="maximize"></button>
        <button id="close"></button>
    </div>
</div>
<div class="windowContent"><!-- Content of window here --></div>
`;
        } else {
            this.htmlParent.innerHTML = `
<div class="windowContent"><!-- Content of window here --></div>
`;
        }

        // Notes down where content is for better acces afterwards.
        this.htmlContentParent = this.htmlParent.getElementsByClassName("windowContent")[0];

        this.updateSize();
        this.updatePosition();
    }

    /*
    * Updaing the position of actual html tag.
    */
    updatePosition() {
        this.htmlParent.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
    }

    /*
    * Updatin the size of actual html tag.
    */
    updateSize() {
        if (this.fullscreen) {
            this.htmlParent.style.width = "100vw";
            this.htmlParent.style.height = "100vh";
        } else {
            this.htmlParent.style.width = this.windowWidth + "px";
            this.htmlParent.style.height = this.windowHeight + "px";
        }
    }

    /*
    * Update layer position.
    */
    updateLayer() {
        this.htmlParent.style.zindex = this.layer;
        this.htmlParent.style.height = this.layer;
    }

    /*
    * Removes window again.
    */
    exit() {
    }
}
