'use strict';
/* global */

//eslint-disable-next-line no-unused-vars
const store = (function() {
    const addBookmark = function(bookmark) {
        this.bookmarks.push(bookmark);
    };
    const findById = function(id){
        return this.bookmarks.find(bookmark => bookmark.id === id);
    
    ;}
    return {
        bookmarks: [],
        addBookmark,
        findById
    }
}());