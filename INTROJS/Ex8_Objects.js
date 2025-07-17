const user = {
  name: "Reed",
  username: "Reedbarger",
  email: "reed@gmail.com",
  details: {
    title: "Programmer"  
  }  
};

const { username, email } = user;
// const { title } = user.details
const { name, details: { title} } = user;


// function displayUser() {
//   console.log(`username: ${username}, email: ${email}`);  
//   console.log(`${name} is a ${title}`); 
  
// }

function displayUserBio({ name, details: { title } }) {
  console.log(`${name} is a ${title}`); 
}

displayUserBio(user);


//displayUser()