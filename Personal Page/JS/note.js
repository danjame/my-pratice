const titleUp = document.querySelector(".titleBox>ul>li:first-child");
const titleMid = document.querySelector(".titleBox>ul>li:nth-child(2)");
const titleDown = document.querySelector(".titleBox>ul>li:last-child");

const arrowUp = document.querySelector(".titleBox>ul>li:first-child div:last-child");
const arrowDown = document.querySelector(".titleBox>ul>li:last-child div:last-child");

const artiSelection = document.querySelector("#artiSelection");

titleUp.addEventListener("mouseover", function() {
    arrowUp.style.borderBottomColor = "#eeeeee";
}, false);

titleDown.addEventListener("mouseover", function() {
    arrowDown.style.borderTopColor = "#eeeeee";
}, false);

titleUp.addEventListener("mouseout", function() {
    arrowUp.style.borderBottomColor = "white";
}, false);

titleDown.addEventListener("mouseout", function() {
    arrowDown.style.borderTopColor = "white";
}, false);

titleMid.addEventListener("mouseover", function() {
    artiSelection.style.display = "block";
}, false);

titleMid.addEventListener("mouseout", function() {
    artiSelection.style.display = "none";
}, false);

artiSelection.addEventListener("mouseover", function() {
    artiSelection.style.display = "block";
}, false);

artiSelection.addEventListener("mouseout", function() {
    artiSelection.style.display = "none";
}, false);