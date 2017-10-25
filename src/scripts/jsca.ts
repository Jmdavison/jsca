/**
 * Cellular Automata in Javascript
 * with HTML5 canvas.
 * 
 * this namespace will contain classes that display 
 * multiple types of cellular automata.
 * @author Jacob Davison
 */
namespace JSCA {

    /**
     * 2D elementary automata
     */
    export class J2D {
        
        width: number;
        generation: Array<number>;
        rowCount: number;
        finished: boolean = false;
        scroll: boolean = false;
        private ruleSet: Array<number>;
        private scale: number;
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;
        private raf: any;

        constructor(ruleNumber: number, scale: number, scroll:boolean){
            
            this.scroll = scroll;
            this.scale = scale;
            this.canvas = <HTMLCanvasElement> document.querySelector("#frame");
            this.ctx = this.canvas.getContext("2d");
            console.debug(`canvas width: ${this.canvas.scrollWidth}`)
            this.canvas.width = this.canvas.scrollWidth;
            this.canvas.height = this.canvas.scrollHeight;
            
            // create ruleset
            this.createRuleSet(ruleNumber);

            // initialize first generation
            this.generation = new Array(Math.floor(this.canvas.width/this.scale));
            this.rowCount = 0;
        }

        private createRuleSet(ruleNumber: number){
            // create ruleset
            let bitString = ruleNumber.toString(2);
            let pad = "00000000";
            let result = pad.substr(bitString.length) + bitString;
            this.ruleSet = result.split("").map( s => parseInt(s)  );
        }

        /**
         * play simulation
         */
        public play(){
            this.resetBoard();
            this.generate();
        }

        public setScroll(scroll: boolean){
            this.scroll = scroll;
        }

        public saveAsPNG(){
            let dataURL = this.canvas.toDataURL();
            let downloadElem = document.createElement("a");
            downloadElem.href = dataURL;
            downloadElem.download = "automata_"+new Date().toLocaleTimeString() + ".png";
            downloadElem.click();
        }

        public config(ruleNumber: number, scale: number, scroll:boolean){
            this.scroll = scroll;
            this.scale = scale;
            this.createRuleSet(ruleNumber);
            this.generation = new Array(Math.floor(this.canvas.width/this.scale));
        }

        /**
         * resets the state of the grid
         */
        private resetBoard(){
            cancelAnimationFrame(this.raf);
            this.finished = false;
            this.rowCount = 0;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = 0; i < this.generation.length; i++){
                this.generation[i] = 0;
            }
            // set middle element as root cell
            this.generation[this.generation.length/2] = 1;
        }

        /**
         * Generates a generation based on the state of 
         * the previous generation
         */
        private generate() {
            let nextGeneration =  new Array<number>(this.generation.length);
            for(let i = 1; i < this.generation.length - 1; i++){
                let left = this.generation[i - 1];
                let center = this.generation[i];
                let right = this.generation[i + 1];
                nextGeneration[i] = this.check(left, center, right);
            }
            this.generation = nextGeneration.slice();
            this.render();
            this.rowCount++;
            if(this.finished == false){
                this.raf = window.requestAnimationFrame(()=>{
                    this.generate();
                });
            }else{
                cancelAnimationFrame(this.raf);
            }
        }

        /**
         * returns the state of a cell relative to 
         * its neighbors
         * @param left 
         * @param center 
         * @param right 
         */
        private check(left: number, center: number, right: number){
            // combine bits into a string
            let s: string = [left, center, right].join("");
            // convert bitstring to decimal
            let index: number = parseInt(s,2);
            // use result as array index
            return this.ruleSet[index];
        }

        /**
         * renders a generation of cells to the
         * canvas
         */
        private render(){
            for(let i = 0; i < this.generation.length; i++){
                if((this.scale * this.rowCount) > this.canvas.height){
                    this.finished = true;
                    let elem = <HTMLInputElement> document.querySelector("#download");
                    elem.style.display = "inline";
                }

                let color = "#581845";
                
                if(this.generation[i] == 1){
                    color="#900C3F"
                }
                this.ctx.fillStyle = color;
                this.ctx.fillRect(
                    i * this.scale,
                    this.rowCount * this.scale,
                    this.scale,
                    this.scale
                );
                if(this.scroll === true){
                    this.canvas.parentElement.scrollTop = this.rowCount*this.scale - this.canvas.parentElement.clientHeight;
                }
            }
        }
    }
}