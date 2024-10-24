document.addEventListener('DOMContentLoaded', () => {
    const clickSound = document.getElementById('clickSound');
    
    const tabs = document.querySelectorAll('nav button');
    const sections = document.querySelectorAll('main section');

    // Profile Setup
    const profileImage = document.getElementById('profileImage');
    const profileImageUpload = document.getElementById('profileImageUpload');
    const themeOptions = document.querySelectorAll('input[name="theme"]');
    const saveProfileBtn = document.getElementById('saveProfile');

    function playClickSound() {
        clickSound.currentTime = 0;
        clickSound.play().catch(error => console.error('Error playing sound:', error));
    }

    // Add click sound to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', playClickSound);
    });

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            sections.forEach(s => s.classList.remove('active'));
            const sectionToShow = document.getElementById(tab.id.replace('Tab', 'Section'));
            if (sectionToShow) {
                sectionToShow.classList.add('active');
            }
        });
    });

    // Profile image upload
    profileImageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => profileImage.src = e.target.result;
            reader.readAsDataURL(file);
        }
    });

    // Theme changing
    themeOptions.forEach(option => {
        option.addEventListener('change', (event) => {
            const theme = event.target.value;
            document.body.className = `theme-${theme}`;
        });
    });

    // Save profile
    saveProfileBtn.addEventListener('click', () => {
        const selectedTheme = document.querySelector('input[name="theme"]:checked').value;
        // Here you would typically save the profile data to a backend or local storage
        console.log('Saving profile:', { profileImage: profileImage.src, theme: selectedTheme });
        alert('Profile saved successfully!');
    });

    // Calendar functionality
    const monthsGrid = document.getElementById('monthsGrid');
    const daysGrid = document.getElementById('daysGrid');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const backToYear = document.getElementById('backToYear');
    const yearView = document.getElementById('yearView');
    const monthView = document.getElementById('monthView');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let selectedMonth = currentDate.getMonth();

    function renderYearView() {
        monthsGrid.innerHTML = '';
        months.forEach((month, index) => {
            const monthElement = document.createElement('div');
            monthElement.className = 'month';
            monthElement.textContent = month;
            monthElement.addEventListener('click', () => showMonthView(index));
            monthsGrid.appendChild(monthElement);
        });
        yearView.classList.remove('hidden');
        monthView.classList.add('hidden');
    }

    function showMonthView(month) {
        selectedMonth = month;
        renderMonthView();
        yearView.classList.add('hidden');
        monthView.classList.remove('hidden');
    }

    function renderMonthView() {
        currentMonthYear.textContent = `${months[selectedMonth]} ${currentYear}`;
        daysGrid.innerHTML = '';

        const firstDay = new Date(currentYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day';
            daysGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = day;
            daysGrid.appendChild(dayElement);
        }
    }

    backToYear.addEventListener('click', renderYearView);

    // Initialize calendar
    renderYearView();

    // Pomodoro functionality
    const timer = document.getElementById('timer');
    const startPomodoroBtn = document.getElementById('startPomodoro');
    const resetPomodoroBtn = document.getElementById('resetPomodoro');
    const pomodoroType = document.getElementById('pomodoroType');
    const ringtone = document.getElementById('ringtone');

    let countdown;
    let remainingTime = 60 * 60; // 60 minutes in seconds
    let isRunning = false;

    function updateTimerDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.title = `${timer.textContent} - Pomodoro`;
    }

    function startPomodoro() {
        if (!isRunning) {
            isRunning = true;
            startPomodoroBtn.textContent = 'Pause';
            countdown = setInterval(() => {
                if (remainingTime > 0) {
                    remainingTime--;
                    updateTimerDisplay();
                } else {
                    clearInterval(countdown);
                    isRunning = false;
                    playAlarm();
                    startPomodoroBtn.textContent = 'Start';
                }
            }, 1000);
        } else {
            clearInterval(countdown);
            isRunning = false;
            startPomodoroBtn.textContent = 'Resume';
        }
    }

    function resetPomodoro() {
        clearInterval(countdown);
        isRunning = false;
        const [work] = pomodoroType.value.split('-');
        remainingTime = parseInt(work) * 60;
        updateTimerDisplay();
        startPomodoroBtn.textContent = 'Start';
    }

    function playAlarm() {
        const audio = new Audio(`sound/${ringtone.value}.mp3`);
        audio.play();
    }

    startPomodoroBtn.addEventListener('click', startPomodoro);
    resetPomodoroBtn.addEventListener('click', resetPomodoro);
    pomodoroType.addEventListener('change', resetPomodoro);

    // Initialize timer display
    updateTimerDisplay();

    // YouTube player functionality
    let player;
    const loadVideoBtn = document.getElementById('loadVideo');
    const youtubeLinkInput = document.getElementById('youtubeLink');
    const playerContainer = document.getElementById('playerContainer');
    const downloadMediaBtn = document.getElementById('downloadMedia');
    const downloadType = document.getElementById('downloadType');
    const downloadQuality = document.getElementById('downloadQuality');
    const downloadInfo = document.getElementById('downloadInfo');
    const downloadDetails = document.getElementById('downloadDetails');
    const startDownloadBtn = document.getElementById('startDownload');
    const cancelDownloadBtn = document.getElementById('cancelDownload');

    window.onYouTubeIframeAPIReady = function() {
        console.log('YouTube API is ready');
    };

    function loadVideo() {
        const videoId = extractVideoId(youtubeLinkInput.value);
        if (videoId) {
            if (player) {
                player.loadVideoById(videoId);
            } else {
                player = new YT.Player('player', {
                    height: '360',
                    width: '640',
                    videoId: videoId,
                });
            }
            playerContainer.style.display = 'block';
        } else {
            alert('Invalid YouTube URL');
        }
    }

    function extractVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function simulateDownload() {
        downloadInfo.classList.remove('hidden');
        downloadDetails.textContent = `Preparing to download ${downloadType.value} in ${downloadQuality.value} quality...`;
    }

    function startDownload() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            downloadDetails.textContent = `Downloading: ${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                downloadDetails.textContent = 'Download complete!';
                setTimeout(() => {
                    downloadInfo.classList.add('hidden');
                }, 2000);
            }
        }, 500);
    }

    loadVideoBtn.addEventListener('click', loadVideo);
    downloadMediaBtn.addEventListener('click', simulateDownload);
    startDownloadBtn.addEventListener('click', startDownload);
    cancelDownloadBtn.addEventListener('click', () => {
        downloadInfo.classList.add('hidden');
    });

    // To-Do List functionality
    const todoInput = document.getElementById('newTodo');
    const todoList = document.getElementById('todoList');
    const archiveList = document.getElementById('archiveList');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let archivedTodos = JSON.parse(localStorage.getItem('archivedTodos')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="comment-btn">Comment</button>
                <button class="delete-btn">Delete</button>
                <div class="todo-comment">${todo.comment || ''}</div>
            `;
            
            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                todos[index].completed = checkbox.checked;
                saveTodos();
                renderTodos();
            });

            const commentBtn = li.querySelector('.comment-btn');
            commentBtn.addEventListener('click', () => {
                const comment = prompt('Add a comment:', todo.comment);
                if (comment !== null) {
                    todos[index].comment = comment;
                    saveTodos();
                    renderTodos();
                }
            });

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                archivedTodos.push(todos[index]);
                todos.splice(index, 1);
                saveTodos();
                saveArchivedTodos();
                renderTodos();
                renderArchivedTodos();
            });

            todoList.appendChild(li);
        });
    }

    function renderArchivedTodos() {
        archiveList.innerHTML = '';
        archivedTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <button class="restore-btn">Restore</button>
            `;

            const restoreBtn = li.querySelector('.restore-btn');
            restoreBtn.addEventListener('click', () => {
                todos.push(archivedTodos[index]);
                archivedTodos.splice(index, 1);
                saveTodos();
                saveArchivedTodos();
                renderTodos();
                renderArchivedTodos();
            });

            archiveList.appendChild(li);
        });
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function saveArchivedTodos() {
        localStorage.setItem('archivedTodos', JSON.stringify(archivedTodos));
    }

    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            todos.push({ text: this.value.trim(), completed: false, comment: '' });
            this.value = '';
            saveTodos();
            renderTodos();
        }
    });

    renderTodos();
    renderArchivedTodos();

    // Set Profile Setup as the default active tab
    document.getElementById('profileSetupTab').click();
});