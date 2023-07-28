document.addEventListener('DOMContentLoaded', () => {
// Event handler for creating a new post
const newPostHandler = async (event) => {
  event.preventDefault();

  // Get the values from the form inputs
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    // Send a POST request to create a new post
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If successful, redirect to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // Display an alert if the request fails
      alert('Failed to create post');
    }
  }
};

// Event handler for deleting a post
const delButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    // Send a DELETE request to delete the post
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // If successful, redirect to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // Display an alert if the request fails
      alert('Failed to delete post');
    }
  }
};

// Event handler for editing a post
const EditHandler = async (event) => {
  event.preventDefault();

  // Get the values from the form inputs
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (event.target.children[2].children[0].hasAttribute('data-id')) {
    const id = event.target.children[2].children[0].getAttribute('data-id');

    // Send a PUT request to update the post
    const response = await fetch(`/api/post/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description: content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If successful, redirect to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // Display an alert if the request fails
      alert('Failed to edit post');
    }
  }
};

// Event listener for the new post form submission
try {
  document.querySelector('.create-form').addEventListener('submit', newPostHandler);
} catch (error) {
  // Error handling for the case where the form is not found
}

// Event listener for the edit post form submission
try {
  document.querySelector('.edit-form').addEventListener('submit', EditHandler);
} catch (error) {
  // Error handling for the case where the form is not found
}

// Event listener for the delete button click
try {
  document.querySelector('.delete').addEventListener('click', delButtonHandler);
} catch (error) {
  // Error handling for the case where the delete button is not found
}
});