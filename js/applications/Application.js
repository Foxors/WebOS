export class Application {
    pid = null;
    data = null
    sys = null;
    static appName = "No name";

    constructor(sys, data) {
        this.sys = sys;
        this.data = data;
    }

    exit() { }
}
