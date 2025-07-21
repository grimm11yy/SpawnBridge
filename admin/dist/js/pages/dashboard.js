$(function () {
  'use strict';

  // PIE CHART
  var pieChartCanvas = $('#pieChart').get(0).getContext('2d');
  var pieData = {
    labels: ['Dibatalkan', 'Berhasil', 'Pending', 'Proses'],
    datasets: [{
      data: [3, 11, 0, 2],
      backgroundColor: ['#f28b82', '#81c995', '#fbbc04', '#66c2ff']
    }]
  };
  var pieOptions = {
    maintainAspectRatio: false,
    responsive: true
  };
  new Chart(pieChartCanvas, {
    type: 'pie',
    data: pieData,
    options: pieOptions
  });

  // DOUGHNUT CHART
  var donutChartCanvas = $('#sales-chart-canvas').get(0).getContext('2d');
  var donutData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli'],
    datasets: [{
      data: [301, 289, 299, 246, 288, 309, 311],
      backgroundColor: ['#f28b82', '#81c995', '#fbbc04', '#66c2ff', '#b39ddb', '#d4e157', '#ffab91'],
    }]
  };
  var donutOptions = {
    maintainAspectRatio: false,
    responsive: true
  };
  new Chart(donutChartCanvas, {
    type: 'doughnut',
    data: donutData,
    options: donutOptions
  });

  // LINE CHART (Morris-style Transaksi Mingguan)
  var revenueChartCanvas = $('#revenue-chart-canvas').get(0).getContext('2d');
  var revenueData = {
    labels: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    datasets: [{
      label: 'Transaksi',
      backgroundColor: 'rgba(60,141,188,0.9)',
      borderColor: 'rgba(60,141,188,0.8)',
      data: [12, 11, 13, 10, 9, 11, 16],
      fill: true
    }]
  };
  var revenueOptions = {
    maintainAspectRatio: false,
    responsive: true
  };
  new Chart(revenueChartCanvas, {
    type: 'line',
    data: revenueData,
    options: revenueOptions
  });

  // The Calendar
$('#calendar').datetimepicker({
  format: 'L',
  inline: true
})

// Logout button handler
$('#logoutBtn').click(function(e) {
  e.preventDefault();
  if(confirm('Are you sure you want to logout?')) {
    window.location.href = 'login.html';
  }
});
});