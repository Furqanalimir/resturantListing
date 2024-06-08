"use strict"

function myName(name, age){
    return `Your name is ${name} and you are ${age} years old`
};

// const person = {name: "ali"};

const p = myName.bind("ali", null);
console.log(p(25))