import { Application } from './Application.js';

export class Intro extends Application {

    static appName = "Intro";

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

        win.set_title("Welcome - Intro");

        win.get_html().innerHTML = `
            <h1>Hello, world!</h1>
            <h2>Welcome to my WebOs Mosdule</h2>
            <p>This is a little os simulator written in plain JS, HTML and CSS. Feel free to explore!</p>
            <button id="moreInfo">More info about Mosdule</button>
            <h2>Me</h2>
            <p>Hello, I am Foxors. A little Fox discovering the Internet for some time. I am interested in programming. Normally i like it a bit more low level with C, but here we have a os simulator written in js. I tried keeping it modular. So it should be easy to modify anything. For more information click on the more info button.</p>
            <button id="start">Start using Mosdule</button>
        `;

        win.get_html().querySelector("#start").addEventListener("click", (e) => {
            this.sys.application_kill(this.pid);
        });

        win.get_html().querySelector("#moreInfo").addEventListener("click", (e) => {
            let newWin = this.sys.environment_get("windowManager").create_window(
                this.pid,
                undefined,
                undefined,
                win.get_position().x,
                win.get_position().y,
                undefined,
                undefined,
                undefined,
                undefined
            );

            newWin.set_title("Welcome - About Mosdule.");
            newWin.get_html().innerHTML = `
                <button id="closeWindow">Back</button>
                <h1>Idea of Mosdule</h1>
                <p>I try keeping Mosdule as modular as i can. Each and every element you can currently see can be swapped out. Even the background is a module named ImageViewer. Each module is called an application. Each application can be started stopped by the system and controlled. Applications can have mutlible running instances called processes. For windows for example we have one application called windowManager that controlls every signle window you currently see. This windowManager application is a process running the entire time and manages each window and can be swapped out with another application that does the same or the same but better.</p>
                <h2></h2>
            `;

            newWin.get_html().querySelector("#closeWindow").addEventListener("click", (e) => {
                this.sys.environment_get("windowManager").destroy_window(newWin.get_wid());
            });
        });
    }

    exit() {
    }
}
