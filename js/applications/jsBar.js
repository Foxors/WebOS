import { Application } from './Application.js';

export class JsBar extends Application {
    init() {
        this.win = this.sys.environment_get("windowManager").create_window(
            this.pid,
            window.innerWidth,
            20,
            0,
            0,
            true,
            false,
            false,
            false,
            false,
            ""
        );

        this.win.set_title("JsBar");

        this.win.get_html().classList.add("JsBar")

        setInterval(this.update_date.bind(this), 1000);
    }

    update_date() {
        let now = new Date();
        this.win.get_html().innerHTML = `<p class="date">${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDay()}.${now.getMonth()}.${now.getFullYear()}</p>`;
    }

    exit() {
        clearInterval(this.update_date.bind(this), 1000);
    }
}
