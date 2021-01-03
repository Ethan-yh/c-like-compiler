class SymbolTableItem {
    constructor(name = '', type = 'variable', tablePointer = -1) {
        this.name = name;
        this.type = type;
        this.tablePointer = tablePointer;
    }
}




class SymbolTable {
    constructor(previous = -1, content = [], name = '') {
        this.name = name;
        this.previous = previous;
        this.content = content;
    }
    insert(symbolTableItem) {
        this.content.push(symbolTableItem);
    }
    find(name, type, order = 0) {
        if (order == 0) {
            for (let i = 0; i < this.content.length; i++) {
                if (this.content[i].name == name) {
                    if (type) {
                        if (this.content[i].type == type) {
                            return this.content[i];
                        } else {
                            return null;
                        }
                    }
                    else {
                        return this.content[i];
                    }
                }
            }
        }
        else {
            for (let i = this.content.length - 1; i >= 0; i--) {
                if (this.content[i].name == name) {
                    if (type) {
                        if (this.content[i].type == type) {
                            return this.content[i];
                        } else {
                            return null;
                        }
                    }
                    else {
                        return this.content[i];
                    }
                }
            }
        }

        return null;
    }
    findLastOne(type) {
        if (type) {
            for (let i = this.content.length - 1; i >= 0; i--) {
                if (this.content[i].type == type) {
                    return this.content[i];
                }
            }
        }
        return this.content[this.content.length-1];
    }
}

module.exports = { SymbolTableItem, SymbolTable };