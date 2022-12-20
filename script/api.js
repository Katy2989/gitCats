// - добавляет информацию о коте на сайт
// - запрашивает все записи с котами
// - запрашивает конкретную запись с котом
// - редактирует информацию у конкретной записи с котом
// - удаляет информацию о коте
// - запрашивает все айдишники

// Адрес API
// https://cats.petiteweb.dev

// GET - получить информацию обо всех котах
// https://cats.petiteweb.dev/api/single/<name>/show

// GET - получить массив всех существующих id
// https://cats.petiteweb.dev/api/single/<name>/ids

// GET - получить информацию об одном коте по id
// https://cats.petiteweb.dev/api/single/<name>/show/<id кота>

// POST - добавить нового кота (id, name - обязательно!)
// https://cats.petiteweb.dev/api/single/<name>/add

// PUT - изменить информацию о коте (запрещено менять id и name)
// https://cats.petiteweb.dev/api/single/<name>/update/<id кота>

// DELETE - удалить кота
// DELETE https://cats.petiteweb.dev/api/single/<name/delete/<id кота>

// Роутеры:
// GET https://cats.petiteweb.dev/api/single/:user/show - отобразить всех котиков
// GET https://cats.petiteweb.dev/api/single/:user/show/:id- отобразить все возможные айди котиков
// GET https://cats.petiteweb.dev/api/single/:user/ids - отобразить конкретного котика
// POST https://cats.petiteweb.dev/api/single/:user/add - добавить котика
// PUT https://cats.petiteweb.dev/api/single/:user/update/:id - изменить информацию о котике
// DELETE https://cats.petiteweb.dev/api/single/:user/delete/:id - удалить котика из базы данных

const CONFIG_API = {
    url: 'https://cats.petiteweb.dev/api/single/katulion',
    headers: {
        'Content-type': 'application/json'
    }
};

class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }

    _onResponce(res){
        return res.ok ? res.json() : Promise.reject({...res, message: "Ошибка на стороне сервера"});
    }

    getAllCats(){
        return fetch(`${this._url}/show`, {
            method: 'GET'
        }).then(this._onResponce);
    }


    addNewCat(data){
        return fetch(`${this._url}/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this._onResponce);
    }

    updateCatById(idCat, data){
        fetch(`${this._url}/update/${idCat}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this._headers
        });
    }


    getCatById(idCat){
        fetch(`${this._url}/show/${idCat}`, {
            method: 'GET',
        });
    }


    deleteCatById(idCat){
        fetch(`${this._url}/delete/${idCat}`, {
            method: 'DELETE',
        });
    }


}

const api = new Api(CONFIG_API);