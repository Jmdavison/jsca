/**
 * Cellular Automata in Javascript
 * with HTML5 canvas.
 *
 * this namespace will contain classes that display
 * multiple types of cellular automata.
 * @author Jacob Davison
 */
var JSCA;
(function (JSCA) {
    /**
     * 2D elementary automata
     */
    var J2D = /** @class */ (function () {
        function J2D(ruleNumber, scale, scroll) {
            this.finished = false;
            this.scroll = false;
            this.scroll = scroll;
            this.scale = scale;
            this.canvas = document.querySelector("#frame");
            this.ctx = this.canvas.getContext("2d");
            console.debug("canvas width: " + this.canvas.scrollWidth);
            this.canvas.width = this.canvas.scrollWidth;
            this.canvas.height = this.canvas.scrollHeight;
            // create ruleset
            this.createRuleSet(ruleNumber);
            // initialize first generation
            this.generation = new Array(Math.floor(this.canvas.width / this.scale));
            this.rowCount = 0;
        }
        J2D.prototype.createRuleSet = function (ruleNumber) {
            // create ruleset
            var bitString = ruleNumber.toString(2);
            var pad = "00000000";
            var result = pad.substr(bitString.length) + bitString;
            this.ruleSet = result.split("").map(function (s) { return parseInt(s); });
        };
        /**
         * play simulation
         */
        J2D.prototype.play = function () {
            this.resetBoard();
            this.generate();
        };
        J2D.prototype.setScroll = function (scroll) {
            this.scroll = scroll;
        };
        J2D.prototype.saveAsPNG = function () {
            var dataURL = this.canvas.toDataURL();
            var downloadElem = document.createElement("a");
            downloadElem.href = dataURL;
            downloadElem.download = "automata_" + new Date().toLocaleTimeString() + ".png";
            downloadElem.click();
        };
        J2D.prototype.config = function (ruleNumber, scale, scroll) {
            this.scroll = scroll;
            this.scale = scale;
            this.createRuleSet(ruleNumber);
            this.generation = new Array(Math.floor(this.canvas.width / this.scale));
        };
        /**
         * resets the state of the grid
         */
        J2D.prototype.resetBoard = function () {
            cancelAnimationFrame(this.raf);
            this.finished = false;
            this.rowCount = 0;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < this.generation.length; i++) {
                this.generation[i] = 0;
            }
            // set middle element as root cell
            this.generation[this.generation.length / 2] = 1;
        };
        /**
         * Generates a generation based on the state of
         * the previous generation
         */
        J2D.prototype.generate = function () {
            var _this = this;
            var nextGeneration = new Array(this.generation.length);
            for (var i = 1; i < this.generation.length - 1; i++) {
                var left = this.generation[i - 1];
                var center = this.generation[i];
                var right = this.generation[i + 1];
                nextGeneration[i] = this.check(left, center, right);
            }
            this.generation = nextGeneration.slice();
            this.render();
            this.rowCount++;
            if (this.finished == false) {
                this.raf = window.requestAnimationFrame(function () {
                    _this.generate();
                });
            }
            else {
                cancelAnimationFrame(this.raf);
            }
        };
        /**
         * returns the state of a cell relative to
         * its neighbors
         * @param left
         * @param center
         * @param right
         */
        J2D.prototype.check = function (left, center, right) {
            // combine bits into a string
            var s = [left, center, right].join("");
            // convert bitstring to decimal
            var index = parseInt(s, 2);
            // use result as array index
            return this.ruleSet[index];
        };
        /**
         * renders a generation of cells to the
         * canvas
         */
        J2D.prototype.render = function () {
            for (var i = 0; i < this.generation.length; i++) {
                if ((this.scale * this.rowCount) > this.canvas.height) {
                    this.finished = true;
                    var elem = document.querySelector("#download");
                    elem.style.display = "inline";
                }
                var color = "#581845";
                if (this.generation[i] == 1) {
                    color = "#900C3F";
                }
                this.ctx.fillStyle = color;
                this.ctx.fillRect(i * this.scale, this.rowCount * this.scale, this.scale, this.scale);
                if (this.scroll === true) {
                    this.canvas.parentElement.scrollTop = this.rowCount * this.scale - this.canvas.parentElement.clientHeight;
                }
            }
        };
        return J2D;
    }());
    JSCA.J2D = J2D;
})(JSCA || (JSCA = {}));
