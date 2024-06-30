// JavaScript for Skip to Content Button and Back to Top Link

const skipToContentBtn = document.getElementById('skip-to-content');
const backToTopBtn = document.querySelector('.back-to-top');

// Smooth scrolling to main content
skipToContentBtn.addEventListener('click', () => {
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
});

// Show back to top button when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Smooth scrolling to top
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
