import { Application } from './applications/Application.js';
import { ImageViewer } from './applications/ImageViewer.js';
import { Test } from './applications/Test.js';

class Mosdule {

    availableApplications = [ImageViewer, Test];
    runningApplications = {};
    idGen = 0;

    constructor() {
        this.init();
    }

    init() {
        this.application_start(ImageViewer, undefined, { "x": 0, "y": 0 }, true, { "img": "https://fastly.picsum.photos/id/152/3888/2592.jpg?hmac=M1xv1MzO9xjf5-tz1hGR9bQpNt973ANkqfEVDW0-WYU" });
        this.application_start(Test);
    }

    application_start(applicationClass,
        size = { "x": window.innerWidth / 3, "y": window.innerHeight / 3 },
        pos = { "x": window.innerWidth / 2 - size.x / 2, "y": window.innerHeight / 2 - size.y / 2 },
        fullScreen = false,
        data = {}
    ) {
        if (!applicationClass instanceof Application) {
            console.error("Tryed starting a non application as application!");
            return;
        }

        if (!applicationClass in this.availableApplications) {
            console.error("Tryed starting a not available application!");
            return;
        }

        let newApplication = new applicationClass(data);
        newApplication.pid = this.idGen;
        newApplication.size = size;
        newApplication.position = pos;
        newApplication.fullScreen = fullScreen;

        this.runningApplications[this.idGen] = newApplication;
        newApplication.init();
        newApplication.htmlParent.setAttribute("windowId", this.idGen);
        document.body.appendChild(newApplication.htmlParent);

        this.idGen++;
    }

    application_kill(pid) {
        if (typeof (pid) == typeof (Int)) {
            console.error("Expected a int!");
            return;
        }

        let targetApplication = this.runningApplications[pid];

        targetApplication.exit();
        document.body.removeChild(targetApplication.htmlParent);
        delete this.runningApplications[pid];
    }
}

export var system = new Mosdule();
