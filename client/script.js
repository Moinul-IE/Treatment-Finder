// user button

function navigateToPage() {
    // Change the URL to the desired page
    window.location.href = 'userTarget.html'; // Replace with your target page
}

// Mobile nav toggle (for static client pages)
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navCollapse = document.querySelector('.nav-collapse');
    if (navToggle && navCollapse) {
        navToggle.addEventListener('click', () => {
            const isOpen = navCollapse.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }
});