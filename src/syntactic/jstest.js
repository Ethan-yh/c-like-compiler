const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.resolve(__dirname, './productionsNew.txt')

var readStream = fs.createReadStream(filePath);

let rl = readline.createInterface({
    input: readStream
});

let productionsLines = [];

rl.on('line', (line) => {
    if(line.length){
        productionsLines.push(line);
    }
    
});

rl.on('close',async()=>{
    let grammar = {};
    grammar.productionsLines = productionsLines;
    fs.writeFileSync('./grammar.json', JSON.stringify(grammar, null, 4));
})



