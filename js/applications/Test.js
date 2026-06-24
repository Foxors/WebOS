import { Application } from './Application.js';

export class Test extends Application {
    init() {
        super.init();

        this.htmlContentParent.classList.add("Test");
        this.htmlContentParent.innerHTML = '<p>Hello, world!</p>';

        this.htmlParent.getElementsByClassName("title")[0].innerText = "Hello, world! Test";
    }
}
