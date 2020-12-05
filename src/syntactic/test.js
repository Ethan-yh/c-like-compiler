const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Syntactic = require('./syntactic')

const filePath = path.resolve(__dirname, './productions.txt')

var readStream = fs.createReadStream(filePath);


let rl = readline.createInterface({
    input: readStream
});

let productionsLines = [];

rl.on('line', (line) => {
    // console.log(line);
    productionsLines.push(line);
});

rl.on('close',async()=>{
    var s = new Syntactic(productionsLines);
    try{
        await s.preForSyntacticAnalyzer();
        console.log('项目集规范族');
        console.log(s.normalFamily);
        console.log('项目集规范族长度');
        console.log(s.normalFamily.len);
        console.log('action-goto表');
        console.log(s.actionGotoTable.value);

        await s.startAnalize([{type:'int'},{type:'identifier'}, {type:'('}, {type:')'}, {type:'{'}, {type:'int'}, {type:'identifier'}, {type:';'},{type:'return'}, {type:';'}, {type:'}'}, {type:'#'} ]);
    }catch(err){
        console.log(err);
    }
})
