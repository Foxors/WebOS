import { Application } from './Application.js';

export class Docki extends Application {
    applicationList = null;

    init() {
        this.win = this.sys.environment_get("windowManager").create_window(
            this.pid,
            window.innerWidth,
            100,
            0,
            window.innerHeight - 100,
            true,
            false,
            false,
            false,
            false,
            "window"
        );

        this.win.set_title("Docki");

        this.win.get_html().classList.add("Docki")

        this.update_app_list();

        this.win.get_html().addEventListener("click", this.click_handler.bind(this));
    }

    click_handler(e) {
        let button = e.target.closest("button.runButton");
        if (!button) {
            return;
        }

        let appId = button.getAttribute("application");
        this.applicationList.forEach(app => {
            if (app.name == appId) {
                this.sys.application_start(app);
            }
        });
    }

    update_app_list() {
        this.applicationList = this.sys.environment_get("userApplications");
        this.win.get_html().innerHTML = ``;
        this.applicationList.forEach(item => {
            let newButton = document.createElement("button");
            newButton.innerText = item.appName;
            newButton.classList.add("runButton");
            newButton.setAttribute("application", item.name);
            this.win.get_html().appendChild(newButton);
        });
    }

    exit() {
        this.win.get_html().removeEventListener("click", this.click_handler.bind(this));
    }
}
