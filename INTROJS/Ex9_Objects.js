const user = {
  name: "Cynthia",
  username: "",
  phoneNumber: "",
  email: "",
  password: ""  
};

const newUser = {
  name:"Meti",
  username: "ReedBarger",
  email: "reed@gmail.com",
  password: "mypassword"  
};

// console.log(Object.assign(user, newUser));
// console.log(user);

// console.log(Object.assign({}, user, newUser));
// console.log(user);

//console.log(Object.assign({}, user, newUser, {verified:true}));
// 

const createdUser = { ...user, ...newUser, verified: false };
console.log(createdUser);

// Try to give verified:true in user
