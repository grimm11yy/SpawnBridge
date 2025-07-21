$(document).ready(function() {
  // Initialize Summernote editor
  $('.summernote').summernote({
    height: 200,
    toolbar: [
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ]
  });

  // Initialize custom file input
  bsCustomFileInput.init();

  // Sample data for announcements
  let announcements = [
    {
      id: 'ann-001',
      title: 'System Maintenance Scheduled',
      type: 'maintenance',
      content: '<p>We will be performing scheduled maintenance on our servers on <strong>July 25, 2023 from 2:00 AM to 5:00 AM UTC</strong>. During this time, the platform may be temporarily unavailable.</p><p>We apologize for any inconvenience and appreciate your understanding.</p>',
      startDate: '2023-07-25T02:00',
      endDate: '2023-07-25T05:00',
      priority: 'high',
      status: 'scheduled',
      image: 'https://via.placeholder.com/800x400?text=Maintenance'
    },
    {
      id: 'ann-002',
      title: 'New Community Guidelines',
      type: 'info',
      content: '<p>We have updated our community guidelines to ensure a better experience for all users. Please review the changes:</p><ul><li>Stricter rules against scam attempts</li><li>Clearer transaction policies</li><li>Enhanced privacy protections</li></ul><p>Violations may result in account suspension.</p>',
      startDate: '2023-07-20T00:00',
      endDate: '',
      priority: 'medium',
      status: 'active',
      image: 'https://via.placeholder.com/800x400?text=Guidelines'
    },
    {
      id: 'ann-003',
      title: 'Summer Sale - 50% Off Fees',
      type: 'promotion',
      content: '<p>Celebrate summer with us! Enjoy <strong>50% off all transaction fees</strong> from July 15 to July 31.</p><p>Promo code: <code>SUMMER2023</code></p><p><em>Terms and conditions apply. Limited time offer.</em></p>',
      startDate: '2023-07-15T00:00',
      endDate: '2023-07-31T23:59',
      priority: 'high',
      status: 'active',
      image: 'https://via.placeholder.com/800x400?text=Summer+Sale'
    }
  ];

  // Initialize the page
  function initializePage() {
    renderAnnouncementsTable();
    setupEventListeners();
  }

  // Render announcements table
  function renderAnnouncementsTable() {
    const tableBody = $('#announcementsTable tbody');
    tableBody.empty();

    if (announcements.length === 0) {
      tableBody.append('<tr><td colspan="7" class="text-center">No announcements found</td></tr>');
      return;
    }

    announcements.forEach(announcement => {
      const statusClass = getStatusClass(announcement.status);
      const priorityClass = getPriorityClass(announcement.priority);
      const typeBadge = getTypeBadge(announcement.type);
      
      const row = `
        <tr data-id="${announcement.id}">
          <td>
            <strong>${announcement.title}</strong>
          </td>
          <td>
            ${typeBadge}
          </td>
          <td>
            ${formatDateTime(announcement.startDate)}
          </td>
          <td>
            ${announcement.endDate ? formatDateTime(announcement.endDate) : 'N/A'}
          </td>
          <td>
            <span class="status-indicator ${statusClass}"></span>
            ${announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
          </td>
          <td class="${priorityClass}">
            ${announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
          </td>
          <td>
            <button class="btn btn-info btn-sm view-btn" data-id="${announcement.id}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-primary btn-sm edit-btn" data-id="${announcement.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${announcement.id}">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
      tableBody.append(row);
    });
  }

  // Get status class
  function getStatusClass(status) {
    switch(status) {
      case 'active': return 'status-active';
      case 'scheduled': return 'status-scheduled';
      case 'expired': return 'status-expired';
      default: return '';
    }
  }

  // Get priority class
  function getPriorityClass(priority) {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'urgent': return 'priority-urgent';
      default: return '';
    }
  }

  // Get type badge
  function getTypeBadge(type) {
    let badgeClass, typeText;
    
    switch(type) {
      case 'info':
        badgeClass = 'badge-info';
        typeText = 'Information';
        break;
      case 'warning':
        badgeClass = 'badge-warning';
        typeText = 'Warning';
        break;
      case 'maintenance':
        badgeClass = 'badge-secondary';
        typeText = 'Maintenance';
        break;
      case 'event':
        badgeClass = 'badge-primary';
        typeText = 'Event';
        break;
      case 'promotion':
        badgeClass = 'badge-success';
        typeText = 'Promotion';
        break;
      default:
        badgeClass = 'badge-info';
        typeText = 'Information';
    }
    
    return `<span class="badge ${badgeClass}">${typeText}</span>`;
  }

  // Format datetime
  function formatDateTime(datetimeStr) {
    if (!datetimeStr) return 'N/A';
    
    const date = new Date(datetimeStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Setup event listeners
  function setupEventListeners() {
    // Save new announcement
    $('#saveAnnouncement').on('click', function() {
      const title = $('#announcementTitle').val().trim();
      const type = $('#announcementType').val();
      const content = $('#announcementContent').val();
      const startDate = $('#startDate').val();
      const endDate = $('#endDate').val();
      const priority = $('#announcementPriority').val();
      const publishNow = $('#publishNow').is(':checked');
      
      if (!title || !content || !startDate) {
        alert('Please fill in all required fields');
        return;
      }
      
      const newAnnouncement = {
        id: 'ann-' + Date.now(),
        title,
        type,
        content,
        startDate,
        endDate,
        priority,
        status: publishNow ? 'active' : 'scheduled',
        image: '' // In real app, handle image upload
      };
      
      announcements.unshift(newAnnouncement);
      renderAnnouncementsTable();
      $('#addAnnouncementModal').modal('hide');
      resetForm();
      
      alert('Announcement created successfully!');
    });
    
    // View announcement
    $(document).on('click', '.view-btn', function() {
      const announcementId = $(this).data('id');
      const announcement = announcements.find(a => a.id === announcementId);
      
      if (announcement) {
        $('#viewAnnouncementTitle').text(announcement.title);
        $('#viewAnnouncementType').html(getTypeBadge(announcement.type));
        $('#viewAnnouncementPriority').text(announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1));
        $('#viewAnnouncementDate').text(`Published: ${formatDateTime(announcement.startDate)}`);
        $('#viewAnnouncementContent').html(announcement.content);
        
        if (announcement.image) {
          $('#viewAnnouncementImage').html(`<img src="${announcement.image}" class="img-fluid" alt="Announcement Image">`);
        } else {
          $('#viewAnnouncementImage').html('');
        }
        
        $('#viewAnnouncementModal').modal('show');
      }
    });
    
    // Edit announcement
    $(document).on('click', '.edit-btn', function() {
      const announcementId = $(this).data('id');
      alert('Edit functionality would be implemented for announcement: ' + announcementId);
    });
    
    // Delete announcement
    $(document).on('click', '.delete-btn', function() {
      const announcementId = $(this).data('id');
      
      if (confirm('Are you sure you want to delete this announcement?')) {
        announcements = announcements.filter(a => a.id !== announcementId);
        renderAnnouncementsTable();
        alert('Announcement deleted successfully!');
      }
    });
    
    // Edit button in view modal
    $('#editAnnouncementBtn').on('click', function() {
      $('#viewAnnouncementModal').modal('hide');
      const announcementId = $('#viewAnnouncementModal').data('currentId');
      alert('Edit functionality would be implemented for announcement: ' + announcementId);
    });
  }
  
  // Reset form
  function resetForm() {
    $('#announcementForm')[0].reset();
    $('#announcementContent').summernote('reset');
    $('.custom-file-label').text('Choose file');
  }

  // Initialize the page
  initializePage();

  // Logout button handler
  $('#logoutBtn').click(function(e) {
    e.preventDefault();
    if(confirm('Are you sure you want to logout?')) {
      window.location.href = 'login.html';
    }
  });
});