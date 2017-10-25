var JSCA;
(function (JSCA) {
    /**
     * This class will demostrate wolfram
     * automata using the HTML5 canvas
     */
    var J2D = /** @class */ (function () {
        function J2D(ruleNumber) {
            this.scale = 20;
            // create canvas
            this.canvas = new HTMLCanvasElement();
            this.canvas.width = 1200;
            this.canvas.height = 800;
            this.ctx = this.canvas.getContext("2d");
            document.querySelector("body").appendChild(this.canvas);
            console.debug("canvas width: " + this.canvas.width);
            // create ruleset
            var bitString = ruleNumber.toString(2);
            console.log(bitString);
            this.ruleSet = bitString.split("").map(function (s) { return parseInt(s); });
            // initialize first generation
            this.generation = [this.canvas.width / this.scale];
            this.rowCount = 0;
        }
        J2D.prototype.play = function () {
            this.resetBoard();
            this.generate();
        };
        J2D.prototype.resetBoard = function () {
            for (var i = 0; i < this.generation.length; i++) {
                this.generation[i] = 0;
            }
            // set middle element as root cell
            this.generation[this.generation.length / 2] = 1;
        };
        J2D.prototype.generate = function () {
            var nextGeneration = [this.generation.length];
            for (var i = 1; i < this.generation.length - 1; i++) {
                var left = this.generation[i - 1];
                var center = this.generation[i];
                var right = this.generation[i + 1];
                nextGeneration[i] = this.check(left, center, right);
            }
            this.generation = nextGeneration;
            this.rowCount++;
        };
        J2D.prototype.check = function (left, center, right) {
            var s = [left, center, right].join("");
            // gets decimal value
            var index = parseInt(s, 2);
            return this.ruleSet[index];
        };
        J2D.prototype.render = function () {
            for (var i = 0; i < this.generation.length; i++) {
                var color = (this.generation[i] == 1) ? "255" : "0";
                this.ctx.beginPath();
                this.ctx.arc(i * this.scale, this.rowCount * this.scale, this.scale, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
        };
        return J2D;
    }());
    JSCA.J2D = J2D;
})(JSCA || (JSCA = {}));
