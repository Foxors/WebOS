import { Application } from './Application.js';

export class Intro extends Application {

    static appName = "Intro";
    static icon = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 16 16" width="16px"><g fill="#222222"><path d="m 8.152344 2.996094 c 0.726562 0.035156 1.433594 0.335937 1.96875 0.871094 c 0.855468 0.855468 1.113281 2.152343 0.648437 3.269531 c -0.328125 0.796875 -0.984375 1.390625 -1.769531 1.671875 v 1.179687 h -2 v -2 c 0 -0.550781 0.449219 -1 1 -1 c 0.40625 0 0.769531 -0.242187 0.921875 -0.617187 c 0.15625 -0.375 0.074219 -0.800782 -0.214844 -1.089844 c -0.289062 -0.289062 -0.714843 -0.371094 -1.089843 -0.214844 c -0.375 0.152344 -0.617188 0.515625 -0.617188 0.921875 h -2 c 0 -1.210937 0.734375 -2.308593 1.851562 -2.769531 c 0.417969 -0.175781 0.863282 -0.246094 1.300782 -0.222656 z m -0.152344 7.992187 c 0.550781 0 1 0.449219 1 1 s -0.449219 1 -1 1 s -1 -0.449219 -1 -1 s 0.449219 -1 1 -1 z m 0 0"/><path d="m 11.183594 1.261719 c -1.75 -1.753907 -4.617188 -1.753907 -6.371094 0 l -3.5625 3.5625 c -1.75 1.75 -1.75 4.617187 0 6.371093 l 3.5625 3.5625 c 1.753906 1.753907 4.621094 1.75 6.371094 0 l 3.566406 -3.5625 c 1.75 -1.753906 1.75 -4.617187 0 -6.371093 z m -1.414063 1.414062 l 3.566407 3.5625 c 0.992187 0.992188 0.992187 2.546875 0 3.539063 l -3.566407 3.566406 c -0.992187 0.992188 -2.546875 0.992188 -3.542969 0 l -3.5625 -3.5625 c -0.992187 -0.992188 -0.992187 -2.550781 0 -3.542969 l 3.5625 -3.566406 c 0.996094 -0.992187 2.550782 -0.992187 3.542969 0.003906 z m 0 0"/></g></svg>`;
    static iconBg = "#2ec27e";

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
