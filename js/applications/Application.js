function dragApplication(application) {
    var lastMouseX = 0;
    var lastMouseY = 0;
    var deltaX = 0;
    var deltaY = 0;

    // Make draggable
    let titleBar = application.htmlParent.getElementsByClassName("titleBar")[0];
    if (titleBar != null) {
        titleBar.onmousedown = startDragging;
    }

    function startDragging(e) {
        if (e.target.nodeName == "IMG" || e.target.nodeName == "BUTTON") {
            console.log(e.target.nodeName);
            return;
        }

        e.preventDefault();

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        console.log("start test");

        document.onmouseup = stopDragging;
        document.onmousemove = dragWindow;
    }

    function dragWindow(e) {
        e.preventDefault();

        deltaX = lastMouseX - e.clientX;
        deltaY = lastMouseY - e.clientY;

        console.log("test");

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        application.position.x -= deltaX;
        application.position.y -= deltaY;

        application.updatePosition();
    }

    function stopDragging(e) {
        e.preventDefault();

        console.log("end test");
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export class Application {
    htmlParent = null;
    htmlContentParent = null;

    windowWidth = 0;
    windowHeight = 0;

    fullscreen = false;
    layer = 0;

    position = { "x": 0, "y": 0 };

    dragged = false;

    constructor(windowWidth, windowHeight, position, fullscreen, layer) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.position = position;
        this.fullscreen = fullscreen;
        this.layer = layer;
    }

    /*
    * Build initial html structure of a base window and register required hadnlers.
    */
    init(cosmetics = true) {
        this.htmlParent = document.createElement("div");
        this.htmlParent.classList.add("window");
        if (cosmetics) {
            this.htmlParent.classList.add("styled");

            this.htmlParent.innerHTML = `
<div class="titleBar" id="titleBar">
    <p class="title"><!-- Title of indow here --></p>
    <div class="options">
        <button id="minimize"><img src="/icons/minimize.svg"></button>
        <button id="maximize"><img src="/icons/maximize.svg"></button>
        <button id="close"><img src="/icons/close.svg"></button>
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

        dragApplication(this);

    }

    /*
    * Updaing the position of actual html tag.
    */
    updatePosition() {
        this.htmlParent.style.left = this.position.x + "px";
        this.htmlParent.style.top = this.position.y + "px";
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
