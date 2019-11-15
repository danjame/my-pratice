let UIComponent = (() => {

    let allDoms = {
        type: ".add__type",
        desc: ".add__description",
        amount: ".add__value",
        addBtn: ".add__btn"
    }

    return {
        getInput() {
            return {
                type: document.querySelector(allDoms.type).value,
                desc: document.querySelector(allDoms.desc).value,
                amount: document.querySelector(allDoms.amount).value
            }
        },

        getAllDoms() {
            return allDoms;
        }
    }



})();



let ComputeComponent = (() => {

    function Expense(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };

    function Income(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };

    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totalAmount: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem(type, desc, value) {
            let newItem, id;

            if (data.allItems[type].length !== 0) {
                data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            if (type === "exp") {
                newItem = new Expense(id, desc, value);
            } else if (type === "inc") {
                newItem = new Income(id, desc, value);
            }

            data.allItems[type].push(newItem);
            return newItem;
        }
    }

})()



let linkage = ((UIComponent, ComputeComponent) => {

    let setListeners = () => {
        let doms = UIComponent.getAllDoms();

        document.querySelector(doms.addBtn).addEventListener("click", () => {
            let inputValues = UIComponent.getInput();
            let addNewItem = ComputeComponent.addItem(inputValues.type, inputValues.desc, inputValues.amount);
            console.log(inputValues.type);
            console.log(addNewItem);
        }, false)
    }

    setListeners();





})(UIComponent, ComputeComponent)