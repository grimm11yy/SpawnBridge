// Theme toggle functionality
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    const moonIcon = this.querySelector('.fa-moon');
    const sunIcon = this.querySelector('.fa-sun');
    
    if (document.body.classList.contains('dark-mode')) {
        moonIcon.style.opacity = '0';
        sunIcon.style.opacity = '1';
    } else {
        moonIcon.style.opacity = '1';
        sunIcon.style.opacity = '0';
    }
});

// Transaction modal handler
const transactionModal = document.getElementById('transactionModal');
if (transactionModal) {
    transactionModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const transactionId = button.getAttribute('data-id');
        const modalTitle = transactionModal.querySelector('.modal-title');
        
        // Update modal title with transaction ID
        modalTitle.textContent = 'Detail Transaksi ' + transactionId;
        
        // In a real app, you would fetch transaction details here
        // and update the modal content accordingly
    });
}

// Filter functionality
document.querySelector('.filter-button').addEventListener('click', function() {
    const status = document.getElementById('status-filter').value;
    const date = document.getElementById('date-filter').value;
    const search = document.getElementById('search-filter').value.toLowerCase();
    
    // In a real app, you would filter the transactions here
    // or make an API call with the filter parameters
    console.log('Filtering by:', {status, date, search});
});
document.addEventListener('DOMContentLoaded', function () {
    // Search Popup
    const produkData = [
      {
        title: "Apex Legends",
        tags: [
          { name: "Akun", url: "../game/apex.html" },
          { name: "Jasa/Joki", url: "../game/apex-jasa.html" }
        ]
      },
      {
        title: "Clash of Clans",
        tags: [
          { name: "Akun", url: "../game/clash-of-clans.html" },
        ]
      },
      {
        title: "Counter-Strike2",
        tags: [
          { name: "Akun/Item", url: "../game/cs2.html" }
        ]
      },
      {
        title: "Dota 2",
        tags: [
          { name: "Akun/Item", url: "../game/dota2.html" },
          { name: "Jasa/Joki", url: "../game/dota2-jasa.html" }
        ]
      },
      {
        title: "Dragon Nest classic",
        tags: [
          { name: "Akun/Item", url: "../game/dragon-nest.html" },
          { name: "Jasa/Joki", url: "../game/dragon-nest-jasa.html" }
        ]
      },
      {
        title: "Free Fire",
        tags: [
          { name: "Akun", url: "../game/free-fire.html" },
          { name: "Jasa/Joki", url: "../game/free-fire-jasa.html" }
        ]
      },
      {
        title: "Genshin Impact",
        tags: [
          { name: "Akun", url: "../game/genshin-impact.html" },
          { name: "Jasa/Joki", url: "../game/genshin-impact-jasa.html" }
        ]
      },
      {
        title: "Honor of Kings",
        tags: [
          { name: "Akun", url: "../game/honor-of-kings.html" },
          { name: "Jasa/Joki", url: "../game/honor-of-kings-jasa.html" }
        ]
      },
      {
        title: "Lineage2M",
        tags: [
          { name: "Akun/Diamond", url: "../game/l2m.html" },
          { name: "Jasa/Joki", url: "../game/l2m-jasa.html" }
        ]
      },
      {
        title: "Mobile Legends: Bang Bang",
        tags: [
          { name: "Akun", url: "../game/mobile-legend.html" },
          { name: "Jasa/Joki", url: "../game/mobile-legend-jasa.html" }
        ]
      },
      {
        title: "New World",
        tags: [
          { name: "Akun/Gold", url: "../game/new-world.html" }
        ]
      },
      {
        title: "Odin: Valhalla Rising",
        tags: [
          { name: "Akun", url: "../game/odin.html" },
          { name: "Jasa/Joki", url: "../game/odin-jasa.html" }
        ]
      },
      {
        title: "Path of Exile 2",
        tags: [
          { name: "Akun", url: "../game/poe.html" },
          { name: "Jasa/Joki", url: "../game/poe2-jasa.html" }
        ]
      },
      {
        title: "Point Blank",
        tags: [
          { name: "Akun", url: "../game/point-blank.html" },
          { name: "Jasa/Joki", url: "../game/point-blank-jasa.html" }
        ]
      },
      {
        title: "PUBG Mobile",
        tags: [
          { name: "Akun", url: "../game/pubg.html" },
          { name: "Jasa/Joki", url: "../game/pubg-jasa.html" }
        ]
      },
      {
        title: "Toram Online",
        tags: [
          { name: "Akun", url: "../game/toram.html" },
          { name: "Jasa/Joki", url: "../game/toram-jasa.html" }
        ]
      },
      {
        title: "Valorant",
        tags: [
          { name: "Akun", url: "../game/mobile-legend.html" },
          { name: "Jasa/Joki", url: "../game/mobile-legend-jasa.html" }
        ]
      },
      {
        title: "World of Warcraft",
        tags: [
          { name: "Akun", url: "../game/worldofwarcraft.html" },
          { name: "Gold/GT", url: "../game/worldofwarcraft-coin.html"},
          { name: "Jasa/Joki", url: "../game/worldofwarcraft-jasa.html" }
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
