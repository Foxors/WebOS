import { Application } from './Application.js';

class Window {
    #htmlParent = null;
    #htmlContentParent = null;

    #size = { "x": null, "y": null };
    #position = { "x": null, "y": null };

    #titleBarHidden = null;
    #minimized = null;
    #fullScreen = null;

    #wid = null;
    #pid = null;

    constructor(pid, wid, width, height, x, y, titleBarHidden, cosmetics, minimized, fullScreened) {
        this.#pid = pid;
        this.#wid = wid;

        this.#size = { "x": width, "y": height };
        this.#position = { "x": x, "y": y };

        this.#titleBarHidden = titleBarHidden;
        this.#minimized = minimized;
        this.#fullScreen = fullScreened;

        this.#htmlParent = document.createElement("div");
        this.#htmlParent.classList.add("window");
        this.#htmlParent.setAttribute("wid", this.#wid);
        this.#htmlParent.setAttribute("pid", this.#pid);

        if (cosmetics == true) {
            this.#htmlParent.classList.add("styled");
        }

        this.#htmlParent.innerHTML = `
            <div class="titleBar" id = "titleBar">
                <p class="title" id="titleText"><!-- Title of indow here --></p>
                <div class="options">
                    <button id="minimize"><img src="/icons/minimize.svg"></button>
                    <button id="maximize"><img src="/icons/maximize.svg"></button>
                    <button id="quit"><img src="/icons/close.svg"></button>
                </div>
            </div>
            <div class="windowContent"><!-- Content of window here --></div>`;


        this.#htmlContentParent = this.#htmlParent.getElementsByClassName("windowContent")[0];

        this.update();
    }

    get_pid() {
        return this.#pid;
    }

    get_wid() {
        return this.#wid;
    }

    get_html() {
        return this.#htmlContentParent;
    }

    get_window_html() {
        return this.#htmlParent;
    }

    set_title(newTitle) {
        if (typeof (newTitle) != typeof ("")) {
            console.error("Expected a string!");
            return;
        }
        this.#htmlParent.querySelector("#titleText").innerText = newTitle;
    }

    get_position() {
        return this.#position;
    }

    set_position(x, y) {
        this.#position = { "x": x, "y": y };
    }

    start_dragging(e) {
        var lastMouseX = 0;
        var lastMouseY = 0;
        var deltaX = 0;
        var deltaY = 0;
        let win = this;


        // Cancel when in full screen
        if (this.#fullScreen) {
            return;
        }

        e.preventDefault();

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = dragWindow;

        function dragWindow(e) {
            e.preventDefault();

            deltaX = lastMouseX - e.clientX;
            deltaY = lastMouseY - e.clientY;

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            win.#position.x -= deltaX;
            win.#position.y -= deltaY;

            win.update();
        }

        function stopDragging(e) {
            e.preventDefault();

            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    set_minimized(minimize) {
        if (typeof (minimize) != typeof (true)) {
            console.error("Expected a boolean!");
            return;
        }

        this.#minimized = minimize;
        this.update();
    }

    toggle_full_screen() {
        if (this.#fullScreen == false) {
            this.set_full_screen(true);
        } else {
            this.set_full_screen(false);
        }
    }

    set_full_screen(fullScreen) {
        if (typeof (fullScreen) != typeof (true)) {
            console.error("Expected a boolean!");
            return;
        }

        this.#fullScreen = fullScreen;
        this.update();
    }

    /*
    * Update actual html window.
    */
    update() {
        if (this.#fullScreen) {
            this.#htmlParent.style.width = "100vw";
            this.#htmlParent.style.height = "100vh";
            this.#htmlParent.style.left = "0px";
            this.#htmlParent.style.top = "0px";
        } else {
            this.#htmlParent.style.width = this.#size.x + "px";
            this.#htmlParent.style.height = this.#size.y + "px";
            this.#htmlParent.style.left = this.#position.x + "px";
            this.#htmlParent.style.top = this.#position.y + "px";
        }

        this.#htmlParent.querySelector("#titleBar").style.display = this.#titleBarHidden ? "none" : null;
        this.#htmlParent.style.display = this.#minimized ? "none" : null;
    }

    /*
    * Destroyes window element.
    */
    destroy() {

    }
}

export class WindowManager extends Application {
    #windows = {};
    #windowIdGen = 0;
    #applicationLayers = [];

    init() {
        // Set a sys environment variable so that applications can access this object.
        this.sys.environment_set("windowManager", this);
        this.sys.environment_set("windowDefaultSize", [window.innerWidth / 3, window.innerHeight / 3]);
        this.sys.environment_set("windowDefaultPos", [window.innerWidth / 2 - window.innerWidth / 3, window.innerHeight / 2 - window.innerHeight / 3]);
        // Add event listener.
        document.addEventListener("mousedown", this.click_handler.bind(this));
    }

    exit() {

    }

    /*
    * Create new window and return the window object.
    */
    create_window(
        pid,
        width = this.sys.environment_get("windowDefaultSize")[0],
        height = this.sys.environment_get("windowDefaultSize")[1],
        x = this.sys.environment_get("windowDefaultPos")[0],
        y = this.sys.environment_get("windowDefaultPos")[1],
        titleBarHidden = false,
        cosmetics = true,
        minimized = false,
        fullScreened = false
    ) {
        this.#windows[this.#windowIdGen] = new Window(pid, this.#windowIdGen, width, height, x, y, titleBarHidden, cosmetics, minimized, fullScreened)
        document.body.appendChild(this.#windows[this.#windowIdGen].get_window_html());
        this.#applicationLayers.push(this.#windowIdGen);
        this.layers_update();
        return this.#windows[this.#windowIdGen++];
    }

    /*
     * Destroy all windows by one process.
     */
    destroy_all_windows(pid) {
        if (typeof (pid) != typeof (0)) {
            console.error("Expected a int!");
            return;
        }

        for (let wid in this.#windows) {
            if (this.#windows[wid].get_pid() == pid) {
                this.destroy_window(wid);
            }
        }
    }

    /*
    * Delete a window by it's wid.
    */
    destroy_window(wid) {
        if (!this.#windows[wid]) {
            console.warn("Warn tryed to destroy non existing window!");
            return;
        }

        this.#applicationLayers.splice([this.#applicationLayers.indexOf(wid)], 1);
        document.body.removeChild(this.#windows[wid].get_window_html());
        delete this.#windows[wid];
    }

    click_handler(e) {
        let win = e.target.closest(".window");
        let winTitleBar = e.target.closest(".titleBar")
        let button = e.target.closest("button");

        if (!win) {
            return;
        }

        let wid = parseInt(win.getAttribute("wid"));
        this.layers_top(wid);

        if (button) {
            switch (button.id) {
                case "minimize":
                    this.#windows[wid].set_minimized(true);
                    break;
                case "maximize":
                    this.#windows[wid].toggle_full_screen();
                    break;
                case "quit":
                    this.sys.application_kill(this.#windows[wid].get_pid());
                    break;
            }
            return;
        }

        if (winTitleBar) {
            this.#windows[wid].start_dragging(e);
        }
    }

    layers_up(wid) {
        let i = this.#applicationLayers.indexOf(wid);

        if (i < 0) {
            console.warn("Tryed to change layer of non exisisting layer wid.");
            return;
        }

        if (i >= this.#applicationLayers.length - 1) {
            return;
        }

        // Switch with next wid.
        let temp = this.#applicationLayers[i + 1];
        this.#applicationLayers[i + 1] = wid;
        this.#applicationLayers[i] = temp;

        this.layers_update();
    }

    layers_down(wid) {
        let i = this.#applicationLayers.indexOf(wid);


        if (i < 0) {
            console.warn("Tryed to change layer of non exisisting layer wid.");
            return;
        }

        if (i <= 0) {
            return;
        }

        // Switch with next wid.
        let temp = this.#applicationLayers[i - 1];
        this.#applicationLayers[i - 1] = wid;
        this.#applicationLayers[i] = temp;

        this.layers_update();
    }

    layers_top(wid) {
        if (this.#applicationLayers.indexOf(wid) < 0) {
            console.warn("Tryed to change layer of non exisisting layer wid.");
            return;
        }

        while (this.#applicationLayers.indexOf(wid) < this.#applicationLayers.length - 1) {
            this.layers_up(wid);
        }
    }

    layers_bottom(wid) {
        if (this.#applicationLayers.indexOf(wid) < 0) {
            console.warn("Tryed to change layer of non exisisting layer wid.");
            return;
        }

        while (this.#applicationLayers.indexOf(wid) > 0) {
            this.layers_down(wid);
        }
    }

    layers_update() {
        for (let i = 0; i < this.#applicationLayers.length; i++) {
            this.#windows[this.#applicationLayers[i]].get_window_html().style.zIndex = `${i} `;
        }
    }
}
