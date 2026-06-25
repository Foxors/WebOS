import { Application } from './applications/Application.js';
import { WindowManager } from './applications/WindowManager.js';
import { ImageViewer } from './applications/ImageViewer.js';
import { Docki } from './applications/Docki.js';
import { Test } from './applications/Test.js';
import { Intro } from './applications/Intro.js';

class Mosdule {
    #porcesses = {};
    #environmentVariables = {};
    #pidGen = 0;

    constructor() {
        this.init();

    }

    init() {
        this.environment_set("availableApplications", [ImageViewer, Test, WindowManager, Intro]);
        this.environment_set("userApplications", [Test, Intro]);
        console.log("Environment vars: " + this.#environmentVariables);

        this.application_start(WindowManager);
        this.application_start(ImageViewer, { "bg": true, "img": "https://fastly.picsum.photos/id/152/3888/2592.jpg?hmac=M1xv1MzO9xjf5-tz1hGR9bQpNt973ANkqfEVDW0-WYU" });
        this.application_start(Docki);
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
