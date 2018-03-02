//event listeners
const bookmarks = (function() {

    function generateItemElement(item){
        let itemTitle = `<span class="bookmark-item">${item.title}</span>`
        console.log(itemTitle);
    }
    function generateItemString(list) {
        const item = list.map((item)=> generateItemElement(item));
        return item.join('');
    }
    function handleNewBookmarkSubmit(){
        $('#add-new-form').submit(function (event) {
            event.preventDefault();
            const newBookmarkName = $("form #add-new-form :input").each(function(){
                var input = $(this);
                console.log(input.val());
               });
        });
    }
    function render(){
        let items = store.items;
        const listItemString = generateItemString(items);
        $('.js-bookmark-list').html(listItemString);
    }
    function getItemIdFromElement(item) {
        return $(item)
        
    }
    function bindEventListeners(){
        handleNewBookmarkSubmit();
    }
   return {
       render: render,
       bindEventListeners: bindEventListeners,
   };
}());