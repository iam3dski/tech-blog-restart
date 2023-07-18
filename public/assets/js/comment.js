// Event handler for creating a new comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  // Get the comment description from the form input
  const description = document.querySelector('#Comment').value.trim();
  const data = document.querySelector('#Comment');

  if (description) {
    try {
      // Send a POST request to create a new comment
      const response = await fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({
          description,
          user_id: data.dataset.uid,
          post_id: data.dataset.bid,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If successful, redirect to the post view page
        document.location.replace(`/post/view/${data.dataset.bid}`);
      } else {
        // Display an alert if the request fails
        alert('Failed to create comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to create comment');
    }
  }
};

try {
  // Attach the new comment event handler to the comment form submission
  const commentForm = document.querySelector('.comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', newCommentHandler);
  }
} catch (error) {
  console.error('Error attaching event handler:', error);
}
