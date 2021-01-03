const Lexical = require('./lexical/LexicalAnalyzer');
const Syntactic = require('./syntactic/syntactic');
const fs = require('fs');


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
\n\
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
const code2 = "\
int a;\n\
"


// 测试函数
function test() {
    let lexical = new Lexical();
    lexical.initLexAnalyzer(code);
    let lexResult = lexical.getLexResult();
    console.log('词法分析结果');
    console.log(lexResult);
    if(!lexResult.isSucc){
        console.log('词法错误');
        return;
    }

    let syntactic = new Syntactic();
    const synResult = syntactic.startAnalize(lexResult.lexResult);

    console.log('语法分析结果');
    // console.log(synResult.analizeProcess);

    
    if(!synResult.isSucc){
        console.log('语法/语义错误');
        console.log(synResult.msg);
        console.log(synResult.errWord);
        return;
    }

    console.log(synResult.mid_code);
    console.log(synResult.symbolTables);


    // for(let i = 0;i<syntactic.normalFamily.length;i++){
    //     const itemsSet = syntactic.normalFamily[i];
    //     console.log(`项目集${i}:`);
    //     for(let j = 0;j<itemsSet.length;j++){
    //         const production = syntactic.productions[itemsSet[j].proNum];
    //         console.log(production.left+'->'+JSON.stringify(production.right));
    //         console.log(itemsSet[j].pointPos);
    //     }
    // }
    // console.log(syntactic.normalFamily);
    console.log(synResult.ast)
    fs.writeFileSync('./ast.json', JSON.stringify(synResult.ast, null, 2));
    fs.writeFileSync('./cst.json', JSON.stringify(synResult.cst, null, 2));

}

test();



