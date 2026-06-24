import { system } from '/js/os.js';

export class Application {
    htmlParent = null;
    htmlContentParent = null;

    size = { "x": null, "y": null };
    position = { "x": null, "y": null };

    minimized = null;
    fullScreen = null;

    pid = null;

    /*
    * Build initial html structure of a base window and register required handlers.
    */
    init(cosmetics = true) {
        if (typeof (cosmetics) != typeof (true)) {
            console.error("Expected a boolean!");
            return;
        }

        this.htmlParent = document.createElement("div");
        this.htmlParent.classList.add("window");

        if (cosmetics) {
            this.htmlParent.classList.add("styled");

            this.htmlParent.innerHTML = `
                <div class="titleBar" id="titleBar">
                    <p class="title" id="titleText"><!-- Title of indow here --></p>
                    <div class="options">
                        <button id="minimize"><img src="/icons/minimize.svg"></button>
                        <button id="maximize"><img src="/icons/maximize.svg"></button>
                        <button id="quit"><img src="/icons/close.svg"></button>
                    </div>
                </div>
                <div class="windowContent"><!-- Content of window here --></div>
            `;

            // Register event listeners for topbar.
            // Dragging
            this.dragApplication(this);
            // Minimising
            this.htmlParent.querySelector("#minimize").addEventListener("click", this.moveToBackground.bind(this));
            // Maximising
            this.htmlParent.querySelector("#maximize").addEventListener("click", this.toggleFullScreen.bind(this));
            // Quit
            this.htmlParent.querySelector("#quit").addEventListener("click", this.askToQuit.bind(this));
        } else {
            this.htmlParent.innerHTML = `<div class="windowContent"><!-- Content of window here --></div>`;
        }

        // Notes down where content is for better acces afterwards.
        this.htmlContentParent = this.htmlParent.getElementsByClassName("windowContent")[0];

        this.updateSize();
        this.updatePosition();
    }

    /*
     * Set title of window.
     */
    setTilte(newTitle) {
        if (typeof (newTitle) != typeof ("")) {
            console.error("Expected a string!");
            return;
        }

        this.htmlParent.querySelector("#titleText").innerText = newTitle;
    }

    /*
     * Make applications dragable.
     */
    dragApplication(application) {
        var lastMouseX = 0;
        var lastMouseY = 0;
        var deltaX = 0;
        var deltaY = 0;

        // Make draggable
        let titleBar = application.htmlParent.querySelector("#titleBar");
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
     * Show application to user in case it was minimized.
     */
    moveToDesktop() {
        this.minimized = false;
        this.htmlParent.style.display = "auto";
    }

    /*
     * Hide application from user. (minimizing)
     */
    moveToBackground() {
        this.minimized = true;
        this.htmlParent.style.display = "none";
    }

    /*
     * Toggle between full screen and window mode.
     */
    toggleFullScreen() {
        if (this.fullScreen) {
            this.fullScreen = false;
        } else {
            this.fullScreen = true;
        }

        this.updateSize();
        this.updatePosition();
    }

    /*
    * Updaing the position of actual html tag.
    */
    updatePosition() {
        if (this.fullScreen) {
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
        if (this.fullScreen) {
            this.htmlParent.style.width = "100vw";
            this.htmlParent.style.height = "100vh";
        } else {
            this.htmlParent.style.width = this.size.x + "px";
            this.htmlParent.style.height = this.size.y + "px";
        }
    }

    /*
     * Ask the system to stop this program.
     */
    askToQuit() {
        system.application_kill(this.pid);
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

        if (this.htmlParent.querySelector("#titleBar") != undefined) {
            this.htmlParent.querySelector("#minimize").removeEventListener("click", this.moveToBackground.bind(this));
            this.htmlParent.querySelector("#maximize").removeEventListener("click", this.toggleFullScreen.bind(this));
            this.htmlParent.querySelector("#quit").removeEventListener("click", this.askToQuit.bind(this));
        }
    }
}
