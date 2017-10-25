document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector("restartButton");
    var jsca = new JSCA.J2D(30);
    button.addEventListener("pointerdown", function () {
        jsca.play();
    });
});
