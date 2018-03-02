//iife s ---api
const api = (function () {
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/bookmark-bianca';
    const getBookmarks = function(callback) {
        console.log('getBookmarks ran');
        $.getJSON(BASE_URL + '/bookmarks', callback);
    }
    const createItem = function(title, callback) {
        console.log('createItem ran');
        const newItem = JSON.stringify({title});
        $.ajax({
            url: BASE_URL + '/bookmarks',
            method: 'POST',
            contentType: 'application/json',
            data: newItem,
            success: callback
        })
    }
    const deleteItem = function(id, callback){
        console.log(`deleteItem ran`);
        $.ajax({
            url: BASE_URL + '/bookmarks/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: callback
        })
    }
    return {
        getBookmarks,
        createItem,
        deleteItem
    }
}());