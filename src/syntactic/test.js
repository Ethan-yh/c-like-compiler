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
    console.log('读取完毕');
    var s = new Syntactic(productionsLines);
    try{
        await s.genProductions();
        console.log(s.productions);


    }catch(err){
        console.log(err)
    }
    
    s.genFirstSet();
    // console.log('first集合');
    // console.log(s.firstSet);

    
    s.genFollowSet();
    // console.log('follow集合');
    // console.log(s.followSet);


    s.genLR0Items();
    // console.log('LR0项目');
    // console.log(s.LR0Items);

    
    const t = s.genLR0ItemClosureSet(s.LR0Items[0]);
    console.log('求closureset测试');
    console.log(t);

    try{
        await s.genNormalFamilySet();
    }catch(err){
        console.log(err);
    }
    console.log('项目集规范族');
    console.log(s.normalFamily);
    console.log('项目集规范族长度');
    console.log(s.normalFamily.length);
    console.log('action-goto表');
    console.log(s.actionGotoTable.value);
    
})
