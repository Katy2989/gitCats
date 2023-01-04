import {
    rating,
    printNumeric
} from "./utils.js";


export class CatInfo {
    constructor(
        selectorTemplate,

        handleCatInfoEdit,
        handleCatLike,
        handleCatDelete
    ) {
        this._selectorTemplate = selectorTemplate;
        this._handleCatInfoEdit = handleCatInfoEdit;
        this._handleCatLike = handleCatLike;
        this._handleCatDelete = handleCatDelete;
        this._data = {};


    }

    setData(catInstance) {

        this._catInstance = catInstance;
        this._data = this._catInstance.getData();
        // this.catId.textContent =this._data.id;
        this.catImage.src = this._data.image;
        this.catDescription.textContent = this._data.description;
        this.catName.textContent = this._data.name;
        this.catAge.textContent = this._data.age;
        this.catAgeText.textContent = printNumeric(this._data.age, ["год", "года", "лет"]);
        this.catRate.innerHTML = rating(this._data.rate);
        this._updateLike();

    }


    _getTempate() {
        return document.querySelector(this._selectorTemplate).content.children[0];
    }


    getElement() {
        this.element = this._getTempate().cloneNode(true);


        this.catInfoClosed = this.element.querySelector(".cat-info");
        this.catImage = this.element.querySelector(".cat-info__image");
        this.btnEdited = this.element.querySelector(".cat-info__edited");
        this.btnSaved = this.element.querySelector(".cat-info__saved");
        this.btnDeleted = this.element.querySelector(".cat-info__deleted");
        this.btnClosed = this.element.querySelector(".cat-info__closed");
        this.editBtn = this.element.querySelector('#info__edited');
        this.btncatLike = this.element.querySelector(".cat-info__like");

        this.catId = this.element.querySelector(".cat-info__id");
        this.catName = this.element.querySelector(".cat-info__name");

        this.catRate = this.element.querySelector(".cat-info__rate");
        this.catAge = this.element.querySelector(".cat-info__age-val");

        this.catAgeText = this.element.querySelector(".cat-info__age-text");
        this.catDescription = this.element.querySelector(".cat-info__description");

        this.setEventListener();
        return this.element;
    }


    _editedCard() {

        this.btnEdited.classList.toggle('cat-info__edited__hidden');
        this.btnSaved.classList.toggle('cat-info__saved__hidden');


        this.catAge.contentEditable = !this.catAge.isContentEditable;
        this.catName.contentEditable = !this.catName.isContentEditable;
        this.catDescription.contentEditable = !this.catDescription.isContentEditable;
    }

    _saveDataCats() {

        this._editedCard();

        this._data.age = this.catAge.textContent;
        this._data.name = this.catName.textContent;
        this._data.description = this.catDescription.textContent;

        this._catInstance.setData(this._data);
        this._catInstance.updateCard();
        this._handleCatInfoEdit(this._catInstance, this._data);
    }


    _updateLike() {
        console.log(this._data.favorite);
        if (this._data.favorite) {
            this.btncatLike.classList.add("cat-info__like__active");
        } else {
            this.btncatLike.classList.remove("cat-info__like__active");
        }
    }

    _setLikeCat() {
        console.log(this._data.favorite);
        this._data.favorite = !this._data.favorite;
        this._updateLike();
        this._handleCatLike(this._data, this._catInstance);
    }



    setEventListener() {

        this.btnDeleted.addEventListener('click', () =>
        this._handleCatDelete(this._catInstance));


        this.editBtn.addEventListener('click', () => this._editedCard());
        this.btnSaved.addEventListener('click', () => this._saveDataCats());
        this.btncatLike.addEventListener('click', () => this._setLikeCat());

    }
}