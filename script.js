document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabs = document.querySelectorAll('nav button');
    const sections = document.querySelectorAll('main section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            sections.forEach(s => s.classList.add('hidden'));
            const sectionToShow = document.getElementById(tab.id.replace('Tab', 'Section'));
            if (sectionToShow) {
                sectionToShow.classList.remove('hidden');
            }
        });
    });

    // Calendar functionality
    const monthsGrid = document.getElementById('monthsGrid');
    const daysGrid = document.getElementById('daysGrid');
    const backToYear = document.getElementById('backToYear');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const yearView = document.getElementById('yearView');
    const monthView = document.getElementById('monthView');
    const eventForm = document.getElementById('eventForm');
    const eventDetails = document.getElementById('eventDetails');
    const eventTitle = document.getElementById('eventTitle');
    const eventColor = document.getElementById('eventColor');
    const eventComment = document.getElementById('eventComment');
    const saveEvent = document.getElementById('saveEvent');
    const cancelEvent = document.getElementById('cancelEvent');
    const editEvent = document.getElementById('editEvent');
    const closeEventDetails = document.getElementById('closeEventDetails');
    const eventDetailsTitle = document.getElementById('eventDetailsTitle');
    const eventDetailsComment = document.getElementById('eventDetailsComment');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let currentDate = new Date(2024, 0, 1);
    let selectedDate = null;
    let events = {};

    function renderYearView() {
        monthsGrid.innerHTML = '';
        months.forEach((month, index) => {
            const monthElement = document.createElement('div');
            monthElement.classList.add('month');
            monthElement.textContent = month;
            monthElement.addEventListener('click', () => showMonthView(index));
            monthsGrid.appendChild(monthElement);
        });
    }

    function showMonthView(monthIndex) {
        yearView.classList.add('hidden');
        monthView.classList.remove('hidden');
        currentDate = new Date(2024, monthIndex, 1);
        renderMonthView();
    }

    function renderMonthView() {
        daysGrid.innerHTML = '';
        currentMonthYear.textContent = `${months[currentDate.getMonth()]} 2024`;

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        for (let i = 1; i < firstDay.getDay() || i === 7; i++) {
            daysGrid.appendChild(createCalendarDay(''));
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = `2024-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const dayElement = createCalendarDay(day);
            
            if (events[date]) {
                dayElement.style.backgroundColor = events[date].color;
                dayElement.title = events[date].title;
            }

            dayElement.addEventListener('click', () => {
                selectedDate = date;
                if (events[date]) {
                    showEventDetails(date);
                } else {
                    showEventForm();
                }
            });

            daysGrid.appendChild(dayElement);
        }
    }

    function createCalendarDay(content) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = content;
        return day;
    }

    function showEventForm() {
        eventForm.classList.remove('hidden');
        eventDetails.classList.add('hidden');
    }

    function showEventDetails(date) {
        const event = events[date];
        eventDetailsTitle.textContent = event.title;
        eventDetailsComment.textContent = event.comment;
        eventDetails.classList.remove('hidden');
        eventForm.classList.add('hidden');
    }

    backToYear.addEventListener('click', () => {
        yearView.classList.remove('hidden');
        monthView.classList.add('hidden');
    });

    saveEvent.addEventListener('click', () => {
        if (selectedDate && eventTitle.value) {
            events[selectedDate] = {
                title: eventTitle.value,
                color: eventColor.value,
                comment: eventComment.value
            };
            renderMonthView();
            eventForm.classList.add('hidden');
            eventTitle.value = '';
            eventComment.value = '';
        }
    });

    cancelEvent.addEventListener('click', () => {
        eventForm.classList.add('hidden');
        eventTitle.value = '';
        eventComment.value = '';
    });

    editEvent.addEventListener('click', () => {
        const event = events[selectedDate];
        if (event) {
            eventTitle.value = event.title;
            eventColor.value = event.color;
            eventComment.value = event.comment;
            showEventForm();
        }
    });

    closeEventDetails.addEventListener('click', () => {
        eventDetails.classList.add('hidden');
    });

    renderYearView();

    // Pomodoro functionality
    const pomodoroTimer = document.getElementById('timer');
    const startPomodoro = document.getElementById('startPomodoro');
    const resetPomodoro = document.getElementById('resetPomodoro');
    const pomodoroType = document.getElementById('pomodoroType');
    const ringtone = document.getElementById('ringtone');

    let timer;
    let timeLeft = 25 * 60;
    let isWorking = true;
    let originalTitle = document.title;

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        pomodoroTimer.textContent = timeString;
        document.title = `${timeString} - Time to focus! | Utdam's Dashboard`;
    }

    function switchPomodoroMode() {
        const [work, rest] = pomodoroType.value.split('-').map(Number);
        timeLeft = (isWorking ? rest : work) * 60;
        isWorking = !isWorking;
        updateTimer();
    }

    startPomodoro.addEventListener('click', () => {
        if (timer) {
            clearInterval(timer);
            startPomodoro.textContent = 'Start';
            timer = null;
            document.title = originalTitle;
        } else {
            timer = setInterval(() => {
                timeLeft--;
                updateTimer();
                if (timeLeft === 0) {
                    clearInterval(timer);
                    const audio = new Audio(`assets/sounds/${ringtone.value}.mp3`);
                    audio.play().catch(error => console.error('Error playing audio:', error));
                    switchPomodoroMode();
                    startPomodoro.textContent = 'Start';
                    timer = null;
                }
            }, 1000);
            startPomodoro.textContent = 'Pause';
        }
    });

    resetPomodoro.addEventListener('click', () => {
        clearInterval(timer);
        const [work] = pomodoroType.value.split('-').map(Number);
        timeLeft = work * 60;
        isWorking = true;
        updateTimer();
        startPomodoro.textContent = 'Start';
        timer = null;
        document.title = originalTitle;
    });

    pomodoroType.addEventListener('change', () => {
        const [work] = pomodoroType.value.split('-').map(Number);
        timeLeft = work * 60;
        isWorking = true;
        updateTimer();
        clearInterval(timer);
        startPomodoro.textContent = 'Start';
        timer = null;
        document.title = originalTitle;
    });

    updateTimer();

    // YouTube player functionality
    const youtubeLink = document.getElementById('youtubeLink');
    const loadVideo = document.getElementById('loadVideo');
    const downloadType = document.getElementById('downloadType');
    const downloadQuality = document.getElementById('downloadQuality');
    const downloadMedia = document.getElementById('downloadMedia');
    const downloadInfo = document.getElementById('downloadInfo');
    const downloadDetails = document.getElementById('downloadDetails');
    const startDownload = document.getElementById('startDownload');
    const cancelDownload = document.getElementById('cancelDownload');
    let player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: '',
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        // Player is ready
        console.log('YouTube player is ready');
    }

    loadVideo.addEventListener('click', () => {
        const videoId = extractVideoID(youtubeLink.value);
        if (videoId) {
            player.loadVideoById(videoId);
        } else {
            alert('Please enter a valid YouTube URL');
        }
    });

    downloadMedia.addEventListener('click', () => {
        const videoId = extractVideoID(youtubeLink.value);
        if (videoId) {
            const type = downloadType.value;
            const quality = downloadQuality.value;
            showDownloadInfo(videoId, type, quality);
        } else {
            alert('Please enter a valid YouTube URL');
        }
    });

    function showDownloadInfo(videoId, type, quality) {
        downloadDetails.textContent = `Preparing to download ${type} for video ID: ${videoId}\nQuality: ${quality}`;
        downloadInfo.classList.remove('hidden');
    }

    startDownload.addEventListener('click', () => {
        simulateDownload();
    });

    let downloadInterval;
    const progressBar = document.createElement('div');
    progressBar.style.width = '0%';
    progressBar.style.height = '20px';
    progressBar.style.backgroundColor = 'var(--primary-color)';
    progressBar.style.transition = 'width 0.5s';

    function simulateDownload() {
        let progress = 0;
        downloadInfo.appendChild(progressBar);
        downloadInterval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(downloadInterval);
                alert('Download completed! (This is a simulated action)');
                downloadInfo.classList.add('hidden');
                downloadInfo.removeChild(progressBar);
            }
        }, 500);
    }


    cancelDownload.addEventListener('click', () => {
        clearInterval(downloadInterval);
        downloadInfo.removeChild(progressBar);
        downloadInfo.classList.add('hidden');
    });

    function extractVideoID(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    // Initialize YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
});