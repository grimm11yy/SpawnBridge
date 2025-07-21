// Sample data - in real app this would come from API
const users = [
  { 
    id: 1,
    username: 'user123', 
    email: 'user123@mail.com', 
    role: 'user', 
    status: 'active',
    avatar: '../dist/img/user1-128x128.jpg'
  },
  { 
    id: 2,
    username: 'seller88', 
    email: 'seller88@mail.com', 
    role: 'seller', 
    status: 'active',
    avatar: '../dist/img/user2-160x160.jpg'
  },
  { 
    id: 3,
    username: 'admin01', 
    email: 'admin01@mail.com', 
    role: 'admin', 
    status: 'active',
    avatar: '../dist/img/user3-128x128.jpg'
  },
  { 
    id: 4,
    username: 'user456', 
    email: 'user456@mail.com', 
    role: 'user', 
    status: 'suspended',
    avatar: '../dist/img/user4-128x128.jpg'
  },
  { 
    id: 5,
    username: 'gimmy.gimmy', 
    email: 'gimmy.gimmy@gmail.com', 
    role: 'user', 
    status: 'pending',
    avatar: '../dist/img/user5-128x128.jpg',
    sellerApplication: {
      fullName: 'Gimmy Pratama',
      nik: '1234567890123456',
      address: 'Jl. Merdeka No. 123, Bandung',
      phone: '081234567890',
      bankName: 'BCA',
      bankAccount: '1234567890',
      socialMedia: 'https://instagram.com/gimmy',
      profession: 'Mahasiswa',
      purpose: 'Pendapatan Sampingan',
      appliedDate: '2023-05-15'
    }
  },
  { 
    id: 6,
    username: 'fajar99', 
    email: 'fajar99@mail.com', 
    role: 'user', 
    status: 'pending',
    avatar: '../dist/img/user6-128x128.jpg',
    sellerApplication: {
      fullName: 'Fajar Setiawan',
      nik: '6543210987654321',
      address: 'Jl. Sudirman No. 456, Jakarta',
      phone: '082134567890',
      bankName: 'Mandiri',
      bankAccount: '0987654321',
      socialMedia: 'https://facebook.com/fajar',
      profession: 'Freelancer',
      purpose: 'Pendapatan Utama',
      appliedDate: '2023-05-18'
    }
  }
];

let currentRole = 'all';
let currentSearch = '';
let selectedUserId = null;

function renderTable() {
  const tbody = document.querySelector('#userTable tbody');
  tbody.innerHTML = '';

  const filteredUsers = users.filter(user => {
    // Filter by role
    if (currentRole === 'pending' && user.status !== 'pending') return false;
    if (currentRole !== 'all' && currentRole !== 'pending' && user.role !== currentRole) return false;
    
    // Filter by search
    if (currentSearch && 
        !user.username.toLowerCase().includes(currentSearch) && 
        !user.email.toLowerCase().includes(currentSearch)) {
      return false;
    }
    
    return true;
  });

  filteredUsers.forEach(user => {
    const roleBadge = user.role === 'user' ? 
      `<span class="badge bg-secondary">User</span>` : 
      user.role === 'seller' ? 
      `<span class="badge bg-info">Seller</span>` :
      `<span class="badge bg-primary">Admin</span>`;
    
    const statusBadge = user.status === 'active' ? 
      `<span class="badge bg-success">Active</span>` : 
      user.status === 'suspended' ?
      `<span class="badge bg-danger">Suspended</span>` :
      `<span class="badge bg-warning">Pending</span>`;
    
    let actionBtn = '';
    if (user.status === 'pending' && user.sellerApplication) {
      actionBtn = `
        <button class="btn btn-info btn-sm view-btn" data-id="${user.id}">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-success btn-sm review-btn" data-id="${user.id}">
          <i class="fas fa-user-check"></i> Review
        </button>
      `;
    } else {
      actionBtn = `
        <button class="btn btn-info btn-sm view-btn" data-id="${user.id}">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-primary btn-sm edit-btn" data-id="${user.id}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${user.id}">
          <i class="fas fa-trash"></i>
        </button>
      `;
    }

    tbody.innerHTML += `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${roleBadge}</td>
        <td>${statusBadge}</td>
        <td>${actionBtn}</td>
      </tr>
    `;
  });
}

// Tab switching
document.querySelectorAll('#userTabs .nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('#userTabs .nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    currentRole = this.getAttribute('data-role');
    renderTable();
  });
});

// Search functionality
document.getElementById('searchBtn').addEventListener('click', function() {
  currentSearch = document.getElementById('searchInput').value.toLowerCase();
  renderTable();
});

document.getElementById('searchInput').addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    currentSearch = this.value.toLowerCase();
    renderTable();
  }
});

