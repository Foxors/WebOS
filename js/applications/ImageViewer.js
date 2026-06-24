import { Application } from './Application.js';

export class ImageViewer extends Application {
    imagePath = null;

    constructor(data) {
        super();
        this.imagePath = data["img"];
    }

    init() {
        super.init(false);

        this.htmlContentParent.classList.add("ImageViewer");
        this.htmlContentParent.innerHTML = '<img src="' + this.imagePath + '">';
    }
}
