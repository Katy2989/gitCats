export class Popup {
    constructor(className) {
      this._className = className;
      this.popup = document.querySelector(`.${className}`);
    }

    setContent(contentNode){
      const contentContainer = this.popup.querySelector(".popup__content");
      contentContainer.innerHTML="text";
      contentContainer.append(contentNode);

    }
    open() {
   
      this.popup.classList.add('popup_active'); 
    
    }

    close() {
      this.popup.classList.remove('popup_active');
    }
    setEventListener() {
      this.popup.addEventListener('click', (evt) => {
        if (
          evt.target.classList.contains(this._className) ||
          !!evt.target.closest('.popup__close')
        ) {
          this.close();
        }
      });
    }
  }
  const popups = new Popup('popup-add-cats');






