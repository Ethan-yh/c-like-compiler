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
    console.log('first集合');
    console.log(s.firstSet);

    console.log('follow集合');
    s.genFollowSet();
    console.log(s.followSet);
})
