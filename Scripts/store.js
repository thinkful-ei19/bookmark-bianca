'use strict';
/* global */

//eslint-disable-next-line no-unused-vars
const store = (function() {
    const addItem = function(item) {
        this.items.push(item);
    };
    const toggleAddFormDisplayed = function(){
        this.addFormDisplayed = !this.addFormDisplayed;
    };
    const toggleExpand = function(id){
        const targetedBookmark = this.bookmarks.find(item => item.id === id);
        targetedBookmark.expanded = !targetedBookmark.expanded;
    };
    const findAndDelete = function(id){
        const item = this.items.find(item => item.id === id);
        const itemIndex = this.items.indexOf(item);
        console.log(itemIndex);
        this.item = item;
    };
    const findAndUpdate = function(id, newData){
        const item = this.items.find(item => item.id === id);
        item = newData;

    }
    return {
        items: [],
        adding: false,

        addItem,
        toggleAddFormDisplayed,
        toggleExpand,
        findAndDelete,
        findAndUpdate
    }
}());