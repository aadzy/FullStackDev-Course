const el = document.getElementById('home')
console.log(el)

const links = document.querySelectorAll('a');
// console.log(link);

links.forEach(link => {
  if (link.matches('a[href="/login"]')) {
    const loginLink = link;
    console.log(loginLink);  
  }
})

const post = document.querySelector(".post");
post.style.backgroundColor = 'orange';
post.style.margin = '30px';

const post = document.querySelector(".post");
post.classList.remove('post');

document.body.addEventListener('click', event => {
  if (!event.target.matches('.post')) return;
  
  console.log('Do you want to edit this post?')  
})

