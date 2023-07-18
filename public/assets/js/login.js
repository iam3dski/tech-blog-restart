const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        // Display an alert if the request fails
        alert(response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to sign up');
    }
  }
};

try {
  const btnAccess = document.querySelector('.btn-access');
  if (btnAccess && btnAccess.textContent.toLowerCase() === 'login!') {
    document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  } else {
    document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  }
} catch (error) {
  console.error('Error attaching event handler:', error);
}
