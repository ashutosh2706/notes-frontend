console.warn('Register Page working')

document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('conf-password').value;
    if (password === confirmPassword) {

        console.log({ username, password })

        axios.post('/register', { username, password })
            .then(response => {
                alert('Registration Successful');
                window.location.href = '/login'
            })
            .catch(error => {
                alert('An error occurred');
                console.error(error.message)
            });

    } else {
        alert('Passwords do not match. Make sure both the passwords match and try again.');
    }
});