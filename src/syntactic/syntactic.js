
class Syntactic {
    constructor(productionsLines) {
        this.productionsLines = productionsLines;
        this.productions = [];
        this.firstSet = {};
        this.followSet = {};
    }

    /**
     * @function 判断是否是终结符
     * @param {string}symbol
     * @return bool
     */
    isTerminalSymbol(symbol) {
        if (symbol.length == 0) {
            return true;
        }
        if (symbol[0] >= 'A' && symbol[0] <= 'Z') {
            // console.log(symbol);
            // console.log('不是终结符')

            return false;
        }
        // console.log('是终结符')
        return true;
    }

    /**
     * @function 产生产生式
     * @param
     * @return promise
     */
    genProductions() {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.productionsLines.length; i++) {
                const line = this.productionsLines[i];
                if (line.length <= 0) {
                    continue;
                }
                const leftPos = line.search('->');

                // 没有->，则直接返回
                if (leftPos < 0) {
                    // console.log('error,某行产生式没有->');
                    return reject(`产生式错误,第${i}行产生式没有->符号`);

                }
                // console.log(leftPos);
                const left = line.substring(0, leftPos);
                // console.log(left);


                // 产生式右边部分
                const lineRightPart = line.substring(leftPos + 2);
                // console.log(lineRightPart);
                const rightsStr = lineRightPart.split('|');

                rightsStr.forEach(rightStr => {
                    const right = rightStr.split(' ');
                    this.productions.push({
                        left: left,
                        right: right
                    });
                });

            }
            return resolve();
        });
    }
    /**
     * @function 产生First集合
     * @param
     * @return promise
     */
    genFirstSet() {
        this.productions.forEach(production => {
            const left = production.left;
            if(!this.firstSet[left]){
                this.firstSet[left] = [];
            }
            if(production.right.indexOf('$')>=0){
                this.firstSet[left].push('$');
            }
        });
        while (true) {
            let isChange = false;
            for (let i = 0; i < this.productions.length; i++) {
                const production = this.productions[i];
                const left = production.left;
                for (let j = 0; j < production.right.length; j++) {
                    const rightSymbol = production.right[j];

                    if(rightSymbol == '$'){
                        break;
                    }

                    // 终结符情况
                    if (this.isTerminalSymbol(rightSymbol)) {
                        if (this.firstSet[left].indexOf(rightSymbol) < 0) {
                            this.firstSet[left].push(rightSymbol);
                            isChange = true;
                        }
                        break;
                    }

                    // 非终结符情况
                    for (let k = 0; k < this.firstSet[rightSymbol].length; k++) {
                        const rightProSymbol = this.firstSet[rightSymbol][k];
                        if (rightProSymbol != '$' && this.firstSet[left].indexOf(rightProSymbol) < 0) {
                            this.firstSet[left].push(rightProSymbol);
                            isChange = true;
                        }
                    }

                    if(this.firstSet[rightSymbol].indexOf('$')<0){
                        break;
                    }

                    if(j+1 == production.right.length && this.firstSet[left].indexOf('$')<0){
                        this.firstSet[left].push('$');
                        isChange = true;
                    }

                }
            }
            if (!isChange) {
                break;
            }
        }
    }

    /**
     * @function 产生连续符号的First集合
     * @param {array}symbols
     * @return {array}first集合
     */
    genSymbolsFirstSet(symbols){
        let firstSet = [];

        for(let i = 0;i<symbols.length;i++){
            const symbol = symbols[i];

            // 若是终结符，则加入first集合后直接结束
            if(this.isTerminalSymbol(symbol)){
                firstSet.push(symbol);
                break;
            }

            for(let j=0;j<this.firstSet[symbol].length;j++){
                const firstSymbol = this.firstSet[symbol][j];
                if(firstSymbol!='$' && firstSet.indexOf(firstSymbol)<0){
                    firstSet.push(firstSymbol);
                }
            }

            // 当前符号的first集合没有$，则结束
            if(this.firstSet[symbol].indexOf('$')<0){
                break;
            }

            if(i+1==symbols.length && firstSet.indexOf('$')<0){
                firstSet.push('$');
            }
        }
        return firstSet;
    }

    /**
     * @function 产生Follow集合
     * @param
     * @return 
     */
    genFollowSet(){
        this.productions.forEach(production => {
            const left = production.left;
            if(!this.followSet[left]){
                this.followSet[left] = [];
            }
        });
        this.followSet[this.productions[0].left].push('#');

        while(true){
            let isChange = false;
            for(let i = 0;i<this.productions.length;i++){
                const production = this.productions[i];
                const left = production.left;
                for(let j = 0;j<production.right.length;j++){
                    const rightSymbol = production.right[j];
                    
                    // 终结符直接跳过
                    if(this.isTerminalSymbol(rightSymbol)){
                        continue;
                    }

                    // 求当前符号右侧符号串的first集合，满足要求则加入到follow集合中
                    const symbolsFirstSet = this.genSymbolsFirstSet(production.right.slice(j+1));
                    for(let k =0;k<symbolsFirstSet.length;k++){
                        if(symbolsFirstSet[k]!='$' && this.followSet[rightSymbol].indexOf(symbolsFirstSet[k])<0){
                            this.followSet[rightSymbol].push(symbolsFirstSet[k]);
                            isChange = true;
                        }
                    }

                    // 当前符号右侧符号串的first集合为空或含$，则将产生式左部的follow集合加入到当前符号follow集合中
                    if(symbolsFirstSet.length <= 0 || symbolsFirstSet.indexOf('$') >=0){
                        for(let k = 0;k<this.followSet[left].length;k++){
                            
                            if(this.followSet[rightSymbol].indexOf(this.followSet[left][k])<0){
                                this.followSet[rightSymbol].push(this.followSet[left][k]);
                                isChange = true;
                            }
                        }
                    }






                }
            }
            if(!isChange){
                break;
            }
        }
    }
}



// var s = new Syntactic('123\t\n3243\ndf')
// s.genProductions()

module.exports = Syntactic;






