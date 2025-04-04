function showPage(pageId, title = "Default Title") {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update the page title dynamically
    document.getElementById('page-title').textContent = title;
}