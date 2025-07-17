//toogle faq.html
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        item.classList.toggle('active');
        const siblings = item.parentElement.querySelectorAll('.faq-item');
        siblings.forEach(sib => {
            if (sib !== item) sib.classList.remove('active');
        });
    });
});

//modal reportform
document.getElementById("reportForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Jika kamu ingin kirim data ke server, bisa pakai fetch() di sini

    // Tampilkan modal sukses
    const modal = new bootstrap.Modal(document.getElementById('reportSuccessModal'));
    modal.show();

    // Reset form setelah submit
    e.target.reset();
});

//toogle theme
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
document.addEventListener('DOMContentLoaded', function () {
    // Search Popup
    const produkData = [
      {
        title: "Apex Legends",
        tags: [
          { name: "Akun", url: "pages/game/apex.html" },
          { name: "Jasa/Joki", url: "pages/game/apex-jasa.html" }
        ]
      },
      {
        title: "Clash of Clans",
        tags: [
          { name: "Akun", url: "pages/game/clash-of-clans.html" },
        ]
      },
      {
        title: "Counter-Strike2",
        tags: [
          { name: "Akun/Item", url: "pages/game/cs2.html" }
        ]
      },
      {
        title: "Dota 2",
        tags: [
          { name: "Akun/Item", url: "pages/game/dota2.html" },
          { name: "Jasa/Joki", url: "pages/game/dota2-jasa.html" }
        ]
      },
      {
        title: "Dragon Nest classic",
        tags: [
          { name: "Akun/Item", url: "pages/game/dragon-nest.html" },
          { name: "Jasa/Joki", url: "pages/game/dragon-nest-jasa.html" }
        ]
      },
      {
        title: "Free Fire",
        tags: [
          { name: "Akun", url: "pages/game/free-fire.html" },
          { name: "Jasa/Joki", url: "pages/game/free-fire-jasa.html" }
        ]
      },
      {
        title: "Genshin Impact",
        tags: [
          { name: "Akun", url: "pages/game/genshin-impact.html" },
          { name: "Jasa/Joki", url: "pages/game/genshin-impact-jasa.html" }
        ]
      },
      {
        title: "Honor of Kings",
        tags: [
          { name: "Akun", url: "pages/game/honor-of-kings.html" },
          { name: "Jasa/Joki", url: "pages/game/honor-of-kings-jasa.html" }
        ]
      },
      {
        title: "Lineage2M",
        tags: [
          { name: "Akun/Diamond", url: "pages/game/l2m.html" },
          { name: "Jasa/Joki", url: "pages/game/l2m-jasa.html" }
        ]
      },
      {
        title: "Mobile Legends: Bang Bang",
        tags: [
          { name: "Akun", url: "pages/game/mobile-legend.html" },
          { name: "Jasa/Joki", url: "pages/game/mobile-legend-jasa.html" }
        ]
      },
      {
        title: "New World",
        tags: [
          { name: "Akun/Gold", url: "pages/game/new-world.html" }
        ]
      },
      {
        title: "Odin: Valhalla Rising",
        tags: [
          { name: "Akun", url: "pages/game/odin.html" },
          { name: "Jasa/Joki", url: "pages/game/odin-jasa.html" }
        ]
      },
      {
        title: "Path of Exile 2",
        tags: [
          { name: "Akun", url: "pages/game/poe.html" },
          { name: "Jasa/Joki", url: "pages/game/poe2-jasa.html" }
        ]
      },
      {
        title: "Point Blank",
        tags: [
          { name: "Akun", url: "pages/game/point-blank.html" },
          { name: "Jasa/Joki", url: "pages/game/point-blank-jasa.html" }
        ]
      },
      {
        title: "PUBG Mobile",
        tags: [
          { name: "Akun", url: "pages/game/pubg.html" },
          { name: "Jasa/Joki", url: "pages/game/pubg-jasa.html" }
        ]
      },
      {
        title: "Toram Online",
        tags: [
          { name: "Akun", url: "pages/game/toram.html" },
          { name: "Jasa/Joki", url: "pages/game/toram-jasa.html" }
        ]
      },
      {
        title: "Valorant",
        tags: [
          { name: "Akun", url: "pages/game/mobile-legend.html" },
          { name: "Jasa/Joki", url: "pages/game/mobile-legend-jasa.html" }
        ]
      },
      {
        title: "World of Warcraft",
        tags: [
          { name: "Akun", url: "pages/game/worldofwarcraft.html" },
          { name: "Gold/GT", url: "pages/game/worldofwarcraft-coin.html"},
          { name: "Jasa/Joki", url: "pages/game/worldofwarcraft-jasa.html" }
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