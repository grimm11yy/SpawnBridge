document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm-password");
    const passwordStrength = document.getElementById("password-strength");
    const confirmError = document.getElementById("confirm-password-error");
    const checkbox = document.getElementById("terms");
    const checkboxError = document.getElementById("checkbox-error");
    const form = document.getElementById("register-form");
    const popup = document.getElementById("successPopup");

    // Password strength checker
    function getPasswordStrength(password) {
        let strength = 0;

        // Panjang minimal
        if (password.length >= 13) strength++;

        // Karakter wajib
        const upper = password.match(/[A-Z]/g) || [];
        const lower = password.match(/[a-z]/g) || [];
        const digits = password.match(/\d/g) || [];
        const symbols = password.match(/[\W_]/g) || [];

        if (upper.length > 0) strength++;
        if (lower.length > 0) strength++;
        if (digits.length > 0) strength++;
        if (symbols.length > 0) strength++;

        if (upper.length >= 2) strength++;
        if (lower.length >= 5) strength++;
        if (digits.length >= 3) strength++;
        if (symbols.length >= 2) strength++;

        // WAJIB: minimal harus ada 1 dari masing-masing jenis karakter
        if (
            upper.length === 0 ||
            lower.length === 0 ||
            digits.length === 0 ||
            symbols.length === 0
        ) {
            return "invalid";
        }

        if (strength < 4 || password.length < 8) return "invalid";
        if (strength <= 5) return "weak";
        if (strength >= 7) return "strong";
    }

    // Update strength label
    passwordInput.addEventListener("input", () => {
        const val = passwordInput.value;
        const strength = getPasswordStrength(val);

        passwordStrength.className = "strength-label";
        if (strength === "invalid") {
            passwordStrength.textContent = "Password Invalid";
            passwordStrength.classList.add("text-invalid");
        } else if (strength === "weak") {
            passwordStrength.textContent = "Weak";
            passwordStrength.classList.add("text-weak");
        } else {
            passwordStrength.textContent = "Strong";
            passwordStrength.classList.add("text-strong");
        }
    });

    // Confirm password check
    confirmInput.addEventListener("input", () => {
        confirmError.style.display = (confirmInput.value !== passwordInput.value) ? "block" : "none";
    });

    // Toggle password visibility
    document.querySelectorAll(".toggle-password").forEach(button => {
        button.addEventListener("click", function () {
            const input = this.closest(".input-group").querySelector("input");
            const icon = this.querySelector("i");
            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        });
    });

    // Form submit
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // prevent real submission

        const pwd = passwordInput.value;
        const confirm = confirmInput.value;
        const uname = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        let valid = true;

        // Validasi password
        const pwdStrength = getPasswordStrength(pwd);
        if (pwdStrength === "invalid") {
            passwordStrength.textContent = "Password Invalid";
            passwordStrength.classList.add("text-invalid");
            valid = false;
        }

        // Confirm password match
        if (pwd !== confirm) {
            confirmError.style.display = "block";
            valid = false;
        } else {
            confirmError.style.display = "none";
        }

        // Checkbox
        if (!checkbox.checked) {
            checkboxError.style.display = "block";
            valid = false;
        } else {
            checkboxError.style.display = "none";
        }

        if (!valid) return;

        // Show popup
        popup.innerHTML = `
            <strong>✅ Registrasi Berhasil!</strong>
            <table>
                <tr><th>Username</th><td>${uname}</td></tr>
                <tr><th>Email</th><td>${email}</td></tr>
                <tr><th>Password</th><td>${'*'.repeat(pwd.length)}</td></tr>
            </table>
        `;
        popup.style.display = "block";

        form.reset();

        // Auto redirect to login.html after 5 seconds
        setTimeout(() => {
            popup.style.display = "none";
            window.location.href = "login.html";
        }, 5000);
    });
});
