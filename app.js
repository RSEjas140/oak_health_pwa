// Function to show the selected page and hide others
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';  // Show the selected page
    }
}

// Show the first page (Log an Oak) by default when the app loads
document.addEventListener('DOMContentLoaded', () => {
    showPage('logOak');  // Set 'logOak' page as default visible page
});