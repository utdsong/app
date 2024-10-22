const clickSound = new Audio('/sounds/click.mp3');

export function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(error => console.error('Error playing sound:', error));
}