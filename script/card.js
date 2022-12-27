export class Card {
    constructor(data, selectorTemplate, handleCatTitle, handleCatImage) {
        this._data = data;
        this._handleCatTitle = handleCatTitle;
        this._handleCatImage = handleCatImage;
        this._selectorTemplate = selectorTemplate;
    }  
    _getTempate(){
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');
    }
    getElement() {
        this.element = this._getTempate().cloneNode(true); //клонируем полученное содержимое из шаблона
        this.cardTitle = this.element.querySelector('.card__name');
        this.cardImage = this.element.querySelector('.card__image');
        this.cardLike = this.element.querySelector('.card__like');
        
        if(!this._data.favorite){
            this.cardLike.remove();
        }

        this.cardTitle.textContent = this._data.name; 
        this.cardImage.src = this._data.image;
        this.setEventListener();
        return this.element;
    }
    setEventListener(){

        this.cardTitle.addEventListener('click', this._handleCatTitle);
        this.cardImage.addEventListener('click', ()=> this._handleCatImage(this._data));
    }

 


}