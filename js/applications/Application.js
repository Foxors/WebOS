import { exit_application } from '/js/os.js';

export class Application {
    htmlParent = null;
    htmlContentParent = null;

    windowWidth = 0;
    windowHeight = 0;

    hidden = false;
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

            // Register event listeners
            // Dragging
            this.dragApplication(this);
            // Minimising
            this.htmlParent.querySelector("#minimize").addEventListener("click", this.toggleToBackground.bind(this));
            // Maximising
            this.htmlParent.querySelector("#maximize").addEventListener("click", this.toggleFullScreen.bind(this));
            // Quit
            this.htmlParent.querySelector("#close").addEventListener("click", this.askToQuit.bind(this));


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
     * Make applications dragable with this function.
     */
    dragApplication(application) {
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
                return;
            }

            // Cancel when in full screen
            if (application.fullscreen) {
                return;
            }

            e.preventDefault();

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            document.onmouseup = stopDragging;
            document.onmousemove = dragWindow;
        }

        function dragWindow(e) {
            e.preventDefault();

            deltaX = lastMouseX - e.clientX;
            deltaY = lastMouseY - e.clientY;

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            application.position.x -= deltaX;
            application.position.y -= deltaY;

            application.updatePosition();
        }

        function stopDragging(e) {
            e.preventDefault();

            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    /*
     * Toggle if the application is displayed or in background running.
     */
    toggleToBackground() {
        if (this.hidden) {
            this.hidden = false;
            this.htmlParent.style.display = "auto";
        } else {
            this.hidden = true;
            this.htmlParent.style.display = "none";
        }
    }

    /*
     * Toggle between full screen and window mode.
     */
    toggleFullScreen() {
        if (this.fullscreen) {
            this.fullscreen = false;
        } else {
            this.fullscreen = true;
        }

        this.updateSize();
        this.updatePosition();
    }

    /*
    * Updaing the position of actual html tag.
    */
    updatePosition() {
        if (this.fullscreen) {
            this.htmlParent.style.left = "0px";
            this.htmlParent.style.top = "0px";
        } else {
            this.htmlParent.style.left = this.position.x + "px";
            this.htmlParent.style.top = this.position.y + "px";
        }
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
     * Ask the system to stop thos program.
     */
    askToQuit() {
        exit_application(this);
    }

    /*
    * Removes window again.
    * (Please ask the main system and do not do this manually)
    */
    exit() {
        // Unregister all event listeners.
        document.onmousedown = null;
        document.onmouseup = null;
        document.onmousemove = null;
        this.htmlParent.querySelector("#minimize").removeEventListener("click", this.toggleToBackground.bind(this));
        this.htmlParent.querySelector("#maximize").removeEventListener("click", this.toggleFullScreen.bind(this));
        this.htmlParent.querySelector("#close").removeEventListener("click", this.askToQuit.bind(this));

    }
}
