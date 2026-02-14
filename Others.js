//  Arrays and other operations

const array = [10, 20, 30, 40];

console.log(array);

//  we can modify array elements by using push, pop, shift unshift.

array.push(50); // adds element in the last
console.log(array);
array.pop(); // deletes element from the last
console.log(array);
array.shift(); // removes element from the beginning
console.log(array);
array.unshift(200); // adds element in the beginning
console.log(array);

//  Searching and checking an element that are available or not in array

// includes() used to check if that value is available or not
if (array.includes(20)) {
  console.log("Array contains the element");
} else {
  console.log("Element is not available");
}

if (array.includes(120)) {
  console.log("Array contains the element");
} else {
  console.log("Element is not available");
}

// index value of an element
const index = array.indexOf(30);
console.log(index); // if the element is present will return the position and if not available it will return -1

const MulArray = [10, 20, 20, 30, 40, 30, 50, 25, 35, 55, 78];
const present = MulArray.find((num) => num === 30); // find receives an function to find
console.log(present);

//  ForEach loop

MulArray.forEach((item) => console.log(item));

// Map(), a most used thing

const double = MulArray.map((n) => n * 2); // map accepts a function
console.log(double);

// filter function

const even = MulArray.filter((n) => n % 2 === 0);
console.log(even);

//  Spread operators ,

const newArray = [0,0, ...MulArray, 1, 2, 3, 4]; // this operator means to copy things from previous arrays 
console.log(newArray);

// Slice method, it receives an parameter of start and end index

const sliced = newArray.slice(2, 7);
console.log(sliced);

// Splice an function to modify original Array
// splice array.splice(startIndex, deleteCount, newItems)

newArray.splice(1,5,999); // here 1 is the starting index, 5 means 5 element will be deleted, and 999 is the optional element to add
console.log(newArray);
