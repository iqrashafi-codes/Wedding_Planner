document.addEventListener('DOMContentLoaded', () => {
    // 1. "Book Now" Navigation
    const bookBtn = document.getElementById('bookBtn');
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            window.location.href = 'Pages/Contact.html';
        });
    }

    // 2. Form Submission Alert
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Success! Your request has been sent to our team.");
            form.reset();
        });
    });
});