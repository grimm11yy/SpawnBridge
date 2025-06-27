document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility for both fields
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inputId = this.closest('.input-group').querySelector('input').id;
            const passwordInput = document.getElementById(inputId);
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });
    
    // Password match validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    
    if (password && confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (password.value !== confirmPassword.value) {
                this.setCustomValidity("Passwords don't match");
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Form submission
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your registration logic here
            console.log('Registration form submitted');
            // You can add AJAX call or other form handling here
        });
    }
});