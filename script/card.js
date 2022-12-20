class Card{
    constructor(data, selectorTemplate){
        this._data = data;
        this._selectorTemplate = selectorTemplate;
    }
    _getTemplate(){
return document.querySelector(this._selectorTemplate).content.querySelector(".card");
    }
getElement(){
this.element = this._getTemplate().cloneNode(true);

const cardImage = this.element.querySelector(".card__image");
const cardTitle = this.element.querySelector(".card__name");
const cardLike = this.element.querySelector(".card__like");

cardTitle.textContent = this._data.name;
cardImage.src = this._data.image;

 if (!this._data.favorite){
   cardLike.remove();

 }


// console.log(cardTitle, cardImage);
return this.element;
}
}

 const card = new Card(cats[0]);
// console.log(card);

// const template = document.querySelector("#card-template").content.querySelector(".card");;
// console.log(template);

// console.log(card.getElement());