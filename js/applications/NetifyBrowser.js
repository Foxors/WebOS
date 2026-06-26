import { Application } from './Application.js';

export class NetifyBrowser extends Application {

    static appName = "Homepage";

    init() {
        this.win = this.sys.environment_get("windowManager").create_window(
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

        this.win.set_title("Netwify Browser");

        this.win.get_html().classList.add("NetifyBrowser");

        this.win.get_html().innerHTML = `
            <!--
            RESTRICTED BECAUSE MANY SITES DENY BC IT IS A SECURITY RISK!

            <div class="head">
                <input value="" type="text" id="uri">
                <button id="search">Search</button>
            </div>
            -->
            <iframe src="https://foxors.de"></iframe>
        `;

        this.win.get_html().querySelector("#uri").addEventListener("keypress", (e) => {
            var keyCode = e.code || e.key;
            if (keyCode == 'Enter') {
                this.set_uri();
            }
        });
        this.win.get_html().querySelector("#search").addEventListener("click", this.set_uri.bind(this));
    }

    set_uri() {
        let query = this.win.get_html().querySelector("#uri").value;
        if (!query.startsWith("https://") && !query.startsWith("http://")) {
            query = "https://" + query;
            this.win.get_html().querySelector("#uri").value = query;
        }

        this.win.get_html().querySelector("iframe").src = query;
    }

    exit() {
    }
}