// View button click
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('view-btn') || e.target.parentElement.classList.contains('view-btn')) {
    const btn = e.target.classList.contains('view-btn') ? e.target : e.target.parentElement;
    const userId = parseInt(btn.getAttribute('data-id'));
    const user = users.find(u => u.id === userId);
    
    if (user) {
      document.getElementById('modalUserAvatar').src = user.avatar;
      document.getElementById('modalUsername').value = user.username;
      document.getElementById('modalEmail').value = user.email;
      document.getElementById('modalRole').value = user.role;
      document.getElementById('modalStatus').value = user.status;
      
      // Disable editing in view mode
      document.getElementById('modalRole').disabled = true;
      document.getElementById('modalStatus').disabled = true;
      document.getElementById('saveUserBtn').style.display = 'none';
      
      $('#userModal').modal('show');
    }
  }
  
  // Edit button click
  if (e.target.classList.contains('edit-btn') || e.target.parentElement.classList.contains('edit-btn')) {
    const btn = e.target.classList.contains('edit-btn') ? e.target : e.target.parentElement;
    const userId = parseInt(btn.getAttribute('data-id'));
    const user = users.find(u => u.id === userId);
    
    if (user) {
      selectedUserId = userId;
      document.getElementById('modalUserAvatar').src = user.avatar;
      document.getElementById('modalUsername').value = user.username;
      document.getElementById('modalEmail').value = user.email;
      document.getElementById('modalRole').value = user.role;
      document.getElementById('modalStatus').value = user.status;
      
      // Enable editing in edit mode
      document.getElementById('modalRole').disabled = false;
      document.getElementById('modalStatus').disabled = false;
      document.getElementById('saveUserBtn').style.display = 'block';
      
      $('#userModal').modal('show');
    }
  }
  
  // Review button click (for seller applications)
  if (e.target.classList.contains('review-btn') || e.target.parentElement.classList.contains('review-btn')) {
    const btn = e.target.classList.contains('review-btn') ? e.target : e.target.parentElement;
    const userId = parseInt(btn.getAttribute('data-id'));
    const user = users.find(u => u.id === userId);
    
    if (user && user.sellerApplication) {
      selectedUserId = userId;
      
      // Fill seller modal with data
      document.getElementById('sellerAvatar').src = user.avatar;
      document.getElementById('sellerUsername').textContent = user.username;
      document.getElementById('sellerEmail').textContent = user.email;
      document.getElementById('sellerAppliedDate').textContent = user.sellerApplication.appliedDate;
      
      // Personal info
      document.getElementById('sellerFullName').textContent = user.sellerApplication.fullName;
      document.getElementById('sellerNik').textContent = user.sellerApplication.nik;
      document.getElementById('sellerPhone').textContent = user.sellerApplication.phone;
      document.getElementById('sellerAddress').textContent = user.sellerApplication.address;
      
      // Bank info
      document.getElementById('sellerBankName').textContent = user.sellerApplication.bankName;
      document.getElementById('sellerBankAccount').textContent = user.sellerApplication.bankAccount;
      
      // Additional info
      document.getElementById('sellerSocialMedia').href = user.sellerApplication.socialMedia;
      document.getElementById('sellerSocialMedia').textContent = user.sellerApplication.socialMedia;
      document.getElementById('sellerProfession').textContent = user.sellerApplication.profession;
      document.getElementById('sellerPurpose').textContent = user.sellerApplication.purpose;
      
      $('#sellerModal').modal('show');
    }
  }
  
  // Delete button click
  if (e.target.classList.contains('delete-btn') || e.target.parentElement.classList.contains('delete-btn')) {
    if (confirm('Are you sure you want to delete this user?')) {
      const btn = e.target.classList.contains('delete-btn') ? e.target : e.target.parentElement;
      const userId = parseInt(btn.getAttribute('data-id'));
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        renderTable();
        alert('User deleted successfully!');
      }
    }
  }
});

// Save changes button (for user modal)
document.getElementById('saveUserBtn').addEventListener('click', function() {
  if (selectedUserId) {
    const userIndex = users.findIndex(u => u.id === selectedUserId);
    if (userIndex !== -1) {
      users[userIndex].role = document.getElementById('modalRole').value;
      users[userIndex].status = document.getElementById('modalStatus').value;
      renderTable();
      $('#userModal').modal('hide');
      alert('User updated successfully!');
    }
  }
});

// Approve seller button
document.getElementById('approveSellerBtn').addEventListener('click', function() {
  if (selectedUserId) {
    const userIndex = users.findIndex(u => u.id === selectedUserId);
    if (userIndex !== -1) {
      users[userIndex].role = 'seller';
      users[userIndex].status = 'active';
      renderTable();
      $('#sellerModal').modal('hide');
      alert('Seller application approved successfully!');
    }
  }
});

// Reject seller button
document.getElementById('rejectSellerBtn').addEventListener('click', function() {
  if (selectedUserId) {
    const userIndex = users.findIndex(u => u.id === selectedUserId);
    if (userIndex !== -1) {
      users[userIndex].status = 'active';
      users[userIndex].sellerApplication = null;
      renderTable();
      $('#sellerModal').modal('hide');
      alert('Seller application rejected!');
    }
  }
});

// Initialize table on load
document.addEventListener('DOMContentLoaded', renderTable);

// Logout button handler
$('#logoutBtn').click(function(e) {
  e.preventDefault();
  if(confirm('Are you sure you want to logout?')) {
    window.location.href = 'login.html';
  }
});