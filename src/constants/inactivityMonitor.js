
let inactivityTimer;
const inactivityTimeout = 5 * 60 * 1000;

export function setupInactivityMonitor() {
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      logout(); 
    }, inactivityTimeout);
  }

  resetInactivityTimer();

  window.addEventListener('mousemove', resetInactivityTimer);
  window.addEventListener('keypress', resetInactivityTimer);
}
