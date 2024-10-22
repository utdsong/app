document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const profileSetupForm = document.getElementById('profileSetupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            
            // Here you would typically send this data to a server
            // For this example, we'll just store it in localStorage
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('email', email);

            // Redirect to profile setup page
            window.location.href = 'profile-setup.html';
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
            
            // Here you would typically send this data to a server
            // For this example, we'll just store it in localStorage
            localStorage.setItem('theme', theme);

            // Redirect to dashboard
            window.location.href = 'project-setup.html';
        });
    }
});