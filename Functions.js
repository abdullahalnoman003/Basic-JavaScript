//  Now we will try out some of functions
//  To write a function we need to do some work
// Normal Functions

function normal(){
    console.log("This is normal function.")
}
normal();


// arrow function 

const arrowFunction = (a,b) => a+b;

console.log(arrowFunction(20,20));

// Multiline arrow function
const arrow = (a, b) => {
    const sum = a + b;
    return sum;
}

console.log(arrow(10, 20));

// We can set default parameter like below
const test = (a, b=20) => {
    const sum = a + b;
    return sum;
}

console.log(test(10));
console.log(test(10, 50));

// Callback Function is a function tha can pass another function as an argument 

function hello(fun){
    fun();
}

const callback = () => {
    console.log("This is from Callback function.");
}

hello(callback);