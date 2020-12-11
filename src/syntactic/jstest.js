const arr = [];
arr['a']=1;
arr['b']=2;
arr['c']=3;
arr['d']=4;

console.log(arr[0])

for (let t in arr){
    console.log(t)
}

// arr.every((a, index)=>{
//     console.log(a);
//     console.log(index)
// });

// arr.forEach((a,index)=>{
//     console.log(a);
//     console.log(index)
// });