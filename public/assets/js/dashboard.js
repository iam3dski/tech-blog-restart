const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const description = document.querySelector('#description').value.trim();

  if (title && description) {
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  }
};

const editHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#description').value.trim();

  if (event.target.children[2].children[0].hasAttribute('data-id')) {
    const id = event.target.children[2].children[0].getAttribute('data-id');

    try {
      const response = await fetch(`/api/post/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description: content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
      }
    } catch (error) {
      console.error('Error editing post:', error);
      alert('Failed to edit post');
    }
  }
};

try {
  document.querySelector('.create-form').addEventListener('submit', newPostHandler);
} catch (error) {
  console.error('Error attaching new post event listener:', error);
}

try {
  document.querySelector('.edit-form').addEventListener('submit', editHandler);
} catch (error) {
  console.error('Error attaching edit post event listener:', error);
}

try {
  document.querySelector('.delete').addEventListener('click', delButtonHandler);
} catch (error) {
  console.error('Error attaching delete button event listener:', error);
}
