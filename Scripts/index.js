//use this place to test
$(document).ready(function() {
    bookmarks.bindEventListeners();
    bookmarks.render();
    api.getBookmarks((items) => {
        items.forEach((item) => store.addItem(item));
        console.log('these are store items', store.items);

        bookmarks.render();
    });
});