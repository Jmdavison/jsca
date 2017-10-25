document.addEventListener("DOMContentLoaded", function(){

    let jsca: JSCA.J2D = new JSCA.J2D(1,1,false);

    let button = <HTMLElement> document.querySelector("#restartButton");
    let scrollElem = <HTMLInputElement> document.querySelector("#scroll");

    document.querySelector("body").addEventListener("keydown", function(e){
        if(e.keyCode == 13){
            button.click();
        }
    });

    document.querySelector("#scroll").addEventListener("click", function(e){
        jsca.setScroll(scrollElem.checked);
    });

    document.querySelector("#download").addEventListener("click", function(){
        jsca.saveAsPNG();
    });

    button.addEventListener("click", function(){

        let ruleElem = <HTMLInputElement> document.querySelector("#ruleNumber");
        let ruleNum = parseInt(ruleElem.value);
        let sizeElem = <HTMLInputElement> document.querySelector("#size");
        let size = parseInt(sizeElem.value);
        let scroll = scrollElem.checked;
        jsca.config(ruleNum, size, scroll);

        let wrapper = document.querySelector("#wrapper");
        let width = wrapper.scrollWidth;
        wrapper.scrollLeft = (width/2) - wrapper.clientWidth / 2;

        jsca.play();

    });
    button.click();
});