import { Popup } from './popup.js';

export class PopupImage extends Popup{
    constructor(className) {
        super(className);
    }


    
open(data){

    const imagePopup = document.querySelector(".popup__image");
    imagePopup.src = data.image;
    super.open();
}
}