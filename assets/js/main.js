document.addEventListener('DOMContentLoaded', function () {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    body.classList.add(currentTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      const theme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
      localStorage.setItem('theme', theme);
    });
  }

  // Modal Request Submit rekber.html
  const submitRequestBtn = document.getElementById("submitRequest");
  if (submitRequestBtn) {
    submitRequestBtn.addEventListener("click", function () {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const agree = document.getElementById("agreeTerms").checked;

      if (name && email && agree) {
        const modalForm = bootstrap.Modal.getInstance(document.getElementById("requestModal"));
        modalForm.hide();

        const notifModal = new bootstrap.Modal(document.getElementById("notifModal"));
        setTimeout(() => notifModal.show(), 500);
      } else {
        alert("Mohon lengkapi semua data dan centang persetujuan sebelum mengirim.");
      }
    });
  }

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