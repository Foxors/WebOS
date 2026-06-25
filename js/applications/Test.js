import { Application } from './Application.js';

export class Test extends Application {

    static appName = "Test app";

    init() {
        let win = this.sys.environment_get("windowManager").create_window(
            this.pid,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        );

        win.set_title("Test");

        win.get_html().classList.add("Test");
        win.get_html().innerHTML = `
            <h1>Hello, world!</h1>
            <h2>Debbuging options</h2>
            <button id="newWin">New window</button>
            <button id="newSubWin">New sub window</button>
            <button id="desWin">Kill this process</button>
            <h2>Some text</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `;

        win.get_html().querySelector("#newWin").addEventListener("click", (e) => {
            this.sys.application_start(Test);
        });

        win.get_html().querySelector("#desWin").addEventListener("click", (e) => {
            this.sys.application_kill(this.pid);
        });

        win.get_html().querySelector("#newSubWin").addEventListener("click", (e) => {
            let newWin = this.sys.environment_get("windowManager").create_window(
                this.pid,
                300,
                200,
                win.get_position().x,
                win.get_position().y,
                undefined,
                undefined,
                undefined,
                undefined
            );

            newWin.set_title("Sub window.");
            newWin.get_html().classList.add("Test");
            newWin.get_html().innerHTML = `
                <h1>A sub window.</h1>
                <p>This window is created by the same process and therefor also closes when the process is terminated.</p>
            `;
        });
    }

    exit() {
    }
}
