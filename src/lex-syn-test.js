const Lexical = require('./lexical/LexicalAnalyzer');
const Syntactic = require('./syntactic/syntactic');


const code = "\
int a;\n\
int b;\n\
int program(int a,int b,int c)\n\
{\n\
int i;\n\
int j;\n\
i=0;\n\
if(a>(b+c))\n\
{\n\
j=a+(b*c+1);\n\
}\n\
else\n\
{\n\
j=a;\n\
}\n\
while(i<=100)\n\
{\n\
i=j*2;\n\
}\n\
return i;\n\
}\n\
int demo(int a)\n\
{\n\
a=a+2;\n\
return a*2;\n\
}\n\
void main(void)\n\
{\n\
int a;\n\
int b;\n\
int c;\n\
a=3;\n\
b=4;\n\
c=2;\n\
a=program(a,b,demo(c));\n\
return;\n\
}\n\
"

let lexical = new Lexical();
lexical.initLexAnalyzer(code);

let syntactic;


// 读取产生式文件
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.resolve(__dirname, './syntactic/productions.txt')

var readStream = fs.createReadStream(filePath);

let rl = readline.createInterface({
    input: readStream
});

let productionsLines = [];

rl.on('line', (line) => {
    productionsLines.push(line);
});

rl.on('close',async()=>{
    console.log('读取完毕');
    syntactic = new Syntactic(productionsLines);
    test();
})


// 测试函数
async function test(){
    try{
        let lexResult = await lexical.getLexResult();
        console.log(lexResult);
        await syntactic.preForSyntacticAnalyzer();
        await syntactic.startAnalize(lexResult);


    }catch(err){
        console.log(err);
    }
}



