document.getElementById('resumeDraft')?.addEventListener('click', () => {
  window.location.href = 'estacao.html?resume=1';
});

document.getElementById('newBlank')?.addEventListener('click', () => {
  localStorage.removeItem('hms_station_v1');
  window.location.href = 'estacao.html?mode=entrada';
});
