//UI组件
let View = (() => {
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
    };

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
            document.querySelector(allDoms.incSum).innerHTML = totalInc;
            document.querySelector(allDoms.expSum).innerHTML = totalExpe;
            document.querySelector(allDoms.summary).innerHTML = summary;
            document.querySelector(allDoms.budgetPercent).innerHTML = percent;
        },
        //展示年月
        displayDate() {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const currentDate = new Date();
            const currentMonth = months[currentDate.getMonth()];
            const currentYear = currentDate.getFullYear();
            document.querySelector(allDoms.monthWrap).innerHTML = `${currentMonth} ${currentYear}`;
        },
        //改变输入框和按钮样式
        switchInputStyle() {
            const inputDoms = document.querySelectorAll(`${allDoms.type}, ${allDoms.desc}, ${allDoms.amount}`);
            const btnDom = document.querySelector(allDoms.addBtn);
            inputDoms.forEach(item => item.classList.toggle("red-focus"));
            btnDom.classList.toggle("red");
        },
    }
})();


//计算组件
let Model = (() => {
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
            if (!data.allItems[type].length) {
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
        //更新可用余额
        updataSum() {
            let percent, ratio;
            ratio = Math.round(data.totalAmount.exp / data.totalAmount.inc * 100);
            if (isNaN(ratio) || ratio === Infinity) {
                percent = "...";
            } else {
                percent = `${ratio}%`;
            }
            return {
                totalInc: `+ ${data.totalAmount.inc}`,
                totalExpe: `- ${data.totalAmount.exp}`,
                available: (data.totalAmount.inc - data.totalAmount.exp).toFixed(2),
                percent,
            }
        },
        //格式化输出数字
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
})();


//联动组件
let Controller = ((View, Model) => {
    let doms = View.getAllDoms();

    let updataPercent = () => {
        const data = Model.getData();
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
    };

    let commonMethods = () => {
        updataPercent();
        let upSum = Model.updataSum();
        View.displaySummary(upSum.totalInc, upSum.totalExpe, upSum.available, upSum.percent);
    };

    let paramsForDelete = (target) => {
        const nodeID = target.parentNode.parentNode.parentNode.parentNode.id;
        return {
            nodeID,
            id: nodeID.split("-")[1],
            type: nodeID.split("-")[0].substring(0, 3)
        }
    };

    let setListeners = () => {
        //添加项事件
        document.querySelector(doms.addBtn).addEventListener("click", () => {
            //获取输入框的值
            let values = View.getInput();
            if (!values.amount && !values.desc) {
                alert("Please complete the information!");
            } else {
                let newItem = Model.addItem(values.type, values.desc, values.amount);
                //数据计算
                Model.calculateData(values.type);
                //格式数据
                let formalData = Model.formatOutput(values.type, newItem);
                //添加项UI
                View.addToList(values.type, formalData);
                //清除输入框
                View.clearInput();
                commonMethods();
            }
        }, false)
        //删除项事件
        document.querySelector(doms.btnParent).addEventListener("click", (event) => {
            let target = event.target;
            if (target.nodeName.toLowerCase() === "i") {
                let params = paramsForDelete(target);
                //删除项数据
                Model.deleteItem(params.type, params.id);
                //删除项UI
                View.deleteFromList(params.nodeID);
                //数据计算
                Model.calculateData(params.type);
                commonMethods();
            }
        })
        //输入框和确定键style变换
        document.querySelector(doms.type).addEventListener("change", View.switchInputStyle, false)
    };

    return {
        init() {
            console.log("Success!")
            View.displayDate();
            setListeners();
        }
    }
})(View, Model);

Controller.init();