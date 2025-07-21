$(document).ready(function() {
  // Sample report data
  const reports = [ 
    {
      id: 'RPT-1001',
      reporter: 'User123',
      reportedUser: 'SellerABC',
      type: 'scam',
      date: '2025-05-11 14:30',
      status: 'pending',
      priority: 'high',
      description: 'User reported SellerABC for not delivering item after payment'
    },
    {
      id: 'RPT-1002',
      reporter: 'User456',
      reportedUser: 'User789',
      type: 'violation',
      date: '2023-07-14 11:20',
      status: 'investigating',
      priority: 'medium',
      description: 'User reported inappropriate behavior in chat'
    },
    {
      id: 'RPT-1003',
      reporter: 'User012',
      reportedUser: 'SellerXYZ',
      type: 'transaction',
      date: '2023-07-13 09:45',
      status: 'resolved',
      priority: 'medium',
      description: 'Dispute over transaction amount'
    }
  ];

  // Initialize date range picker
  $('#dateRangeFilter').daterangepicker({
    opens: 'left',
    autoUpdateInput: false,
    locale: {
      cancelLabel: 'Clear'
    }
  });

  $('#dateRangeFilter').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });

  $('#dateRangeFilter').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
  });

  // Pagination variables
  let currentPage = 1;
  const rowsPerPage = 5;
  let filteredReports = [...reports];

  // Initialize the table and summary
  function initializeReports() {
    renderTable();
    updateSummary();
  }

  // Render the reports table
  function renderTable() {
    const tableBody = $('#reportsTable tbody');
    tableBody.empty();

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredReports.slice(startIndex, endIndex);

    if (paginatedData.length === 0) {
      tableBody.append('<tr><td colspan="8" class="text-center">No reports found</td></tr>');
    } else {
      paginatedData.forEach(report => {
        const statusClass = `badge-${report.status}`;
        const statusText = report.status.charAt(0).toUpperCase() + report.status.slice(1);
        const priorityClass = `badge-${report.priority}`;
        const priorityText = report.priority.charAt(0).toUpperCase() + report.priority.slice(1);
        const typeText = report.type.charAt(0).toUpperCase() + report.type.slice(1);
        
        const row = `
          <tr>
            <td>${report.id}</td>
            <td>${report.reporter}</td>
            <td>${report.reportedUser}</td>
            <td>${typeText}</td>
            <td>${report.date}</td>
            <td><span class="badge ${statusClass}">${statusText}</span></td>
            <td><span class="badge ${priorityClass}">${priorityText}</span></td>
            <td>
              <button class="btn btn-info btn-sm btn-action view-btn" data-id="${report.id}">
                <i class="fas fa-eye"></i>
              </button>
              <button class="btn btn-primary btn-sm btn-action action-btn" data-id="${report.id}">
                <i class="fas fa-cog"></i>
              </button>
            </td>
          </tr>
        `;
        tableBody.append(row);
      });
    }

    renderPagination();
    updatePageInfo();
  }

  // Update the summary cards
  function updateSummary() {
    const total = filteredReports.length;
    const pending = filteredReports.filter(r => r.status === 'pending').length;
    const investigating = filteredReports.filter(r => r.status === 'investigating').length;
    const resolved = filteredReports.filter(r => r.status === 'resolved').length;
    
    $('#totalReports').text(total);
    $('#pendingReports').text(pending);
    $('#investigatedReports').text(investigating);
    $('#resolvedReports').text(resolved);
  }

  // Render pagination
  function renderPagination() {
    const totalPages = Math.ceil(filteredReports.length / rowsPerPage);
    const pagination = $('#reportsPagination');
    pagination.empty();

    if (totalPages > 1) {
      // Previous button
      pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
          <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
        </li>
      `);

      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        pagination.append(`
          <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>
        `);
      }

      // Next button
      pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
          <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
        </li>
      `);
    }
  }

  // Update page info text
  function updatePageInfo() {
    const startIndex = (currentPage - 1) * rowsPerPage + 1;
    const endIndex = Math.min(currentPage * rowsPerPage, filteredReports.length);
    const total = filteredReports.length;
    
    $('#reportsPageInfo').text(`Showing ${startIndex} to ${endIndex} of ${total} entries`);
  }

  // Apply filters
  $('#applyFilters').on('click', function() {
    const typeFilter = $('#reportTypeFilter').val();
    const statusFilter = $('#statusFilter').val();
    const dateRange = $('#dateRangeFilter').val();
    
    filteredReports = reports.filter(report => {
      // Type filter
      if (typeFilter !== 'all' && report.type !== typeFilter) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== 'all' && report.status !== statusFilter) {
        return false;
      }
      
      // Date range filter
      if (dateRange) {
        const dates = dateRange.split(' - ');
        const startDate = new Date(dates[0]);
        const endDate = new Date(dates[1]);
        const reportDate = new Date(report.date.split(' ')[0]);
        
        if (reportDate < startDate || reportDate > endDate) {
          return false;
        }
      }
      
      return true;
    });
    
    currentPage = 1;
    renderTable();
    updateSummary();
  });

  // Reset filters
  $('#resetFilters').on('click', function() {
    $('#reportTypeFilter').val('all');
    $('#statusFilter').val('all');
    $('#dateRangeFilter').val('');
    
    filteredReports = [...reports];
    currentPage = 1;
    renderTable();
    updateSummary();
  });

  // Search functionality
  $('#searchReports').on('keyup', function() {
    const searchTerm = $(this).val().toLowerCase();
    filteredReports = reports.filter(report => 
      report.id.toLowerCase().includes(searchTerm) ||
      report.reporter.toLowerCase().includes(searchTerm) ||
      report.reportedUser.toLowerCase().includes(searchTerm) ||
      report.type.toLowerCase().includes(searchTerm) ||
      report.description.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    renderTable();
    updateSummary();
  });

  // Pagination click handler
  $(document).on('click', '.page-link', function(e) {
    e.preventDefault();
    const page = parseInt($(this).data('page'));
    if (!isNaN(page)) {
      currentPage = page;
      renderTable();
    }
  });

  // Button click handlers
  $(document).on('click', '.view-btn', function() {
    const reportId = $(this).data('id');
    const report = reports.find(r => r.id === reportId);
    
    // In a real app, you would open a modal with more details
    alert(`Viewing Report ${reportId}\n\nDescription: ${report.description}`);
  });

  $(document).on('click', '.action-btn', function() {
    const reportId = $(this).data('id');
    
    // In a real app, you would open an action modal
    alert(`Take action on report ${reportId}`);
  });

  // Initial render
  initializeReports();

  // Logout button handler
  $('#logoutBtn').click(function(e) {
    e.preventDefault();
    if(confirm('Are you sure you want to logout?')) {
      window.location.href = 'login.html';
    }
  });
});