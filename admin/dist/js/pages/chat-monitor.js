$(document).ready(function() {
  // Current active room
  let currentRoom = 'apex-legends';
  let autoRefreshInterval = null;
  let isAutoRefreshOn = false;

  // Initialize the chat monitor
  function initializeChatMonitor() {
    loadChatRooms();
    loadChatMessages(currentRoom);
    setupEventListeners();
  }

  
  // Load chat rooms
  function loadChatRooms() {
    // In a real app, this would fetch from API
    $('#chatRoomsList a').on('click', function(e) {
      e.preventDefault();
      const room = $(this).data('room');
      currentRoom = room;
      
      // Update active state
      $('#chatRoomsList a').removeClass('active');
      $(this).addClass('active');
      
      // Update title
      const roomName = $(this).text().trim();
      $('#currentRoomTitle').html(`<i class="fas fa-gamepad mr-2"></i> ${roomName} Chat`);
      
      // Load messages
      loadChatMessages(room);
    });
  }

  // Load chat messages for a room
  function loadChatMessages(room) {
    // Show loading state
    $('#monitorChatMessages').html('<div class="text-center py-5"><i class="fas fa-spinner fa-spin"></i> Loading messages...</div>');
    
    // Simulate API call
    setTimeout(function() {
      // In a real app, this would fetch messages from API
      const sampleMessages = generateSampleMessages(room);
      renderMessages(sampleMessages);
    }, 500);
  }

  // Generate sample messages for demo
  function generateSampleMessages(room) {
    const rooms = {
      'apex-legends': [
        {
          id: 'msg1',
          user: 'User123',
          avatar: 'https://via.placeholder.com/40',
          content: 'WTS Apex Legends account level 200 with 5 heirlooms',
          timestamp: '10:30 AM',
          flagged: false
        },
        {
          id: 'msg2',
          user: 'User456',
          avatar: 'https://via.placeholder.com/40',
          content: 'Contact me on WhatsApp for cheap coins: 08123456789',
          timestamp: '10:32 AM',
          flagged: true,
          flagReason: 'scam'
        },
        {
          id: 'msg3',
          user: 'User789',
          avatar: 'https://via.placeholder.com/40',
          content: 'Looking for teammates to play ranked. Currently Plat 2',
          timestamp: '10:35 AM',
          flagged: false
        }
      ],
      'valorant': [
        {
          id: 'msg4',
          user: 'ValorantPlayer',
          avatar: 'https://via.placeholder.com/40',
          content: 'Selling Radiant account with all skins',
          timestamp: '9:15 AM',
          flagged: false
        },
        {
          id: 'msg5',
          user: 'SmurfAccount',
          avatar: 'https://via.placeholder.com/40',
          content: 'Selling accounts! Selling accounts! Selling accounts!',
          timestamp: '9:20 AM',
          flagged: true,
          flagReason: 'spam'
        }
      ],
      'mobile-legends': [
        {
          id: 'msg6',
          user: 'MLPro',
          avatar: 'https://via.placeholder.com/40',
          content: 'Joki rank Mythic, fast and cheap',
          timestamp: '11:45 AM',
          flagged: false
        }
      ]
    };

    return rooms[room] || [];
  }

  // Render messages to the chat container
  function renderMessages(messages) {
    const chatContainer = $('#monitorChatMessages');
    chatContainer.empty();

    if (messages.length === 0) {
      chatContainer.html('<div class="text-center py-5 text-muted">No messages in this room</div>');
      return;
    }

    messages.forEach(msg => {
      const messageClass = msg.flagged ? 'message flagged' : 'message';
      const flagBadge = msg.flagged ? `<span class="badge badge-danger">Flagged</span>` : '';
      
      const actions = msg.flagged ? `
        <button class="btn btn-sm btn-success approve-btn" data-id="${msg.id}" title="Approve Message">
          <i class="fas fa-check"></i>
        </button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${msg.id}" title="Delete Message">
          <i class="fas fa-trash"></i>
        </button>
        <button class="btn btn-sm btn-warning ban-btn" data-user="${msg.user}" title="Ban User">
          <i class="fas fa-ban"></i>
        </button>
      ` : `
        <button class="btn btn-sm btn-warning flag-btn" data-id="${msg.id}" title="Flag Message">
          <i class="fas fa-flag"></i>
        </button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${msg.id}" title="Delete Message">
          <i class="fas fa-trash"></i>
        </button>
      `;

      const messageHtml = `
        <div class="${messageClass}" data-id="${msg.id}">
          <div class="message-header">
            <img src="${msg.avatar}" alt="${msg.user}" class="user-avatar">
            <span class="username">${msg.user}</span>
            <span class="timestamp">${msg.timestamp}</span>
            ${flagBadge}
            <div class="message-actions">
              ${actions}
            </div>
          </div>
          <div class="message-content">
            ${msg.content}
          </div>
        </div>
      `;

      chatContainer.append(messageHtml);
    });

    // Scroll to bottom
    chatContainer.scrollTop(chatContainer[0].scrollHeight);
  }

  // Setup event listeners
  function setupEventListeners() {
    // Refresh chat
    $('#refreshChat').on('click', function() {
      loadChatMessages(currentRoom);
    });

    // Clear chat
    $('#clearChat').on('click', function() {
      if (confirm('Are you sure you want to clear all messages in this room?')) {
        $('#monitorChatMessages').empty();
      }
    });

    // Send admin message
    $('#sendAdminMessage').on('click', function() {
      const message = $('#adminMessageInput').val().trim();
      if (message) {
        // In a real app, this would send to server
        const adminMessage = {
          id: 'admin-' + Date.now(),
          user: 'Admin',
          avatar: 'https://via.placeholder.com/40',
          content: message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          flagged: false
        };
        
        // Add to chat
        const messageHtml = `
          <div class="message admin-message">
            <div class="message-header">
              <img src="${adminMessage.avatar}" alt="${adminMessage.user}" class="user-avatar">
              <span class="username">${adminMessage.user}</span>
              <span class="timestamp">${adminMessage.timestamp}</span>
              <span class="badge badge-info">Admin</span>
            </div>
            <div class="message-content">
              ${adminMessage.content}
            </div>
          </div>
        `;
        
        $('#monitorChatMessages').append(messageHtml);
        $('#adminMessageInput').val('');
        
        // Scroll to bottom
        $('#monitorChatMessages').scrollTop($('#monitorChatMessages')[0].scrollHeight);
      }
    });

    // Toggle auto refresh
    $('#toggleAutoRefresh').on('click', function() {
      isAutoRefreshOn = !isAutoRefreshOn;
      
      if (isAutoRefreshOn) {
        $('#autoRefreshStatus').text('On');
        $(this).addClass('active');
        autoRefreshInterval = setInterval(function() {
          loadChatMessages(currentRoom);
        }, 5000); // Refresh every 5 seconds
      } else {
        $('#autoRefreshStatus').text('Off');
        $(this).removeClass('active');
        clearInterval(autoRefreshInterval);
      }
    });

    // Export chat
    $('#exportChat').on('click', function() {
      alert('Chat export functionality would be implemented here');
    });

    // Purge chat
    $('#purgeChat').on('click', function() {
      if (confirm('Are you sure you want to purge all messages in this room? This cannot be undone.')) {
        alert('Chat purge functionality would be implemented here');
      }
    });

    // Message actions (delegated events)
    $('#monitorChatMessages').on('click', '.flag-btn', function() {
      const messageId = $(this).data('id');
      flagMessage(messageId);
    });

    $('#monitorChatMessages').on('click', '.approve-btn', function() {
      const messageId = $(this).data('id');
      approveMessage(messageId);
    });

    $('#monitorChatMessages').on('click', '.delete-btn', function() {
      const messageId = $(this).data('id');
      deleteMessage(messageId);
    });

    $('#monitorChatMessages').on('click', '.ban-btn', function() {
      const username = $(this).data('user');
      banUser(username);
    });
  }

  // Flag a message
  function flagMessage(messageId) {
    // In a real app, this would call API
    $(`[data-id="${messageId}"]`).addClass('flagged')
      .prepend('<span class="badge badge-danger">Flagged</span>');
    
    // Update actions
    $(`[data-id="${messageId}"] .message-actions`).html(`
      <button class="btn btn-sm btn-success approve-btn" data-id="${messageId}" title="Approve Message">
        <i class="fas fa-check"></i>
      </button>
      <button class="btn btn-sm btn-danger delete-btn" data-id="${messageId}" title="Delete Message">
        <i class="fas fa-trash"></i>
      </button>
      <button class="btn btn-sm btn-warning ban-btn" data-user="${$(`[data-id="${messageId}"] .username`).text()}" title="Ban User">
        <i class="fas fa-ban"></i>
      </button>
    `);
    
    alert(`Message ${messageId} flagged for review`);
  }

  // Approve a flagged message
  function approveMessage(messageId) {
    // In a real app, this would call API
    $(`[data-id="${messageId}"]`).removeClass('flagged')
      .find('.badge').remove();
    
    // Update actions
    $(`[data-id="${messageId}"] .message-actions`).html(`
      <button class="btn btn-sm btn-warning flag-btn" data-id="${messageId}" title="Flag Message">
        <i class="fas fa-flag"></i>
      </button>
      <button class="btn btn-sm btn-danger delete-btn" data-id="${messageId}" title="Delete Message">
        <i class="fas fa-trash"></i>
      </button>
    `);
    
    alert(`Message ${messageId} approved and unflagged`);
  }

  // Delete a message
  function deleteMessage(messageId) {
    if (confirm('Are you sure you want to delete this message?')) {
      // In a real app, this would call API
      $(`[data-id="${messageId}"]`).remove();
      alert(`Message ${messageId} deleted`);
    }
  }

  // Ban a user
  function banUser(username) {
    if (confirm(`Are you sure you want to ban ${username}? This will prevent them from chatting.`)) {
      // In a real app, this would call API
      alert(`User ${username} banned`);
    }
  }

  // Initialize the chat monitor
  initializeChatMonitor();

  // Logout button handler
  $('#logoutBtn').click(function(e) {
    e.preventDefault();
    if(confirm('Are you sure you want to logout?')) {
      window.location.href = 'login.html';
    }
  });
});