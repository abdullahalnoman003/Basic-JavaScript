
const fetchdata = () =>{
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res=> res.json())
    .then(data=>{
        console.log(data)
    })
    
}
let LoadUser = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=> res.json())
    .then(data=>{
        displayUser(data);
    })
}
const displayUser = (datas) =>{
    let UserContainer = document.getElementById('Users');
    for(let user of datas){
        let li = document.createElement("li");
        li.innerText = user.name;
        UserContainer.appendChild(li);
    }
}