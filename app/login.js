document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const profileSetupForm = document.getElementById('profileSetupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            
            // Store data in localStorage
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('email', email);

            // Redirect to profile setup page
            window.location.href = 'https://utdsong.github.io/app/profile-setup.html';
        });
    }

    if (profileSetupForm) {
        const profileInput = document.getElementById('profilePicture');
        const profilePreview = document.getElementById('profilePreview');

        profileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePreview.src = e.target.result;
                    profilePreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });

        profileSetupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const theme = document.querySelector('input[name="theme"]:checked').value;
            
            // Store theme in localStorage
            localStorage.setItem('theme', theme);

            // Redirect to dashboard
            window.location.href = 'https://utdsong.github.io/app/profile-setup.html';
        });
    }
});