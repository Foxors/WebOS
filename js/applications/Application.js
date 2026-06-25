export class Application {
    pid = null;
    data = null
    sys = null;

    constructor(sys, data) {
        this.sys = sys;
        this.data = data;
    }

    exit() { }
}
