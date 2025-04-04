<script>
    function showPage(pageId, title) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');

        const header = document.getElementById('page-header');

        if (pageId === 'splashPage') {
            header.style.display = 'none';  // Hide header on splash page
        } else {
            header.style.display = 'flex';  // Show header on all other pages
            document.getElementById('page-title').textContent = title; // Update title
        }
    }

    function hideHeader() {
        document.getElementById('page-header').style.display = 'none';
    }
</script>