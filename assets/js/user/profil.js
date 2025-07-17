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

// Edit profile functionality
let isEditing = false;
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent === 'Edit') {
            // Switch to edit mode
            isEditing = true;
            document.querySelectorAll('.profile-field input').forEach(input => {
                input.readOnly = false;
                input.style.backgroundColor = 'white';
            });
            document.querySelectorAll('.edit-btn')[0].textContent = 'Cancel';
            document.querySelectorAll('.edit-btn')[1].textContent = 'Save';
        } else if (this.textContent === 'Cancel') {
            // Cancel editing
            isEditing = false;
            document.querySelectorAll('.profile-field input').forEach(input => {
                input.readOnly = true;
                input.style.backgroundColor = '';
            });
            document.querySelectorAll('.edit-btn')[0].textContent = 'Edit';
            document.querySelectorAll('.edit-btn')[1].textContent = 'Save Changes';
        } else if (this.textContent === 'Save') {
            // Save changes
            isEditing = false;
            document.querySelectorAll('.profile-field input').forEach(input => {
                input.readOnly = true;
                input.style.backgroundColor = '';
            });
            document.querySelectorAll('.edit-btn')[0].textContent = 'Edit';
            document.querySelectorAll('.edit-btn')[1].textContent = 'Save Changes';
            alert('Profile updated successfully!');
        }
    });
});

// Simulasi user login data dari backend (ganti dengan data asli nanti)
const currentUser = {
    username: "gimmy.gimmy",
    isSeller: false // jika false → tampilkan form upgrade
};

// Fungsi untuk render ulang konten tab jika user sudah seller
function renderSellerTab() {
    // Ubah label tab
    const upgradeTab = document.getElementById("v-pills-upgrade-tab");
    upgradeTab.innerHTML = '<i class="fas fa-store me-2"></i> Profil Penjual';

    // Ubah isi konten tab
    const upgradeContent = document.getElementById("v-pills-upgrade");
    upgradeContent.innerHTML = `
        <div class="upgrade-seller-container">
            <h3><i class="fas fa-store me-2"></i> Anda adalah Penjual Terverifikasi</h3>
            <p>Informasi akun penjual Anda:</p>
            <ul class="list-group mb-3">
                <li class="list-group-item"><strong>Nama Seller:</strong> ${currentUser.username}</li>
                <li class="list-group-item"><strong>Nomor Rekening:</strong> 1234567890 (BCA)</li>
                <li class="list-group-item"><strong>Nomor Telepon:</strong> 0812-3456-7890</li>
            </ul>
        </div>
    `;
}
        
// Jalankan saat DOM sudah siap
document.addEventListener("DOMContentLoaded", () => {
    if (currentUser.isSeller) {
        renderSellerTab();
    }
});
document.addEventListener("DOMContentLoaded", function () {
  const nikInput = document.getElementById("nik");
  const nikError = document.getElementById("nik-error");

  nikInput.addEventListener("input", function () {
    const nik = nikInput.value.trim();

    if (nik.length === 0) {
      nikError.style.display = "none";
    } else if (nik.length < 16) {
      nikError.textContent = "NIK kurang dari 16 digit.";
      nikError.style.color = "red";
      nikError.style.display = "block";
    } else if (nik.length === 16) {
      nikError.textContent = "NIK sudah terpenuhi.";
      nikError.style.color = "green";
      nikError.style.display = "block";
    } else {
      nikError.textContent = "NIK melebihi 16 digit.";
      nikError.style.color = "red";
      nikError.style.display = "block";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");
    const checkbox = document.getElementById("termsCheckbox");
    const errorBox = document.getElementById("terms-error");

    submitBtn.addEventListener("click", function (e) {
        if (!checkbox.checked) {
            e.preventDefault(); // cegah form submit
            errorBox.textContent = "Anda harus setuju sebelum mendaftar.";
            errorBox.style.display = "block";
        } else {
            errorBox.style.display = "none";
        }
    });
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