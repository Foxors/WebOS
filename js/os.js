import { ImageViewer } from './applications/ImageViewer.js';
import { Test } from './applications/Test.js';

class Os {

    windowStartWidth = 128;
    windowStartHeight = 60;
    running_applications = [];

    constructor() {
        this.init();
    }

    init() {
        this.start_application(new ImageViewer(this.windowStartWidth, this.windowStartHeight, { "x": 0, "y": 0 }, true, 0, "https://fastly.picsum.photos/id/152/3888/2592.jpg?hmac=M1xv1MzO9xjf5-tz1hGR9bQpNt973ANkqfEVDW0-WYU"));
        this.start_application(new Test(this.windowStartWidth, this.windowStartHeight, { "x": 0, "y": 0 }, false, 0));
    }

    start_application(application) {
        this.running_applications.push(application);
        application.init();
        document.body.appendChild(application.htmlParent);
    }

    close_application(application) {
        application.exit();
        document.body.removeChild(application.htmlParent);
        this.running_applications.splice(this.running_applications.indexOf(application), 1);
    }
}

var system = new Os();
