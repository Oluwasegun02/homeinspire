
  // Get elements
  const commentInput = document.getElementById('comment-input');
  const submitButton = document.getElementById('submit-btn');
  const likeButton = document.getElementById('like-btn');
  const likeCount = document.getElementById('like-count');

  // Initialize like count
  let count = 0;

  // Submit button click event
  submitButton.addEventListener('click', function() {
    let comment = commentInput.value;

    if (comment !== '') {
      // Create a new comment element
      let newComment = document.createElement('p');
      newComment.textContent = comment;

      // Append the new comment to the comment box
      document.querySelector('.comment-box').appendChild(newComment);

      // Clear the comment input
      commentInput.value = '';
    }
  });

  // Like button click event
  likeButton.addEventListener('click', function() {
    count++;
    likeCount.textContent = count;
  });

