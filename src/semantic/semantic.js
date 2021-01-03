const {SymbolTableItem, SymbolTable} = require('./SymbolTable')


// ast结点
class Program {
    constructor(loc, body = []) {
        this.type = 'Program';
        this.loc = loc;
        this.body = body;
    }
}

class VariableDeclaration {
    constructor(loc, id = '', kind = 'int') {
        this.type = 'VariableDeclaration';
        this.loc = loc;
        this.id = id;
        this.kind = kind;
        this.params
    }
}

class FunctionDeclaration {
    constructor(loc, id = {}, kind, params = [], body = []) {
        this.type = 'FunctionDeclaration';
        this.loc = loc;
        this.id = id;
        this.kind = kind;
        this.params = params;
        this.body = body;
    }
}

class BlockStatement {
    constructor(loc, body = []) {
        this.type = 'BlockStatement';
        this.loc = loc;
        this.body = body;
    }
}

class Param {
    constructor(loc, id = {}, kind) {
        this.type = 'Identifier';
        this.loc = loc;
        this.id = id;
        this.kind = kind;
    }
}

class Identifier {
    constructor(loc, name = '') {
        this.type = 'Identifier';
        this.loc = loc;
        this.name = name;
    }
}

class ExpressionStatement {
    constructor(loc, expression) {
        this.type = 'ExpressionStatement';
        this.loc = loc;
        this.expression = expression;
    }
}


class AssignStatement {
    constructor(loc, left, right) {
        this.type = 'AssignStatement';
        this.loc = loc;
        this.operator = '=';
        this.left = left;
        this.right = right;
    }
}

class IfStatement {
    constructor(loc, test, consequent, alternate) {
        this.type = 'IfStatement';
        this.loc = loc;
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }
}

class WhileStatement {
    constructor(loc, test, body) {
        this.type = 'WhileStatement';
        this.loc = loc;
        this.test = test;
        this.body = body;
    }
}

class ReturnStatement {
    constructor(loc, argument) {
        this.type = 'ReturnStatement';
        this.loc = loc;
        this.argument = argument;
    }
}

class BinaryExpression {
    constructor(loc, left, opetator, right) {
        this.type = 'BinaryExpression';
        this.loc = loc;
        this.left = left;
        this.operator = opetator;
        this.right = right;

    }
}

class CallExpression {
    constructor(loc, callee, args = []) {
        this.type = 'CallExpression';
        this.loc = loc;
        this.callee = callee;
        this.args = args;
    }
}

class Literal {
    constructor(loc, value) {
        this.type = 'Literal';
        this.loc = loc;
        this.value = value;
    }
}





// 四元式
class Quadruple {
    constructor(op, arg1, arg2, result,) {
        this.op = op;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.result = result;

    }
}

class Semantic {
    constructor() {
        this.symbolTables = [];
        this.symbolTables.push(new SymbolTable(-1, [], '全局变量表'));

        // 记录当前符号表
        this.display = [];
        this.display.push(0);

        this.quadruples = [];

        // 第一句跳到main函数，待回填
        this.quadruples.push(new Quadruple('j', '-', '-', '-'));

        this.tempNum = 0;

        this.lastID = null;
        this.funcID = null;

        this.lastTablePointer = null;
    }

    // searchSymbolTable(name){
    //     for(let i = this.display.length-1;i>=0;i--){
    //         const displayItem = this.display[i];
    //         let pos = displayItem;
    //         do{
    //             if(this.symbolTable[pos].name == name){
    //                 return true;
    //             }
    //         }while(this.symbolTable[pos].next);
    //         return false;
    //     }
    // }
    // searchSymbolTableSamelevel(name){

    //     const displayItem = this.display[this.display.length-1];
    //     let pos = displayItem;
    //     do{
    //         if(this.symbolTable[pos].name == name){
    //             return true;
    //         }
    //     }while(this.symbolTable[pos].next);
    //     return false;
    // }
    newTemp(){
        let temp = 'T'+this.tempNum;
        this.tempNum++;
        return temp;
    }

