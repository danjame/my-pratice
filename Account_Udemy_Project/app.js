let UIComponent = (() => {

    let allDoms = {
        type: ".add__type",
        desc: ".add__description",
        amount: ".add__value",
        addBtn: ".add__btn",
        incomeWrap: ".income__list",
        expenseWrap: ".expenses__list",
        btnParent: ".container"
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
        },
        addToList(type, newItem) {
            let parentWrap, itemHtml;

            if (type === "exp") {
                parentWrap = document.querySelector(allDoms.expenseWrap);
                itemHtml = `<div class="item clearfix" id="expense-${newItem.id}">
                                <div class="item__description">${newItem.desc}</div>
                                <div class="right clearfix">
                                    <div class="item__value">- ${newItem.value}</div>
                                    <div class="item__percentage">21%</div>
                                    <div class="item__delete">
                                        <button class="item__delete--btn">
                                        <i class="ion-ios-close-outline"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>`
            } else if (type === "inc") {
                parentWrap = document.querySelector(allDoms.incomeWrap);
                itemHtml = `<div class="item clearfix" id="income-${newItem.id}">
                                <div class="item__description">${newItem.desc}</div>
                                <div class="right clearfix">
                                    <div class="item__value">+ ${newItem.value}</div>
                                    <div class="item__delete">
                                        <button class="item__delete--btn">
                                        <i class="ion-ios-close-outline"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>`
            };
            parentWrap.insertAdjacentHTML("beforeend", itemHtml);
        },
        deleteFromList(node){
            let itemNode = document.querySelector(node);
            itemNode.parentNode.removeChild(itemNode);
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
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
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
        },

        deleteItem(type, id){
            let targeData, index;

            data.allItems[type].forEach((item)=>{
                if (item.id == id){
                    targeData = item;
                }else{
                    return;
                }
            })

            if(data.allItems[type].indexOf(targeData)!==-1){
                index = data.allItems[type].indexOf(targeData);
                data.allItems[type].splice(index, 1);
            }

        },

        calculateTotal(type) {
            let sum = 0;
            if (type === "exp") {
                data.allItems[type].forEach((item) => {
                    sum += parseInt(item.value);
                })
            } else if (type === "inc") {
                data.allItems[type].forEach((item) => {
                    sum += parseInt(item.value);
                })
            }
            data.totalAmount[type] = sum;
        },
    }

})()



let linkage = ((UIComponent, ComputeComponent) => {

    let setListeners = () => {
        let doms = UIComponent.getAllDoms();

        document.querySelector(doms.addBtn).addEventListener("click", () => {
            let inputValues = UIComponent.getInput();
            let addNewItem = ComputeComponent.addItem(inputValues.type, inputValues.desc, inputValues.amount);
            
            ComputeComponent.calculateTotal(inputValues.type);
            UIComponent.addToList(inputValues.type, addNewItem);

        }, false)

        document.querySelector(doms.btnParent).addEventListener("click", (event)=>{
            let target = event.target;
            // console.log(target);
            if(target.nodeName.toLowerCase() == 'i'){
                console.log(target);
            }
        })
    }



    setListeners();





})(UIComponent, ComputeComponent)