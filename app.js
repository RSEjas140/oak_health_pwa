function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');

    // Show or hide the header based on the active page
    const header = document.getElementById('header');
    if (pageId === 'splashPage') {
        header.style.display = 'none';  // Hide only on splash
    } else {
        header.style.display = 'flex';  // Show on all other pages
    }
}

