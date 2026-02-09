// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Variable <<<<<<<<<<<<<<<<<<<<<<<<<
// We declare 2 types of variable. Let and Const
let string1 = "This is let which can be changed";
console.log(string1);
string1 = "This is string after changing.";
console.log(string1);

const string2 = "This is Const which is fixed";
console.log(string2)
// string2 = "This is Const which is fixed"; 
// console.log(string2); there will be error

//  JavaScript is dynamically typed language we can declare any types of variable.
let variable = "Noman";
console.log(typeof variable);
variable = 3.94;
console.log(typeof variable);
variable = 22;
console.log(typeof variable);
variable = true;
console.log(typeof variable);
variable = null;
console.log(typeof variable);
variable = {
    name : "Abdullah Al Noman",
    age : 22,
    department : "Software Engineering",
    cgpa : 3.94,
    isMarried: false,
};
console.log(typeof variable);
variable = NaN;
console.log(typeof variable);
let able;
console.log(typeof able);

// 