document.addEventListener("DOMContentLoaded", function() {
    const togglePassword1 = document.getElementById('togglePassword1');
    const password1 = document.getElementById('password');
    const togglePassword2 = document.getElementById('togglePassword2');
    const password2 = document.getElementById('confirm-password');

    togglePassword1.addEventListener('click', function () {
        const type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
        password1.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    togglePassword2.addEventListener('click', function () {
        const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
        password2.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = signupForm.elements['username'].value;
        const email = signupForm.elements['email'].value;
        const password = signupForm.elements['password'].value;
        const confirmPassword = signupForm.elements['confirm-password'].value;

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            alert("Username or Email already exists. Please use different credentials.");
            return;
        }

        users.push({ username: username, email: email, password: password });
        localStorage.setItem('users', JSON.stringify(users));

        window.location.href = "/review";
    });
});
