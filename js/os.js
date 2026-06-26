import { Application } from './applications/Application.js';
import { WindowManager } from './applications/WindowManager.js';
import { ImageViewer } from './applications/ImageViewer.js';
import { Docki } from './applications/Docki.js';
import { Test } from './applications/Test.js';
import { Intro } from './applications/Intro.js';
import { JsBar } from './applications/jsBar.js';
import { NetifyBrowser } from './applications/NetifyBrowser.js';

class Mosdule {
    #porcesses = {};
    #environmentVariables = {};
    #pidGen = 0;

    constructor() {
        this.init();

    }

    init() {
        this.environment_set("availableApplications", [ImageViewer, Test, WindowManager, Intro, JsBar, NetifyBrowser]);
        this.environment_set("userApplications", [Test, Intro, NetifyBrowser]);
        console.log("Environment vars: " + this.#environmentVariables);

        this.application_start(WindowManager);
        // Photo by <a href="https://unsplash.com/@ychemerys?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Yuriy Chemerys</a> on <a href="https://unsplash.com/photos/selective-focus-photography-of-orange-fox-during-daytime-BTzQWyRK474?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        this.application_start(ImageViewer, { "bg": true, "img": "/images/background.jpg" });
        this.application_start(Docki);
        this.application_start(JsBar);
        this.application_start(Intro);
    }

    environment_set(key, value) {
        this.#environmentVariables[key] = value;
    }

    environment_get(key) {
        return this.#environmentVariables[key];
    }

    application_start(applicationClass, data = {}) {
        if (!applicationClass instanceof Application) {
            console.warn("Tryed starting a non application as application!");
            return;
        }

        if (!applicationClass in this.environment_get("availableApplications")) {
            console.error("Tryed starting a not available application!");
            return;
        }

        let newApplication = new applicationClass(this, data);
        newApplication.pid = this.#pidGen;
        this.#porcesses[this.#pidGen] = newApplication;

        this.#pidGen++;

        newApplication.init();
    }

    application_kill(pid) {
        if (typeof (pid) == typeof (Int)) {
            console.error("Expected a int!");
            return;
        }

        let targetApplication = this.#porcesses[pid];
        this.environment_get("windowManager").destroy_all_windows(pid);
        targetApplication.exit();
        delete this.#porcesses[pid];
    }
}

export var system = new Mosdule();
