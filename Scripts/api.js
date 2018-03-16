'use strict';
/* global */
const api = (function () {
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/bianca';
    const getBookmarks = function(callback) {
        console.log('getBookmarks ran');
        $.getJSON(BASE_URL + '/bookmarks', callback);
    }
    const createBookmark = function(bookmark, callback) {
        const newItem = JSON.stringify(bookmark);
        $.ajax({
            url: BASE_URL + '/bookmarks',
            method: 'POST',
            contentType: 'application/json',
            data: newItem,
            success: callback
        });
    };
    const updateBookmark = function(id, updateData, callback) {
        $.ajax({
            url: BASE_URL + '/bookmarks/' + id,
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(updateData),
            success: callback
        })
    }
    const deleteBookmark = function(id, callback){
       
        $.ajax({
            url: BASE_URL + '/bookmarks/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: callback
        })
    }
    return {
        getBookmarks,
        createBookmark,
        updateBookmark,
        deleteBookmark
    }
}());