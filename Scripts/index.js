//use this place to test
'use strict';
/* global store, api, bookmarks */
$(document).ready(function() {
    api.getBookmarks((items) => {
        items.forEach((bookmark) => store.addBookmark(bookmark));
        console.log('these are store items', store.bookmarks);

        bookmarks.render();
    });
    bookmarks.handleApp();
});