import { setDataRefresh } from './utils.js';
import { api } from './api.js';
import { Card } from './card.js';
import { PopupImage } from './popup-image.js';
import { Popup } from './popup.js';
import { cats } from './cats.js';
import { CatInfo } from './cat-info.js';

const cardsContainer = document.querySelector('.cards');
const btnOpenPopupForm = document.querySelector('#add');
const btnOpenPopupLogin = document.querySelector('#login');

const formCatAdd = document.querySelector('#popup-form-cat');
const formLogin = document.querySelector('#popup-form-login');

const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();

const popupLogin = new Popup('popup-login');
popupLogin.setEventListener();

const popupCatInfo = new Popup('popup-cat-info');
popupCatInfo.setEventListener();

const popupImage = new PopupImage('popup-cat-image');
popupImage.setEventListener();

const catInfoTemplate = new CatInfo(
"#cats-info-template",
handleCatInfoEdit,
handleCatLike,
handleCatDelete,

);

const catInfoElement = catInfoTemplate.getElement();


function serializeForm(elements) {
    const formData = {};

    elements.forEach(input => {
        if (input.type === 'submit') return;

        if (input.type !== 'checkbox') {
            formData[input.name] = input.value;
        }

        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        }
    });
    return formData;
}

function createCat(dataCat) {
    const cardInstance = new Card(dataCat, '#card-template', handleCatTitle, handleCatImage);
    const newCardElement = cardInstance.getElement();
    cardsContainer.append(newCardElement);
  }

function handleFormAddCat(e) {


  e.preventDefault();
  const elementsFormCat = [...formCatAdd.elements];

  const dataFromForm = serializeForm(elementsFormCat);
 
  api.addNewCat(dataFromForm).then(() => {
 
    createCat(dataFromForm);
    updateLocalStorage(dataFromForm, { type: 'ADD_CAT' });
    
  });

  popupAddCat.close();
}

function handleCatDelete(catInstance){
 api.deleteCatById(catInstance.getId())
  .then(()=>{
  catInstance.deleteCard();
  updateLocalStorage(catInstance.getData(), {type: "DELETE_CAT"});
  popupCatInfo.close();
 });
}

function handleCatInfoEdit(catInstance, data){
  const {age, description, name, id} = data;
  api.updateCatById(id, {age, description, name})
   .then(()=>{
    catInstance.setData(data);
    catInstance.updateCard();
    updateLocalStorage(data, {type: "EDIT_CAT"});
   popupCatInfo.close();
  });
 }

function handleFormLogin(e) {
    e.preventDefault();
    const elementsFormCat = [...formLogin.elements];
    const dataFromForm = serializeForm(elementsFormCat);
    Cookies.set('email', `email=${dataFromForm.email}`);
    btnOpenPopupLogin.classList.add('visually-hidden');
    popupLogin.close();
  }

  const isAuth = Cookies.get('email');

if (!isAuth) {
  popupLogin.open();
  btnOpenPopupLogin.classList.remove('visually-hidden');
}

function handleCatLike(data, catInstance){
  const {id, favorite} = data;
  api.updateCatById(id, {favorite})
   .then(()=>{
    if (catInstance){
    catInstance.setData(data);
    catInstance.updateCard();
  }
    updateLocalStorage(data, {type: "EDIT_CAT"});
  //  popupCatInfo.close();
  });

}

function handleCatTitle(catInstance) {

  catInfoTemplate.setData(catInstance);
  popupCatInfo.setContent(catInfoElement);
  popupCatInfo.open();
   
}



function handleCatImage(dataCard) {

  popupImage.open(dataCard);


}


function checkLocalStorage() {

    const localData = JSON.parse(localStorage.getItem('cats'));
    const getTimeExpires = localStorage.getItem('catsRefresh');
    
    const isActual = new Date() < new Date(getTimeExpires);
  
  if (localData && localData.length && isActual) {
      localData.forEach(function (catData) {
        createCat(catData);
      });
    } else {
      api.getAllCats().then((data) => {
        data.forEach(function (catData) {
          createCat(catData);
        });
        updateLocalStorage(data, { type: 'ALL_CATS' });
      });
    }
  }
  
  checkLocalStorage();
  
  function updateLocalStorage(data, action) {
    const oldStorage = JSON.parse(localStorage.getItem('cats'));
 
    switch (action.type) {
      case 'ADD_CAT':
        localStorage.setItem('cats', JSON.stringify([...oldStorage, data]));
        return;
      case 'ALL_CATS':
        localStorage.setItem('cats', JSON.stringify(data));
        setDataRefresh(600, 'catsRefresh');
        return;
      case 'DELETE_CAT':
        const newStorage = oldStorage.filter((cat) => cat.id !== data.id);
        localStorage.setItem('cats', JSON.stringify(newStorage));
        return;
      case 'EDIT_CAT':
        const updatedLocalStorage = oldStorage.map((cat) =>
          cat.id === data.id ? data : cat
        );
        localStorage.setItem('cats', JSON.stringify(updatedLocalStorage));
        return;
      default:
        break;
    }
  }
  
  btnOpenPopupForm.addEventListener('click', () => {

  const isAuth = Cookies.get('email');

  if (!isAuth) {
  popupAddCat.close();
  popupLogin.open();
  btnOpenPopupLogin.classList.remove('visually-hidden');
}
else{
    popupAddCat.open();}
  });


  btnOpenPopupLogin.addEventListener('click', () => popupLogin.open());
  
  
  formCatAdd.addEventListener('submit', handleFormAddCat);
  formLogin.addEventListener('submit', handleFormLogin);


