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
        summary: ".budget__value",
        budgetPercent: ".budget__expenses--percentage",

        monthWrap: ".budget__title--month",
        percentWrap: ".item__percentage"
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
        //清除输入内容
        clearInput() {
            document.querySelector(allDoms.desc).value = "";
            document.querySelector(allDoms.amount).value = "";
        },
        // 获取节点classname
        getAllDoms() {
            return allDoms;
        },
        //添加元素
        addToList(type, newItem) {
            let parentWrap, itemHtml;
            if (type === "inc") {
                parentWrap = document.querySelector(allDoms.incomeWrap);
                itemHtml = `<div class="item clearfix" id="income-${newItem.id}">
                                <div class="item__description">${newItem.desc}</div>
                                <div class="right clearfix">
                                    <div class="item__value">${newItem.value}</div>
                                    <div class="item__delete">
                                        <button class="item__delete--btn">
                                        <i class="ion-ios-close-outline"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>`
            } else if (type === "exp") {
                parentWrap = document.querySelector(allDoms.expenseWrap);
                itemHtml = `<div class="item clearfix" id="expense-${newItem.id}">
                                <div class="item__description">${newItem.desc}</div>
                                <div class="right clearfix">
                                    <div class="item__value">${newItem.value}</div>
                                    <div class="item__percentage"></div>
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
        displaySummary(totalInc, totalExpe, summary, percent) {
            document.querySelector(allDoms.incSum).innerHTML = `+ ${totalInc}`;
            document.querySelector(allDoms.expSum).innerHTML = `- ${totalExpe}`;
            document.querySelector(allDoms.summary).innerHTML = `${summary}`;
            document.querySelector(allDoms.budgetPercent).innerHTML = `${percent}`;
        },
        //展示年月
        displayDate() {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const currentDate = new Date();
            const currentMonth = months[currentDate.getMonth()];
            const currentYear = currentDate.getFullYear();
            document.querySelector(allDoms.monthWrap).innerHTML = `${currentMonth} ${currentYear}`;
        }
    }
})();


//计算组件
let ComputeComponent = (() => {
    //构造函数
    function Income(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };

    function Expense(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };
    //数据
    let data = {
        allItems: {
            inc: [],
            exp: []
        },
        totalAmount: {
            inc: 0,
            exp: 0
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

            if (type === "inc") {
                newItem = new Income(id, desc, value);
            } else if (type === "exp") {
                newItem = new Expense(id, desc, value);
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
        calculateData(type) {
            let sum = 0;
            if (type === "inc") {
                data.allItems[type].forEach((item) => {
                    sum += Number(item.value);
                })
            } else if (type === "exp") {
                data.allItems[type].forEach((item) => {
                    sum += Number(item.value);
                })
            }
            data.totalAmount[type] = sum;
        },
        updataSum() {
            let percent, ratio;
            ratio = Math.round(data.totalAmount.exp / data.totalAmount.inc * 100);
            if (isNaN(ratio) || ratio === Infinity) {
                percent = "...";
            } else {
                percent = `${ratio}%`;
            }
            return {
                totalInc: data.totalAmount.inc,
                totalExpe: data.totalAmount.exp,
                available: data.totalAmount.inc - data.totalAmount.exp,
                percent,
            }
        },
        formatOutput(type, item) {
            let value;
            if (type == "inc") {
                value = `+ ${item.value}`
            } else if (type == "exp") {
                value = `- ${item.value}`
            }
            return {
                id: item.id,
                desc: item.desc,
                value,
            }
        },
        getData() {
            return data
        }
    }

})()


//联动组件
let linkage = ((UIComponent, ComputeComponent) => {
    let doms = UIComponent.getAllDoms();

    let updataPercent = () => {
        const data = ComputeComponent.getData();

        let percentWraps = document.querySelectorAll(doms.percentWrap);
        let percents = [];
        data.allItems.exp.forEach(item => {
            let each = Math.round(item.value / data.totalAmount.inc * 100);
            if (isNaN(each) || each === Infinity) {
                each = "...";
            } else {
                each = `${each}%`;
            }
            percents.push(each);
        });
        percents.forEach((item, index) => {
            percentWraps[index].innerHTML = item;
        })
    }

    let setListeners = () => {

        //添加项事件
        document.querySelector(doms.addBtn).addEventListener("click", () => {
            let values = UIComponent.getInput();
            if (values.amount == 0 || values.amount == "" || values.desc == "") {
                alert("Please complete the information!");
            } else {
                let newItem = ComputeComponent.addItem(values.type, values.desc, values.amount);

                ComputeComponent.calculateData(values.type);
                let formalData = ComputeComponent.formatOutput(values.type, newItem);

                UIComponent.addToList(values.type, formalData);
                updataPercent();

                let upSum = ComputeComponent.updataSum();
                UIComponent.displaySummary(upSum.totalInc, upSum.totalExpe, upSum.available, upSum.percent);
                UIComponent.clearInput();

            }


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
                ComputeComponent.calculateData(type);

                let updataSum = ComputeComponent.updataSum();
                UIComponent.displaySummary(updataSum.totalInc, updataSum.totalExpe, updataSum.summary, updataSum.percent);
                updataPercent();
            }
        })

        UIComponent.displayDate();
    }

    setListeners();

})(UIComponent, ComputeComponent)