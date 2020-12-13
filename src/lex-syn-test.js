const Lexical = require('./lexical/LexicalAnalyzer');
const Syntactic = require('./syntactic/syntactic');
const fs = require('fs');


const code = "\
void main(void)\n\
{\n\
int a;\n\
return;\n\
}\n\
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
    // for(let i = 0;i<5;i++){
    //     console.log(synResult.analizeProcess[i]);

    // }


    console.log(synResult.analizeProcess);

    
    if(!synResult.isSucc){
        console.log('语法错误');
        console.log(synResult.errWord);
        return;
    }

    // console.log(syntactic.actionGotoTable.value)

    fs.writeFileSync('./ast.json', JSON.stringify(synResult.ast, null, 2));
    fs.writeFileSync('./cst.json', JSON.stringify(synResult.cst, null, 2));

}

test();



