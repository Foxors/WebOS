import { Application } from './Application.js';

export class ImageViewer extends Application {
    init() {
        let win = null;
        if (this.data['bg'] == true) {
            win = this.sys.environment_get("windowManager").create_window(
                this.pid,
                undefined,
                undefined,
                undefined,
                undefined,
                true,
                false,
                false,
                true
            )
        } else {
            win = this.sys.environment_get("windowManager").create_window(
                this.pid,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
            )
        }

        win.set_title("Image viewer - " + this.data['img']);

        win.get_html().classList.add("ImageViewer");
        win.get_html().innerHTML = `<img src="` + this.data['img'] + `">`;

    }
}
