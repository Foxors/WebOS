import { Application } from './Application.js';

export class Test extends Application {

    static appName = "Test app";
    static icon = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 16 16" width="16px"><path d="m 8.140625 0.273438 c -1.15625 0.007812 -2.515625 0.300781 -3.894531 0.878906 c -0.238282 0.175781 -0.332032 0.484375 -0.234375 0.761718 c 0.101562 0.273438 0.371093 0.453126 0.660156 0.441407 c 0.9375 -0.039063 2.316406 0.222656 2.976563 0.882812 c 0.273437 0.265625 0.828124 0.792969 0.210937 1.417969 c -0.25 0.238281 -1.089844 1.066406 -1.089844 1.066406 l 1.40625 1.40625 c 0.957031 -0.734375 2.121094 -1.132812 3.324219 -1.136718 c 1.410156 0 2.765625 0.542968 3.785156 1.515624 l 0.355469 -0.355468 c 0.394531 -0.390625 0.394531 -1.027344 0 -1.417969 v 0.003906 l -0.480469 -0.480469 c -0.128906 -0.128906 -0.660156 -0.304687 -0.921875 -0.042968 c -0.265625 0.253906 -0.679687 0.253906 -0.945312 0 c -0.1875 -0.1875 -0.25 -0.46875 -0.152344 -0.71875 c 0.214844 -0.5 0.105469 -0.964844 -0.175781 -1.246094 c -0.957032 -0.960938 -1.625 -1.65625 -2.183594 -2.167969 c -0.542969 -0.546875 -1.484375 -0.816406 -2.640625 -0.808593 z m -2.3125 6.375 l -5.296875 5.273437 c -0.375 0.371094 -0.5039062 0.566406 -0.5039062 1.097656 c 0.0273437 1.089844 0.9101562 1.972657 2.0000002 2 c 0.347656 0 0.648437 -0.25 1.019531 -0.621093 l 2.957031 -2.953126 c 0.011719 -1.242187 0.449219 -2.445312 1.230469 -3.410156 z m 5.609375 1.273437 c -0.40625 0 -0.792969 0.089844 -1.15625 0.21875 l 1.90625 1.90625 c 0.394531 0.390625 0.394531 1.011719 0 1.40625 l -0.71875 0.75 c -0.394531 0.390625 -1.011719 0.390625 -1.40625 0 l -1.9375 -1.9375 c -0.125 0.359375 -0.21875 0.75 -0.21875 1.15625 c 0 1.9375 1.585938 3.53125 3.53125 3.53125 c 0.410156 0 0.792969 -0.09375 1.15625 -0.21875 l 1.21875 1.1875 c 0.023438 -0.003906 0.042969 -0.003906 0.0625 0 l 2.09375 -2.09375 l -1.21875 -1.21875 c 0.128906 -0.363281 0.21875 -0.785156 0.21875 -1.1875 c 0 -1.941406 -1.582031 -3.5 -3.53125 -3.5 z m 0 0" fill="#222222"/></svg>`;
    static iconBg = "#e5a50a";

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
