export class Card {
    constructor(data, selectorTemplate, handleCatTitle, handleCatImage) {
        this._data = data;
        this._handleCatTitle = handleCatTitle;
        this._handleCatImage = handleCatImage;
        this._selectorTemplate = selectorTemplate;
        // this._handleCatLike = handleCatLike;
    }  
    _getTempate(){
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');
    }
 


 

    getElement() {
        this.element = this._getTempate().cloneNode(true); //клонируем полученное содержимое из шаблона
        this.cardTitle = this.element.querySelector('.card__name');
        this.cardImage = this.element.querySelector('.card__image');
        this.cardLike = this.element.querySelector('.card__like');
        
        // if(!this._data.favorite){
        //     this.cardLike.remove();
        // }


        // this.cardTitle.textContent = this._data.name; 
        // this.cardImage.src = this._data.image;
        this.updateCard();
        
        this.setEventListener();
       
        return this.element;
    }


    _setLike(){
        this._data.favorite = !this._data.favorite;
      
        // this._handleCatLike(this._data, this);
        this.updateCard();
    }

    _updateCardLike(){
        if (this._data.favorite){
            this.cardLike.classList.add('card__like__active');
         }
         else{
            this.cardLike.classList.remove('card__like__active'); 
         }
    }

    getData(){
        return this._data;
    }

    getId() {
        return this._data.id;
    }

    setData(newData){
        this._data=newData;
    }

    updateCard(){
        this.cardTitle.textContent = this._data.name;
        this.cardImage.src = this._data.image;
        this._updateCardLike();
    }

    deleteCard(){
        this.element.remove();
        this.element = null;
    }
   


    setEventListener(){

        this.cardTitle.addEventListener('click',  ()=> this._handleCatTitle(this));
        this.cardImage.addEventListener('click', ()=> this._handleCatImage(this._data));
        this.cardLike.addEventListener('click', ()=> this._setLike());
    }



}