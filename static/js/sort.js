document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded and running');

    const cafesContainer = document.querySelector('.cafes');
    if (!cafesContainer) {
        console.error('Cafes container not found');
        return;
    }

    const cafes = Array.from(cafesContainer.children);
    console.log('Cafes before sorting:', cafes);

    
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    console.log('Retrieved reviews:', reviews);

    if (reviews.length > 0) {
        
        const cafeRatings = {};
        reviews.forEach(review => {
            if (!cafeRatings[review.cafeName]) {
                cafeRatings[review.cafeName] = [];
            }
            cafeRatings[review.cafeName].push(parseFloat(review.rating));
        });
        console.log('Cafe ratings:', cafeRatings);

        
        const averageRatings = {};
        for (let cafe in cafeRatings) {
            const ratings = cafeRatings[cafe];
            const sum = ratings.reduce((acc, rating) => acc + rating, 0);
            averageRatings[cafe] = sum / ratings.length;
        }
        console.log('Average ratings:', averageRatings);

        
        cafes.sort((a, b) => {
            const ratingA = averageRatings[a.id] || 0;
            const ratingB = averageRatings[b.id] || 0;
            return ratingB - ratingA;
        });
        console.log('Cafes after sorting:', cafes);

        
        const sortedOrder = cafes.map(cafe => cafe.id);
        localStorage.setItem('sortedOrder', JSON.stringify(sortedOrder));
        console.log('Saved sorted order:', sortedOrder);

        
        cafesContainer.innerHTML = '';
        cafes.forEach(cafe => {
            cafesContainer.appendChild(cafe);
        });
        console.log('Reordered cafes:', cafes);
    } else {
      
        const sortedOrder = JSON.parse(localStorage.getItem('sortedOrder')) || [];
        if (sortedOrder.length > 0) {
            cafes.sort((a, b) => {
                return sortedOrder.indexOf(a.id) - sortedOrder.indexOf(b.id);
            });
            console.log('Cafes after applying saved order:', cafes);

            
            cafesContainer.innerHTML = '';
            cafes.forEach(cafe => {
                cafesContainer.appendChild(cafe);
            });
            console.log('Reordered cafes from saved order:', cafes);
        } else {
            console.log('No reviews or saved order found. Displaying cafes as is.');
        }
    }
});

