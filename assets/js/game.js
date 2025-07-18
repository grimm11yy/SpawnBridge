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
document.addEventListener('DOMContentLoaded', function () {
    // Search Popup
    const produkData = [
      {
        title: "Apex Legends",
        tags: [
          { name: "Akun", url: "apex.html" },
          { name: "Jasa/Joki", url: "apex-jasa.html" }
        ]
      },
      {
        title: "Clash of Clans",
        tags: [
          { name: "Akun", url: "clash-of-clans.html" },
        ]
      },
      {
        title: "Counter-Strike2",
        tags: [
          { name: "Akun/Item", url: "cs2.html" }
        ]
      },
      {
        title: "Dota 2",
        tags: [
          { name: "Akun/Item", url: "dota2.html" },
          { name: "Jasa/Joki", url: "dota2-jasa.html" }
        ]
      },
      {
        title: "Dragon Nest classic",
        tags: [
          { name: "Akun/Item", url: "dragon-nest.html" },
          { name: "Jasa/Joki", url: "dragon-nest-jasa.html" }
        ]
      },
      {
        title: "Free Fire",
        tags: [
          { name: "Akun", url: "free-fire.html" },
          { name: "Jasa/Joki", url: "free-fire-jasa.html" }
        ]
      },
      {
        title: "Genshin Impact",
        tags: [
          { name: "Akun", url: "genshin-impact.html" },
          { name: "Jasa/Joki", url: "genshin-impact-jasa.html" }
        ]
      },
      {
        title: "Honor of Kings",
        tags: [
          { name: "Akun", url: "honor-of-kings.html" },
          { name: "Jasa/Joki", url: "honor-of-kings-jasa.html" }
        ]
      },
      {
        title: "Lineage2M",
        tags: [
          { name: "Akun/Diamond", url: "l2m.html" },
          { name: "Jasa/Joki", url: "l2m-jasa.html" }
        ]
      },
      {
        title: "Mobile Legends: Bang Bang",
        tags: [
          { name: "Akun", url: "mobile-legend.html" },
          { name: "Jasa/Joki", url: "mobile-legend-jasa.html" }
        ]
      },
      {
        title: "New World",
        tags: [
          { name: "Akun/Gold", url: "new-world.html" }
        ]
      },
      {
        title: "Odin: Valhalla Rising",
        tags: [
          { name: "Akun", url: "odin.html" },
          { name: "Jasa/Joki", url: "odin-jasa.html" }
        ]
      },
      {
        title: "Path of Exile 2",
        tags: [
          { name: "Akun", url: "poe.html" },
          { name: "Jasa/Joki", url: "poe2-jasa.html" }
        ]
      },
      {
        title: "Point Blank",
        tags: [
          { name: "Akun", url: "point-blank.html" },
          { name: "Jasa/Joki", url: "point-blank-jasa.html" }
        ]
      },
      {
        title: "PUBG Mobile",
        tags: [
          { name: "Akun", url: "pubg.html" },
          { name: "Jasa/Joki", url: "pubg-jasa.html" }
        ]
      },
      {
        title: "Toram Online",
        tags: [
          { name: "Akun", url: "toram.html" },
          { name: "Jasa/Joki", url: "toram-jasa.html" }
        ]
      },
      {
        title: "Valorant",
        tags: [
          { name: "Akun", url: "mobile-legend.html" },
          { name: "Jasa/Joki", url: "mobile-legend-jasa.html" }
        ]
      },
      {
        title: "World of Warcraft",
        tags: [
          { name: "Akun", url: "worldofwarcraft.html" },
          { name: "Gold/GT", url: "worldofwarcraft-coin.html"},
          { name: "Jasa/Joki", url: "worldofwarcraft-jasa.html" }
        ]
      }
    ];
    
    const input = document.getElementById('searchInput');
    const popup = document.getElementById('searchPopup');
  
    if (input && popup) {
      input.addEventListener('input', function () {
        const keyword = this.value.toLowerCase();
        popup.innerHTML = '';
  
        if (keyword.length === 0) {
          popup.classList.add('d-none');
          return;
        }
  
        const filtered = produkData.filter(item => item.title.toLowerCase().includes(keyword));
  
        if (filtered.length === 0) {
          popup.classList.add('d-none');
          return;
        }
  
        filtered.forEach(item => {
          const container = document.createElement('div');
          const title = document.createElement('h4');
          title.textContent = item.title;
  
          const tagContainer = document.createElement('div');
          tagContainer.classList.add('tags');
  
          item.tags.forEach(tag => {
            const tagEl = document.createElement('a');
            tagEl.classList.add('tag');
            tagEl.textContent = tag.name;
            tagEl.href = tag.url;
            tagEl.style.textDecoration = 'none'; // opsional
            tagEl.style.cursor = 'pointer';     // opsional
            tagContainer.appendChild(tagEl);
          });
          
  
          container.appendChild(title);
          container.appendChild(tagContainer);
          popup.appendChild(container);
        });
  
        popup.classList.remove('d-none');
      });
    }
  });
