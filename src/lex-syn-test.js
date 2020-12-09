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



// 测试函数
async function test() {
    try {
        let lexical = new Lexical();
        lexical.initLexAnalyzer(code);
        let lexResult = await lexical.getLexResult();
        console.log(lexResult);

        let syntactic = new Syntactic(productionsLines);
        const synResult = syntactic.startAnalize(lexResult);

        console.log(synResult);

        fs.writeFileSync('./ast.json', JSON.stringify(synResult.ast, null, 2));

    } catch (err) {
        console.log(err);
    }
}

test();



