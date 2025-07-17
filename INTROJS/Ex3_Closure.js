function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;    
    return likeCount;
  }
//   addLike();
  console.log('like count:', likeCount);
}
//console.log(handleLikePost)
const like = handleLikePost();

console.log(like());
console.log(like());
console.log(like());