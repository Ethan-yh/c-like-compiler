
class LexicalAnalyzer{
    WordType = ["KEYWORD", "IDENTIFIER", "CONSTANT", "OPERATOR", "DELIMITER", "ERROR"]
    Keyword = ["int", "void", "if", "else", "while", "return"]
    ConstType = ["INTEGER"]
    Operator = ["+", "-", "*", "/", "=", "==", ">", ">=", "<", "<=", "!="]
    Delimiter = [",", ";", "(", ")", "{", "}", "//", "/*", "*/", "#"]
    ErrorType = ["IDENTIFIER", "CONSTANT", "OPERATOR", "DELIMITER", "UNKNOWN", "END"]
    code = ""
    codeIndex = 0
    lineCounter = 0
    lexResult = []

    /**
     * 初始化词法分析器
     * @param {string} code
     * @return {bool}
     */
    initLexAnalyzer(code){
        this.code = code
        this.codeIndex = 0
        this.lineCounter = 0
        this.lexResult = []
    }

    /**
     * 判断是否是字母
     * @param {string} ch
     * @return {bool}
     */
    isLetter(ch){
        if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
            return true
        else
            return false
    }

    /**
     * 判断是否是数字
     * @param {string} ch
     * @return {bool}
     */
    isDigit(ch){
        if(ch >= '0' && ch <= '9')
            return true
        else
            return false
    }

    /**
     * 判断是否是运算符
     * @param {string} ch
     * @return {bool}
     */
    isOperator(ch){
        if(this.Operator.toString().includes(ch))
            return true
        else
            return false
    }

    /**
     * 判断是否是空白符
     * @param {string} ch
     * @return {bool}
     */
    isBlank(ch){
        if(ch == ' ' || ch == '\t'|| ch == '\n' || ch == '\r')
            return true
        else
            return false
    }

    /**
     * 获取字符流中的下一个字符，同时代码索引加一和计算行数
     * @param
     * @return {string}
     */
    getNextChar(){
        let ch = ''
        if(this.codeIndex == this.code.length)
            ch = '#'
        else{
            ch = this.code[this.codeIndex]
            this.codeIndex++
            if(ch == '\n')
                this.lineCounter++
        }
        return ch
    }

    /**
     * 得到代码中的下一个单词
     * @param
     * @return {object}
     */
    async getNextWord(){
        let ch = ''
        let chNext = ''
        let str = ''
        let word = {type: "", value: "", line: 0}

        while(true){
            ch = this.getNextChar()
            str = ch
            if(ch == '/'){
                chNext = this.getNextChar()
                if(chNext == '/'){
                    do chNext = this.getNextChar()
                    while((chNext != '\n') && (chNext != '#'))
                    if(chNext == '#')
                        this.codeIndex--
                }
                else if(chNext == '*'){
                    while(true){
                        do chNext = this.getNextChar()
                        while((chNext != '*') && (chNext != '#'))
                        if(chNext == '#'){
                            this.codeIndex--
                            word.type = "LexError"
                            word.value = "DELIMITER ERROR: 缺少界符 \"*/\""
                            break
                        }
                        if(this.getNextChar() == '/')
                            break
                        else
                            this.codeIndex--
                    }
                    if(word.type == "LexError")
                        break
                }
                    
                /*除号*/
                else{
                    this.codeIndex--
                    word.type = "OPERATOR"
                    break
                }
            }
            else if(this.isLetter(ch)){
                chNext = this.getNextChar()
                while(this.isLetter(chNext) || this.isDigit(chNext)){
                    str = str.concat(chNext)
                    chNext = this.getNextChar()
                }
                this.codeIndex--
                if(this.Keyword.includes(str)){
                    word.type = str
                    str = "--"
                }
                else
                    word.type = "identifier"
                break
            }
            else if(this.isDigit(ch)){
                chNext = this.getNextChar()
                while(this.isDigit(chNext)){
                    str = str.concat(chNext)
                    chNext = this.getNextChar()
                }
                if(this.isLetter(chNext)){
                    while(this.isLetter(chNext)){
                        str = str.concat(chNext)
                        chNext = this.getNextChar()
                    }
                    this.codeIndex--
                    word.type = "LexError"
                    word.value = "IDENTIFIER ERROR: 标识符不能以数字开头!!!"
                }
                else{
                    this.codeIndex--
                    word.type = "num"
                }
                break
            }
            else if(this.isOperator(ch)){
                if(ch == '=' || ch == '>' || ch == '<' || ch == '!'){
                    chNext = this.getNextChar()
                    if(chNext == '=')
                        str = str.concat(chNext)
                    else{
                        if(ch == '!'){
                            this.codeIndex--
                            word.type = "LexError"
                            word.value = "OPERATOR ERROR: \"!\" 不是操作符!!!"
                        }
                        else{
                            this.codeIndex--
                            word.type = str
                            str = "--"
                        }
                    }
                }
                else{
                    word.type = str
                    str = "--"
                }
                break
            }
            else if(this.Delimiter.includes(ch)){
                word.type = str
                str = "--"
                break
            }
            else if(this.isBlank(ch))
                continue
            else{
                chNext = this.getNextChar()
                while((chNext != '/') && !this.isLetter(chNext) && !this.isDigit(chNext) && !this.Operator() && !this.Delimiter() && !this.isBlank()){
                    str = str.concat(chNext)
                    chNext = this.getNextChar()
                }
                this.codeIndex--
                word.type = "ERROR"
                word.value = "UNKNOWN ERROR: 出现未知的单词!!!"
                break
            }
        }
        word.line = this.lineCounter
        if(word.type == "LexError"){
            word.value = str + " " + word.value
            throw word
        }
        else
            word.value = str
        return word
    }

    /**
     * 得到代码的词法分析结果
     * @param
     * @return {array}
     */
    async getLexResult(){
        let word = {type: "", value: "", line: 0}
        while(this.codeIndex < this.code.length){
            try{
                word = await this.getNextWord()
                if((word.type == '#') && (this.codeIndex < this.code.length)){
                    word.type = "LexError"
                    word.value = "END ERROR: \"#\" 应该出现在代码结尾处!!!"
                    throw word
                }
                this.lexResult.push(word)
            }
            catch(err){
                throw err
            }
        }
        return this.lexResult
    }

}

let lexAnalyzer = new LexicalAnalyzer()
code = "\
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
a=program(a,b,demo(c))\n\
return;\n\
}\n\
"
// lexAnalyzer.initLexAnalyzer(code)
// async function test() {
//     try{
//         let lexResult = await lexAnalyzer.getLexResult()
//         console.log(lexResult)
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// test()
module.exports = LexicalAnalyzer
