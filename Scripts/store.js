

const store = (function() {
    const addItem = function(item) {
        this.items.push(item);
    };
    const findAndDelete = function(id){
        const item = this.items.find(item => item.id === id);
        const itemIndex = this.items.indexOf(item);
        console.log(itemIndex);
    };
    const findAndUpdate = function(id, newData){
        const item = this.items.find(item => item.id === id);
        item = newData;

    }
    return {
        items: [],
        adding: false,

        addItem,
        findAndDelete,
        findAndUpdate
    }
}());