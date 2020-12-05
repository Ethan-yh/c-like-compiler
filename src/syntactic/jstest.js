const fs = require('fs');



// lexAn().then(()=>{}).catch(res=>{console.log(res)});

async function func1(){
    try{
        await lexAn();
        const a = await A();
        const b = await B();
        const c = await C(a, b);
    }catch(err){
        console.log(err);
    }
}


function lexAn(){
    return new Promise((resolve, reject)=>{

        return reject(1);
    });
}

async function lexAn2(){
    throw(1);
    return 1;
}

console.log(lexAn2());