
'use strict';
/* global store, api */
const bookmarks = (function () {

    const listItem = function(item) {
    
        const star = `<span class="fa fa-star checked"></span>`;
        let starString = '';
        for (let i=0; i<item.rating; i++) {
            starString += star;
        }
        return `
        <li class="simple"id="${item.id}">
            <div class="edit-details">
                <h3>${item.title}</h3>
                <button class="show-details">Show Details</button>
                <p class="rating${item.rating}">${starString}</p>
            </div>
        </li>
        `
    }

    
    const generateHtml = function(bookmarks=store.bookmarks) {
        let items = bookmarks.map((item) => listItem(item));
        return items.join('');
    }

    const detailedView = function() {
        const detailedListItem = function(item) {
            const star = `<span class="fa fa-star checked"></span>`;
            let starString = '';
            for (let i=0; i<item.rating; i++) {
                starString += star;
            }
            return `
            <div class="edit-details">
                <h3>${item.title}</h3>
                <p class="rating${item.rating}">${starString}</p>
            </div>
            <div class="edit-details">
                <span id="change-rating-span">Change Rating
                <select id="change-rating">
                    <option></option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
                </span>
                <button class="visit-url"><a href="${item.url}" target="_blank">Visit Page</a></button>
                <button class="delete-item">Delete</button>
                <button class="show-details">Close</button>
                
            </div>
            <div class="edit-item-desc">
                <span class="item-description">${item.desc}</span>
                <br>
                <button class="item-description-button">Edit Description</button>
         
            </div>
            `
        }
        const simpleListItem = function(item) {
            const star = `<span class="fa fa-star checked"></span>`;
            let starString = '';
            for (let i=0; i<item.rating; i++) {
                starString += star;
            }
            return `
            <div class="edit-details">
                <h3>${item.title}</h3>
                <button class="show-details">Show Details</button>
                <p class="rating${item.rating}">${starString}</p>
            </div>
            `
        }
        $('ul').on('click', '.show-details', function() {
            let bookmark = store.findById(this.closest('li').id);
            let htmlString = simpleListItem(bookmark);
            if ($(this).closest('li').hasClass('simple')) {
                $(this).closest('li').removeClass('simple');
                htmlString = detailedListItem(bookmark);
            } else {
                $(this).closest('li').addClass('simple');
            }
            $(this).closest('li').html(htmlString);
        })
    }

    const deleteBookmark = function() {
        $('ul').on('click', '.delete-item', function() {
            let bookmarkId = store.findById(this.closest('li').id).id;
            api.deleteBookmark(bookmarkId, ()=>{
                store.bookmarks = store.bookmarks.filter((bookmark) => bookmark.id !== bookmarkId);
                render();
            })
            
        })
    }

    const sort = function() {
        $('#rating').on('change', function(){
            let rating = document.getElementById('rating');
            let selectedRating = rating.options[rating.selectedIndex].value;
            let tempArray = store.bookmarks.filter((bookmark) => (bookmark.rating >= selectedRating))
            let htmlString = generateHtml(tempArray);
            $('.results').html(htmlString);
        })
    }

    const render = function() {
        let htmlString = generateHtml();
        $('.results').html(htmlString);
    }
    const displayForm = function() {
        $('.display-add-bookmark').on('click', function() {
        if ($('.add-new-item').hasClass('hidden') === true) {
            $('.add-new-item').removeClass('hidden');
        } else {
            $('.add-new-item').addClass('hidden');
        }   
        })
    }

    const submitBookmark = function() {
        $('#add-new-form').on('submit', function(e) {
            $('.add-new-item').addClass('hidden');
            event.preventDefault();
            let rating = document.getElementById('form-rating');
            let selectedRating = rating.options[rating.selectedIndex].value;

            const newBookmark = {
                id: cuid(),
                title: $('#title').val(),
                url: $('#link').val(),
                rating: selectedRating,
                desc: $('#description').val()
            }

            $('#title').val('');
            $('#link').val('');
            $('#description').val('');
            api.createBookmark(newBookmark, function() {
                console.log('pushed into store');
            });
            setTimeout(function(){
                api.getBookmarks((bookmarks) => {
                    store.bookmarks = [];
                    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
                    render();
                });
            }, 1000)
        })
    }

    const changeRating = function() {
        $('ul').on('change', '#change-rating', function() {
            let rating = document.getElementById('change-rating');
            let selectedRating = rating.options[rating.selectedIndex].value;
            let bookmarkId = store.findById(this.closest('li').id).id;
            api.updateBookmark(bookmarkId, {rating: selectedRating}, function() {
            });
            setTimeout(function(){
                api.getBookmarks((bookmarks) => {
                    store.bookmarks = [];
                    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
                    render();
                });
            }, 500)
        })
    }

    const changeDesc = function() {
        $('ul').on('click', '.item-description-button', function() {
                const placeholder = $(this).siblings('.item-description').text();
                $(this).siblings('.item-description').html(`<textarea class="desc-edit">${placeholder}</textarea><br>
                <button class="submit-changes">Submit Changes</button>`)
                $(this).addClass('hidden');
        })
        $('ul').on('click', '.submit-changes', function() {
            let newDesc = $('.desc-edit').val();
            let bookmarkId = store.findById(this.closest('li').id).id;
            api.updateBookmark(bookmarkId, {desc: newDesc}, function() {
                console.log('updated callback');
            });
            setTimeout(function(){
                api.getBookmarks((bookmarks) => {
                    store.bookmarks = [];
                    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
                    render();
                });
            }, 1000)
        })
    }

    const handleApp = function() {
        displayForm();
        submitBookmark();
        detailedView();
        deleteBookmark();
        sort();
        changeDesc();
        changeRating();
        render();
    }

    return {
         handleApp, 

        render
    }
})();