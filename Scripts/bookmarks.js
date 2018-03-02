//event listeners
'use strict';
/* global store, api */
const bookmarks = (function() {
   
    function getIdFromElement(item){
        return $(item).parents('li').data('item-id');
    };

    function generateItemElement(item){
        return `<li>
        <div class="bookmark-entry">
            <span class="bookmark-item">${item.title}</span>
            <span class="bookmark-description">${item.description}</span>
            <a href="url">${item.url}</a>
            <span class="bookmark-rating">${item.rating}</span>
            <span class="bookmarks-control">
                <button class="bookmark-delete">
                    <span class="button-label">X</span>
                </button>
            </span>
        </div>
    </li>`

    };
    function generateAddItemForm(item){
        // return ` <form id ="add-new-form">
        // <input id="title" type="text" placeholder="Add Title">
        // <input id="link" type="text" placeholder="Add Link">
        // <div class="add-new-description">
        // <textarea name="description" rows="10" cols="30" placeholder="Add description here"></textarea>
        // </div>
        // <input type="radio" name="rating-button" value="1 star">1 star<br>
        // <input type="radio" name="rating-button" value="2 stars">2 stars<br>
        // <input type="radio" name="rating-button" value="3 stars">3 stars<br>
        // <input type="radio" name="rating-button" value="4 stars">4 stars<br>
        // <input type="radio" name="rating-button" value="5 stars">5 stars<br>
    
        // <button class="js-submit-item">Submit</button>
        // </form>`;
    };
    function generateItemString(list) {
        const item = list.map((item)=> generateItemElement(item));
        return item.join('');
    };
    function expandedBookmarkItem(item){
        
        return `
        <li class="bookmark-item" data-item-id="${item.id}">
        <h2>${item.title}</h2>
        <div class="bookmark-expanded-content">
            Description: ${item.description}
            Rating:${item.rating}
            Link to this URL: ${item.url}
            <button class="delete-button" name="button">Delete</button>
        </div>
        </li>`;
    };
    function handleNewBookmarkSubmit(){
        $('#add-new-form').submit(function (event) {
            event.preventDefault();
            const newTitle = $('#title').val();
            const newDesc = $('#description').val();
            const newUrl = $('#url').val();
            const newRating = $('input[type="radio"][name="rating"]:checked').val();
      
            api.createItem(newTitle, newUrl, newDesc, newRating, function(response){
              response.expanded = false;
              store.addItem(response);
              store.toggleAddFormDisplayed();
              render();
            });
          });
    };
    function render(){
        let items = store.items;
        const listItemString = generateItemString(items);
        $('.js-bookmark-list').html(listItemString);
    };
    function handleDisplayAddForm(){
        $('.js-bookmarks-form').on('click', '.add-bookmark-button', function(){
          store.expandedBookmarkItem();
          render();
        });
      };
    function getItemIdFromElement(item) {
        return $(item)
        .closest('.bookmark-item')
        .attr('data-item-id');
        
    };
    const handleExpandItem = function(){
        $('.bookmark-list').on('click', '.bookmark-item', function(event){
          const bookmarkId = findIdFromElement(event.currentTarget);
          store.toggleExpand(bookmarkId);
          render();
        });
    };
    const handleDeleteBookmark = function(){
        $('.bookmark-list').on('click', '.delete-button', function(event){
          const bookmarkId = findIdFromElement(event.currentTarget);
          api.deleteBookmark(bookmarkId, function(){
            store.deleteBookmark(bookmarkId);
            render();
          });
        });
      };
    function bindEventListeners(){
        handleNewBookmarkSubmit();
        handleExpandItem();
        handleDeleteBookmark();
        handleDisplayAddForm();
    };
   return {
       render: render,
       bindEventListeners: bindEventListeners,
   };
}());