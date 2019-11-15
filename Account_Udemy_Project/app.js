//UI组件
let UIComponent = (() => {
    //UI节点classname
    let allDoms = {
        type: ".add__type",
        desc: ".add__description",
        amount: ".add__value",
        addBtn: ".add__btn",
        incomeWrap: ".income__list",
        expenseWrap: ".expenses__list",
        btnParent: ".container",

        incSum: ".budget__income--value",
        expSum: ".budget__expenses--value",
        summary: ".budget__value"
    }

    return {
        // 获取输入内容
        getInput() {
            return {
                type: document.querySelector(allDoms.type).value,
                desc: document.querySelector(allDoms.desc).value,
                amount: document.querySelector(allDoms.amount).value
            }
        },
        // 获取节点classname
        getAllDoms() {
            return allDoms;
        },
        //添加元素
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
        //删除元素
        deleteFromList(nodeID) {
            let itemEle = document.querySelector(`#${nodeID}`);
            itemEle.parentNode.removeChild(itemEle);
        },
        //展示概要
        displaySummary(totalInc, totalExpe, summary) {
            document.querySelector(allDoms.incSum).innerHTML = totalInc;
            document.querySelector(allDoms.expSum).innerHTML = totalExpe;
            document.querySelector(allDoms.summary).innerHTML = summary;
        },
    }
})();


//计算组件
let ComputeComponent = (() => {
    //构造函数
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
    //数据
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
        //增加项
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
        //删除项
        deleteItem(type, id) {
            let targeData, index;

            data.allItems[type].forEach((item) => {
                if (item.id == id) {
                    targeData = item;
                } else {
                    return;
                }
            })

            if (data.allItems[type].indexOf(targeData) !== -1) {
                index = data.allItems[type].indexOf(targeData);
                data.allItems[type].splice(index, 1);
            }

        },
        //计算总额
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
        calculateSum() {
            return {
                totalInc: data.totalAmount.inc,
                totalExpe: data.totalAmount.exp,
                summary: data.totalAmount.inc - data.totalAmount.exp,
            }
        },
        getData() {
            return data
        }
    }

})()


//联动组件
let linkage = ((UIComponent, ComputeComponent) => {

    let setListeners = () => {
        let doms = UIComponent.getAllDoms();
        //添加项事件
        document.querySelector(doms.addBtn).addEventListener("click", () => {
            let inputValues = UIComponent.getInput();
            let addNewItem = ComputeComponent.addItem(inputValues.type, inputValues.desc, inputValues.amount);

            ComputeComponent.calculateTotal(inputValues.type);
            UIComponent.addToList(inputValues.type, addNewItem);

            let summary = ComputeComponent.calculateSum();
            UIComponent.displaySummary(summary.totalInc, summary.totalExpe, summary.summary);

            console.log(ComputeComponent.getData());

        }, false)
        //删除项事件
        document.querySelector(doms.btnParent).addEventListener("click", (event) => {
            let target = event.target;
            if (target.nodeName.toLowerCase() === "i") {
                let nodeID = target.parentNode.parentNode.parentNode.parentNode.id;
                let id = nodeID.split("-")[1];
                let type = nodeID.split("-")[0].substring(0, 3);

                ComputeComponent.deleteItem(type, id);
                UIComponent.deleteFromList(nodeID);
                ComputeComponent.calculateTotal(type);

                let summary = ComputeComponent.calculateSum();
                UIComponent.displaySummary(summary.totalInc, summary.totalExpe, summary.summary);


                console.log(ComputeComponent.getData());
            }
        })
    }

    setListeners();

})(UIComponent, ComputeComponent)