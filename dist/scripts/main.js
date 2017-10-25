document.addEventListener("DOMContentLoaded", function () {
    var jsca = new JSCA.J2D(1, 1, false);
    var button = document.querySelector("#restartButton");
    var scrollElem = document.querySelector("#scroll");
    document.querySelector("body").addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            button.click();
        }
    });
    document.querySelector("#scroll").addEventListener("click", function (e) {
        jsca.setScroll(scrollElem.checked);
    });
    document.querySelector("#download").addEventListener("click", function () {
        jsca.saveAsPNG();
    });
    button.addEventListener("click", function () {
        var ruleElem = document.querySelector("#ruleNumber");
        var ruleNum = parseInt(ruleElem.value);
        var sizeElem = document.querySelector("#size");
        var size = parseInt(sizeElem.value);
        var scroll = scrollElem.checked;
        jsca.config(ruleNum, size, scroll);
        var wrapper = document.querySelector("#wrapper");
        var width = wrapper.scrollWidth;
        wrapper.scrollLeft = (width / 2) - wrapper.clientWidth / 2;
        jsca.play();
    });
    button.click();
});
