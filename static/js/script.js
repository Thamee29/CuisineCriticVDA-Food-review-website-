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

        window.location.href = "/cafes";
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    togglePassword.addEventListener('click', function () {
        // Toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        // Toggle the eye and eye-slash icon
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = loginForm.elements['email'].value;
        const password = loginForm.elements['password'].value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            alert("Login successful!");
            window.location.href = "/cafes";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const reviewForm = document.getElementById('reviewForm');
    const reviewContainer = document.querySelector('.review');
    const sortSelect = document.querySelector('select[name="sort"]');
    let reviews = JSON.parse(localStorage.getItem('reviews')) || []; 

    
    function createReviewElement(username, selectCafe, rating, comment, date) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review-item');
        reviewElement.dataset.date = date.toISOString(); 
        reviewElement.dataset.rating = rating; 
        reviewElement.innerHTML = `
            <h3>${username}</h3>
            <p><strong>Cafe/Food:</strong> ${selectCafe}</p>
            <p><strong>Rating:</strong> ${rating}</p>
            <p><strong>Review:</strong> ${comment}</p>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;

        
        const deleteButton = reviewElement.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            
            reviewElement.remove();

            
            reviews = reviews.filter(review => review.username !== username || review.cafeName !== selectCafe);

            
            saveReviews();
        });

       
        const editButton = reviewElement.querySelector('.edit-button');
        editButton.addEventListener('click', function () {
            handleEditButtonClick(reviewElement, username, selectCafe, rating, comment);
        });

        return reviewElement;
    }

   
    function handleEditButtonClick(reviewElement, username, selectCafe, rating, comment) {
        const editForm = document.getElementById('reviewForm');
        editForm.querySelector('input[name="username"]').value = username;
        editForm.querySelector('select[name="cafeName"]').value = selectCafe;
        editForm.querySelector('input[name="rating"]').value = rating;
        editForm.querySelector('textarea[name="comment"]').value = comment;

        
        editForm.dataset.editing = true;
        editForm.dataset.reviewElement = reviewElement.dataset.date; 

        
        editForm.scrollIntoView({ behavior: 'smooth' });
    }

   
    function addReviewToDOM(reviewElement) {
        reviewContainer.appendChild(reviewElement);
    }

    
    function saveReviews() {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        const formData = new FormData(reviewForm); 
        const username = formData.get('username');
        const selectCafe = formData.get('cafeName');
        const rating = formData.get('rating');
        const comment = formData.get('comment');
        const currentDate = new Date(); 

        if (reviewForm.dataset.editing) {
            console.log("Editing mode active");
            const reviewDate = reviewForm.dataset.reviewElement;
            const reviewIndex = reviews.findIndex(review => new Date(review.date).toISOString() === reviewDate);
            if (reviewIndex !== -1) {
                reviews[reviewIndex] = { username, cafeName: selectCafe, rating, comment, date: currentDate };
                console.log("Updated review:", reviews[reviewIndex]);
            }
            saveReviews(); 
            reviewForm.dataset.editing = false;
            reviewForm.dataset.reviewElement = '';

            renderReviews(); 
        } else {
            const reviewElement = createReviewElement(username, selectCafe, rating, comment, currentDate);
            addReviewToDOM(reviewElement);
            reviews.push({
                username: username,
                cafeName: selectCafe,
                rating: rating,
                comment: comment,
                date: currentDate
            }); 
            saveReviews(); 
        }

        reviewForm.reset(); 
    });

    
    function sortReviewsByRatingAsc() {
        reviews.sort((a, b) => a.rating - b.rating);
        renderReviews();
    }

    
    function sortReviewsByRatingDesc() {
        reviews.sort((a, b) => b.rating - a.rating);
        renderReviews();
    }

   
    function sortReviewsByDate() {
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderReviews();
    }

    
    function renderReviews() {
        reviewContainer.innerHTML = ''; 
        reviews.forEach(review => {
            const reviewElement = createReviewElement(review.username, review.cafeName, review.rating, review.comment, new Date(review.date));
            reviewContainer.appendChild(reviewElement);
        });
    }

    
    sortSelect.addEventListener('change', function () {
        const selectedSortOption = sortSelect.value;
        switch (selectedSortOption) {
            case 'rating-asc':
                sortReviewsByRatingAsc();
                break;
            case 'rating-desc':
                sortReviewsByRatingDesc();
                break;
            case 'date':
                sortReviewsByDate();
                break;
            default:
                break;
        }
    });

   
    renderReviews();
});



document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

   
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    
});


