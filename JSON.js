//  JSON or JavaScript Object Notation we use it share data.
//  it is lightweight and human readable

const json = {
  name: "Abdullah AL Noman",
  age: 22,
  university: {
    name: "Daffodil International University",
    dept: "Software Engineering",
    ID: "232-35-003",
    cgpa: 3.93,
    section: "41-A",
    semester: 7,
  },
  isMarried: false,
};

// above is an object it but in json we will see it like



//  we can convert json with 
const jsonconvert = JSON.stringify(json)
console.log(json);
console.log(jsonconvert);

// it will look like this
// {
//     "name": "Abdullah AL Noman",
//     "age": 22,
//     "university": {
//     "name": "Daffodil International University",
//     "dept": "Software Engineering",
//     "ID": "232-35-003",
//     "cgpa": 3.93,
//     "section": "41-A",
//     "semester": 7,
//   },
//   "isMarried": False
// }
//  to turn back again to json object 

const ConvertToObj = JSON.parse(jsonconvert);

console.log(ConvertToObj);

// we use json to send data it is lightweight and understandable by all 
