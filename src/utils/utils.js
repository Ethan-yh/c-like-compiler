class Err{
    constructor(errType, errMsg, lineNum=-1){
        this.errType = errType;
        this.errMsg = errMsg;
        this.lineNum = lineNum;
    }
}

let t = new Err(1, 'err');
console.log(t);