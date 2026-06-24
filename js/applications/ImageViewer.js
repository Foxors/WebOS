import { Application } from './Application.js';

export class ImageViewer extends Application {
    imagePath = null;

    constructor(windowWidth, windowHeight, position, fullscreen, layer, imagePath) {
        super(windowWidth, windowHeight, position, fullscreen, layer);
        this.imagePath = imagePath;
    }

    init() {
        super.init(false);

        this.htmlParent.classList.add("ImageViewer");
        this.htmlContentParent.innerHTML = '<img src="' + this.imagePath + '">';
    }
}