    insertSymbol(symbolTableItem){
        let tablePointer = this.display[this.display.length-1];
        const table = this.symbolTables[tablePointer];
        table.insert(symbolTableItem);
    }
    searchSymbol(name, type, order = 0){
        let tablePointer = this.display[this.display.length-1];
        while(tablePointer>=0){
            const table = this.symbolTables[tablePointer];
            const item = table.find(name, type, order);
            if(item){
                return item;
            }
            tablePointer = this.symbolTables[tablePointer].previous;
        }
        return null;
    }

    searchSymbolOneLevel(name, type){
        let tablePointer = this.display[this.display.length-1];
        const table = this.symbolTables[tablePointer];
        const item = table.find(name, type);
        if(item){
            return item;
        }
        return null;
    }

    searchSymbolLast(type){
        let tablePointer = this.display[this.display.length-1];
        const table = this.symbolTables[tablePointer];
        const item = table.findLastOne(type);
        return item;
    }



    startAnalize(left, rightNum, symbols) {
        if(left == 'Program' && rightNum == 0){
            const loc = getLoc(symbols);
            const body = symbols[0].nodes;
        
            let symbol = {};
            symbol.loc = loc;
        
            symbol.node = new Program(loc, body);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Declarations' && rightNum == 0){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
        
            symbol.nodes = [];
            symbol.nodes.push(symbols[0].node);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Declarations' && rightNum == 1){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
        
            symbol.nodes = [];
            symbol.nodes.push(symbols[0].node);
            symbols[1].nodes.forEach(n => {
                symbol.nodes.push(n);
            });
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Declaration'){
            const loc = getLoc(symbols);


            let symbol = {};
            symbol.loc = loc;
    
            symbol.node = symbols[0].node;
    
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'VariableDeclaration' && rightNum == 0){
            const loc = getLoc(symbols);
            const id = symbols[1].node;
            const kind = symbols[0].value;
        
            let symbol = {};
            symbol.loc = loc;
        
            symbol.node = new VariableDeclaration(loc, id, kind);
            
            // 语义动作
            if(this.searchSymbolOneLevel(symbols[1].node.name, 'variable')){
                return {
                    isSucc:false,
                    msg:`重复声明变量${symbols[1].node.name}`,
                    errWord:{type:'identifier', value:symbols[1].node.name, loc:symbols[1].loc}
                }
            }
            const stItem = new SymbolTableItem(symbols[1].node.name);
            this.insertSymbol(stItem);

            
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'FunctionDeclaration'){
            const loc = getLoc(symbols);
            const id = symbols[1].node;
            const kind = symbols[0].value;
            const params = symbols[4].nodes;
            const body = symbols[6].node;
    
    
            let symbol = {};
            symbol.loc = loc;
    
    
            symbol.node = new FunctionDeclaration(loc, id, kind, params, body);
            
            // 语义动作
            if(this.searchSymbolOneLevel(symbols[1].node.name, 'function')){
                return {
                    isSucc:false,
                    msg:`重复声明函数${symbols[1].node.name}`,
                    errWord:{type:'identifier', value:symbols[1].node.name, loc:symbols[1].loc}
                }
            }
            if(symbols[1].node.name=='main'){
                this.quadruples[0].result = symbols[2].quad;
            }
            const MQuadruple = this.quadruples[symbols[2].quad];
            MQuadruple.op = symbols[1].node.name;
            const stItem = new SymbolTableItem(symbols[1].node.name, 'function');
            this.insertSymbol(stItem);

            // 回填符号表名字
            const table = this.symbolTables[this.lastTablePointer];
            table.name = symbols[1].node.name+'函数符号表';

            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'M_Func' && rightNum == 0){

            let symbol = {};
            
            this.funcID = this.lastID;
            symbol.quad = this.quadruples.length;
            const newQuadruple = new Quadruple('-', '-', '-', '-');
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'FormalParamList' && rightNum == 0){
            const loc = getLoc(symbols);


            let symbol = {};
            symbol.loc = loc;
        
            symbol.nodes = [];
            symbols[0].nodes.forEach(n => {
                symbol.nodes.push(n);
            });
            
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'FormalParamList' && rightNum == 1){
            const loc = getLoc(symbols);


            let symbol = {};
            symbol.loc = loc;
        
            symbol.nodes = [];
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'FormalParams' && rightNum == 0){
            const loc = getLoc(symbols);


            let symbol = {};
            symbol.loc = loc;
        
            symbol.nodes = [];
            symbol.nodes.push(symbols[0].node);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'FormalParams' && rightNum == 1){
            const loc = getLoc(symbols);


            let symbol = {};
            symbol.loc = loc;
        
            symbol.nodes = [];
            symbol.nodes.push(symbols[0].node);
        
            symbols[2].nodes.forEach(n => {
                symbol.nodes.push(n);
            });
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Param' && rightNum == 0){
            const loc = getLoc(symbols);
            const id = symbols[1].node
            const kind = symbols[0].value;
        
            let symbol = {};
            symbol.loc = loc;
            symbol.node = new Param(loc, id, kind);

            // 语义动作
            const stItem = new SymbolTableItem(symbols[1].node.name, 'variable');
            this.insertSymbol(stItem);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'BlockStatement' && rightNum == 0){
            symbols[0].loc = symbols[1].loc;
            symbols[symbols.length-1].loc = symbols[symbols.length-2].loc;
            const loc = getLoc(symbols);
            const body = [];

            for (let i = 0; i < symbols[2].nodes.length; i++) {
                body.push(symbols[2].nodes[i]);
            }
            for (let i = 0; i < symbols[3].nodes.length; i++) {
                body.push(symbols[3].nodes[i]);
            }
        
            let symbol = {};
            symbol.loc = loc;
            symbol.node = new BlockStatement(loc, body);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'BlockStatement' && rightNum == 1){
            symbols[0].loc = symbols[1].loc;
            symbols[symbols.length-1].loc = symbols[symbols.length-2].loc;

            const loc = getLoc(symbols);
            const body = [];
            for (let i = 0; i < symbols[2].nodes.length; i++) {
                body.push(symbols[2].nodes[i]);
            }
        
            let symbol = {};
            symbol.loc = loc;
            symbol.node = new BlockStatement(loc, body);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'M1_Block' && rightNum == 0){

            let symbol = {};

            const previous = this.display[this.display.length-1];
            let newTable = new SymbolTable(previous);
            this.symbolTables.push(newTable);
            this.display.push(this.symbolTables.length-1);

        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'M2_Block' && rightNum == 0){

            let symbol = {};

            this.lastTablePointer = this.display.pop();
            
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'VariableDeclarations' && rightNum == 0){
            const loc = getLoc(symbols);


            let symbol = {};
            symbol.loc = loc;
            symbol.nodes = [];
            symbol.nodes.push(symbols[0].node);
        
            return {isSucc:true, symbol:symbol};
        }
        
        else if(left == 'VariableDeclarations' && rightNum == 1){
            const loc = getLoc(symbols);


            let symbol = {};
            symbol.loc = loc;
            symbol.nodes = [symbols[0].node];
        
            symbols[1].nodes.forEach(n => {
                symbol.nodes.push(n);
            });
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ExpressionStatements' && rightNum == 0){
            const loc = getLoc(symbols);


            let symbol = {};
            symbol.loc = loc;
            symbol.nodes = [];
            symbol.nodes.push(symbols[0].node);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ExpressionStatements' && rightNum == 1){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.nodes = [symbols[0].node];
            symbols[1].nodes.forEach(n => {
                symbol.nodes.push(n);
            });
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ExpressionStatement'){
            const loc = getLoc(symbols);
            const expression = symbols[0].node;
    
            let symbol = {};
            symbol.loc = loc;
            symbol.node = new ExpressionStatement(loc, expression);
    
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'AssignStatement' && rightNum == 0){
            const loc = getLoc(symbols);
            const left = symbols[0].node;
            const right = symbols[2].node;
        
            let symbol = {};
            symbol.loc = loc;
            symbol.node = new AssignStatement(loc, left, right);

            // 语义分析
            const searchSymbol = this.searchSymbol(symbols[0].node.name, 'variable');
            if(!searchSymbol){
                console.log(`未声明变量${symbols[0].node.name}`)
                return {
                    isSucc:false,
                    msg:`未声明变量${symbols[0].node.name}`,
                    errWord:{type:'identifier', value:symbols[0].node.name, loc:symbols[0].loc}
                }
            }
            const newQuadruple = new Quadruple(':=', symbols[2].place, '-', symbols[0].node.name);
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ReturnStatement' && rightNum == 0){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = new ReturnStatement(loc, null);

            // 语义分析
            // const funcName;
            // const item = this.searchSymbolLast('function');
            const newQuadruple = new Quadruple('return', '-', '-', this.funcID);
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ReturnStatement' && rightNum == 1){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = new ReturnStatement(loc, symbols[1].node);

            // 语义分析
            // const funcName;
            // const item = this.searchSymbolLast('function');
            let newQuadruple = new Quadruple(':=', symbols[1].place, '-', `${this.funcID}-Rtn`);
            this.quadruples.push(newQuadruple);

            newQuadruple = new Quadruple('return', '-', '-', this.funcID);
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'WhileStatement' && rightNum == 0){
            const loc = getLoc(symbols);
            const test = symbols[3].node;

            const body = symbols[6].node;
        
            let symbol = {};
            symbol.loc = loc;
            symbol.node = new WhileStatement(loc, test, body);

            const newQuadruple = new Quadruple('j', '-', '-', symbols[1].quad);
            this.quadruples.push(newQuadruple);

            let M2Quadruple = this.quadruples[symbols[5].quad];
            M2Quadruple.arg1 = symbols[3].place;
            M2Quadruple.result = this.quadruples.length;

            // 回填符号表名字
            const table = this.symbolTables[this.lastTablePointer];
            table.name = 'While语句块符号表';
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'M1_While' && rightNum == 0){

            let symbol = {};

            symbol.quad = this.quadruples.length;

            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'M2_While' && rightNum == 0){

            let symbol = {};

            symbol.quad = this.quadruples.length;

            const newQuadruple = new Quadruple('j=', '-', '0', '-');
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'IfStatement' && rightNum == 0){
            const loc = getLoc(symbols);
            const test = symbols[2].node;
            const consequent = symbols[5].node;
            const alternate = symbols[8].node;
        
            let symbol = {};
            symbol.loc = loc;
            symbol.node = new IfStatement(loc, test, consequent, alternate);

            let M1Quadruple = this.quadruples[symbols[4].quad];
            M1Quadruple.arg1 = symbols[2].place;
            M1Quadruple.result = symbols[7].quad;

            let NQuadruple = this.quadruples[symbols[6].quad];
            NQuadruple.result = this.quadruples.length;

            // 回填符号表名字
            if(symbols[8].isNull){
                let table = this.symbolTables[this.lastTablePointer];
                table.name = 'If语句块符号表';
            }else{
                let table = this.symbolTables[this.lastTablePointer-1];
                table.name = 'If语句块符号表';
                table = this.symbolTables[this.lastTablePointer];
                table.name = 'Else语句块符号表';
            }
            
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'M1_If' && rightNum == 0){

            let symbol = {};

            symbol.quad = this.quadruples.length;

            const newQuadruple = new Quadruple('j=', '-', '0', '-');
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'N_If' && rightNum == 0){

            let symbol = {};

            symbol.quad = this.quadruples.length;

            const newQuadruple = new Quadruple('j', '-', '-', '-');
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'M2_If' && rightNum == 0){

            let symbol = {};

            symbol.quad = this.quadruples.length;
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ElseStatement' && rightNum == 0){
            // const loc = getLoc(symbols);

            let symbol = {};
            // symbol.loc = loc;
            symbol.node = null;
            symbol.isNull = true;

        
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ElseStatement' && rightNum == 1){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = symbols[1].node;
            symbol.isNull = false;

        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Expression' && rightNum == 0){
            const loc = getLoc(symbols);


            let symbol = {};
            symbol.loc = loc;
            symbol.node = symbols[0].node;

            symbol.place = symbols[0].place;
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Expression' && rightNum == 1){
            const loc = getLoc(symbols);

            

            let symbol = {};
            symbol.loc = loc;
            symbol.node = new BinaryExpression(loc, symbols[0].node, symbols[1].value, symbols[2].node);

            symbol.place = this.newTemp();
            const newQuadruple = new Quadruple(symbols[1].value, symbols[0].place, symbols[2].place, symbol.place);
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Relop'){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.value = symbols[0].value;
    
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'AddExpression' && rightNum == 0){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = symbols[0].node;

            symbol.place = symbols[0].place;
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'AddExpression' && rightNum == 1){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = new BinaryExpression(loc, symbols[0].node, '+', symbols[2].node);

            symbol.place = this.newTemp();

            const newQuadruple = new Quadruple('+', symbols[0].place, symbols[2].place, symbol.place);
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'AddExpression' && rightNum == 2){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = new BinaryExpression(loc, symbols[0].node, '-', symbols[2].node);

            symbol.place = this.newTemp();
            const newQuadruple = new Quadruple('-', symbols[0].place, symbols[2].place, symbol.place);
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Item' && rightNum == 0){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = symbols[0].node;

            symbol.place = symbols[0].place;
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Item' && rightNum == 1){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = new BinaryExpression(loc, symbols[0].node, '*', symbols[2].node);

            symbol.place = this.newTemp();
            const newQuadruple = new Quadruple('*', symbols[0].place, symbols[2].place, symbol.place);
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Item' && rightNum == 2){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = new BinaryExpression(loc, symbols[0].node, '/', symbols[2].node);

            symbol.place = this.newTemp();
            const newQuadruple = new Quadruple('/', symbols[0].place, symbols[2].place, symbol.place);
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Factor' && rightNum == 0){
            const loc = getLoc(symbols);

            const value = symbols[0].value;
        
            let symbol = {};
            symbol.loc = loc;
            symbol.node = new Literal(loc, value);

            symbol.place = symbols[0].value;

            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Factor' && rightNum == 1){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = symbols[1].node;

            symbol.place = symbols[1].place;
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Factor' && rightNum == 2){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = symbols[0].node;

            symbol.place = this.newTemp();
            const newQuadruple = new Quadruple(':=', `${symbols[0].node.callee.name}-rtn`, '-', symbol.place);
            this.quadruples.push(newQuadruple);
            
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'Factor' && rightNum == 3){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = symbols[0].node;

            const searchSymbol = this.searchSymbol(symbols[0].node.name, 'variable');
            if(!searchSymbol){
                return {
                    isSucc:false,
                    msg:`未声明变量${symbols[0].node.name}`,
                    errWord:{type:'identifier', value:symbols[0].node.name, loc:symbols[0].loc}
                }
            }
            symbol.place = symbols[0].place;
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'CallExpression' && rightNum == 0){
            const loc = getLoc(symbols);
            const callee = symbols[0].node;
            const args = symbols[2].nodes;
        
            let symbol = {};
            symbol.loc = loc;
            symbol.node = new CallExpression(loc, callee, args);

            const searchSymbol = this.searchSymbol(symbols[0].node.name, 'function');
            if(!searchSymbol){
                return {
                    isSucc:false,
                    msg:`未声明函数${symbols[0].node.name}`,
                    errWord:{type:'identifier', value:symbols[0].node.name, loc:symbols[0].loc}
                }
            }
            const newQuadruple = new Quadruple('call', '-', '-', symbols[0].node.name);
            this.quadruples.push(newQuadruple);

            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ActualParamList' && rightNum == 0){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.nodes = symbols[0].nodes;
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ActualParamList' && rightNum == 1){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.nodes = null;
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ActualParams' && rightNum == 0){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.nodes = [symbols[0].node];

            const newQuadruple = new Quadruple('param', symbols[0].place, '-', `${this.funcID}-param`);
            this.quadruples.push(newQuadruple);

            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ActualParams' && rightNum == 1){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.nodes = [symbols[0].node];
            symbols[2].nodes.forEach(n => {
                symbol.nodes.push(n);
            });

            const newQuadruple = new Quadruple('param', symbols[0].place, '-', `${this.funcID}-param`);
            this.quadruples.push(newQuadruple);
        
            return {isSucc:true, symbol:symbol};
        }
        else if(left == 'ID' && rightNum == 0){
            const loc = getLoc(symbols);

            let symbol = {};
            symbol.loc = loc;
            symbol.node = new Identifier(loc, symbols[0].value);
            symbol.place = symbols[0].value;
            this.lastID = symbols[0].value;
            return {isSucc:true, symbol:symbol};
        }
    }
}





function getLoc(symbols) {
    let loc = {};
    let i=0;
    let j=symbols.length-1;
    while(!symbols[i].loc){
        i++;
    }
    while(!symbols[j].loc){
        j--;
    }
    loc.start = symbols[i].loc.start;
    loc.end = symbols[j].loc.end;
    return loc;
}


// let actionFunctions = [];






module.exports = Semantic;
