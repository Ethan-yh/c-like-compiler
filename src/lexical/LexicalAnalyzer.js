
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
     * 返回词法分析出错的位置和原因
     * @param {number} line
     * @param {string} type
     * @param {string} value
     * @return {object}
     */
    reportError(line,type,value){
        let error = {line: line, type: type, value: value}
        console.log(error)
        return error
    }

    /**
     * 得到代码中的下一个单词
     * @param
     * @return {object}
     */
    getNextWord(){
        let ch = ''
        let chNext = ''
        let str = ''
        let word = {type: "", value: ""}

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
                else if(chNext == '*')
                    while(true){
                        do chNext = this.getNextChar()
                        while((chNext != '*') && (chNext != '#'))
                        if(chNext == '#'){
                            this.reportError(this.lineCounter, "DELIMITER", "缺少界符 \"*/\"")
                            this.codeIndex--
                            break
                        }
                        if(this.getNextChar() == '/')
                            break
                        else
                            this.codeIndex--
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
                if(this.Keyword.includes(str))
                    word.type = "KEYWORD"
                else
                    word.type = "IDENTIFIER"
                break
            }
            else if(this.isDigit(ch)){
                chNext = this.getNextChar()
                while(this.isDigit(chNext)){
                    str = str.concat(chNext)
                    chNext = this.getNextChar()
                }
                if(this.isLetter(chNext)){
                    this.reportError(this.lineCounter, "IDENTIFIER", "标识符不能以数字开头!!!")
                    while(this.isLetter(chNext)){
                        str = str.concat(chNext)
                        chNext = this.getNextChar()
                    }
                    this.codeIndex--
                    word.type = "ERROR"
                }
                else{
                    this.codeIndex--
                    word.type = "CONSTANT"
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
                            this.reportError(line, "OPERATOR", "\"!\" 不是操作符!!!")
                            this.codeIndex--
                            word.type = "ERROR"
                        }
                        else{
                            this.codeIndex--
                            word.type = "OPERATOR"
                        }
                    }
                }
                else
                    word.type = "OPERATOR"
                break
            }
            else if(this.Delimiter.includes(ch)){
                word.type = "DELIMITER"
                break
            }
            else if(this.isBlank(ch))
                continue
            else{
                this.reportError(this.lineCounter, "UNKNOWN", "出现未知的词法错误!!!")
                chNext = this.getNextChar()
                while((chNext != '/') && !this.isLetter(chNext) && !this.isDigit(chNext) && !this.Operator() && !this.Delimiter() && !this.isBlank()){
                    str = str.concat(chNext)
                    chNext = this.getNextChar()
                }
                this.codeIndex--
                word.type = "ERROR"
                break
            }
        }
        word.value = str
        return word
    }

    /**
     * 得到代码的词法分析结果
     * @param
     * @return {array}
     */
    getLexResult(){
        let word = {type: "", value: ""}
        while(this.codeIndex < this.code.length){
            word = this.getNextWord()
            this.lexResult.push(word)
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
lexAnalyzer.initLexAnalyzer(code)
console.log(lexAnalyzer.getLexResult())
