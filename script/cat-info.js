export class CatInfo {
    constructor( 
      selectorTemplate,
      handleCatInfoEdit,
      handleCatLike,
      handleCatDelete
    ){
    this._selectorTemplate = selectorTemplate;
    this._handleCatInfoEdit = handleCatInfoEdit;
    this._handleCatLike = handleCatLike;
    this._handleCatDelete = handleCatDelete;
    this._data = {};
}

setData(){

}

_getTempate(){
    return document.querySelector(this._selectorTemplate).content.children[0];
}
getElement() {
    this.element = this._getTempate().cloneNode(true); 
    
    return this.element;//клонируем полученное содержимое из шаблона
    // const cardTitle = this.element.querySelector('.card__name');
    // const cardImage = this.element.querySelector('.card__image');
    // const cardLike = this.element.querySelector('.card__like');
    
    // if(!this._data.favorite){
    //     cardLike.remove();
    // }
    // cardTitle.textContent = this._data.name;
    // cardImage.src = this._data.image;
    // this.setEventListener();
    // return this.element;
}


}