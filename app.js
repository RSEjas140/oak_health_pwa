// Function to show the selected page with smooth transition
function showPage(pageId) {
    // Hide all pages by removing the 'active' class
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page by adding the 'active' class
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}

// Show the splash page by default when the app loads
document.addEventListener('DOMContentLoaded', () => {
    showPage('splashPage');
});