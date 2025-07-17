document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Save theme preference
            const theme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
            localStorage.setItem('theme', theme);
        });
    }
});

// Fungsi untuk membuka profile popup di posisi mouse
function openProfilePopup(username, avatarSrc, event) {
    const popup = document.getElementById('profilePopup');
    const avatar = document.getElementById('popupAvatar');
    const name = document.getElementById('popupUsername');

    // Set data in profile popup
    avatar.src = avatarSrc;
    name.textContent = username;

    // Set data in modal detail
    const modalUsername = document.getElementById('modalUsername');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalUserId = document.getElementById('modalUserId');
    const modalAbout = document.getElementById('modalAbout');
    const modalJoinDate = document.getElementById('modalJoinDate');

    if (modalUsername && modalAvatar && modalUserId) {
        modalUsername.textContent = username;
        modalAvatar.src = avatarSrc;
        modalUserId.textContent = 'SB-' + Math.floor(100000 + Math.random() * 900000);
        modalAbout.textContent = 'Passionate gamer and Apex Legends enthusiast. Always looking for squad mates!';
        modalJoinDate.textContent = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        });
    }

    // Position popup near mouse
    popup.style.left = (event.pageX + 10) + 'px';
    popup.style.top = (event.pageY + 10) + 'px';
    popup.style.display = 'block';

    // Close popup when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function handler(e) {
            if (!popup.contains(e.target)) {
                popup.style.display = 'none';
                document.removeEventListener('click', handler);
            }
        });
    }, 10);
}

// Fungsi untuk mention @username ke kolom input
function mentionUser(username) {
    const input = document.getElementById("chatInput");
    const mention = `@${username} `;

    if (input) {
        const start = input.selectionStart || input.value.length;
        const end = input.selectionEnd || input.value.length;
        const text = input.value;

        // Insert mention at cursor position
        input.value = text.substring(0, start) + mention + text.substring(end);
        input.focus();

        // Place cursor after mention
        input.selectionStart = input.selectionEnd = start + mention.length;
    }
}