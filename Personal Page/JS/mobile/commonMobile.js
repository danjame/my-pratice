// 头部菜单
const menu = getEle("#header #menu");
const menuList = getEle("#header div:last-child div:first-child");
const menuBars = getAll("#header #menu>span");
//头部菜单动画
menu.addEventListener("click", () => {
    if (menuList.className === "activedMenu") {
        for (let i = 0; i < menuBars.length; i++) {
            menuBars[i].className = "menuBarsOff";
        };
        menuList.className = "unactivedMenu";
        menu.className = "unclickMenu";
    } else {
        for (let i = 0; i < menuBars.length; i++) {
            menuBars[i].className = "menuBarsOn";
        };
        menuList.className = "activedMenu";
        menu.className = "clickMenu";
    }
}, false);