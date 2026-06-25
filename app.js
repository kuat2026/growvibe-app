const state = {
  enabled: true,
  days: ['Сб'],
  time: '11:00',
  repeat: false,
  sound: true,
  bathroom: false,
};

function init() {
  const master = document.getElementById('master');
  master.addEventListener('change', () => {
    state.enabled = master.checked;
    document.getElementById('settings-body').classList.toggle('disabled', !master.checked);
  });

  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const day = btn.dataset.day;
      if (btn.classList.contains('active')) {
        state.days.push(day);
      } else {
        state.days = state.days.filter(d => d !== day);
      }
    });
  });

  const timeRow = document.getElementById('time-row');
  const timePicker = document.getElementById('time-picker');
  const timeInput = document.getElementById('time-input');
  const timeVal = document.getElementById('time-val');

  timeRow.addEventListener('click', () => {
    const isOpen = !timePicker.hidden;
    timePicker.hidden = isOpen;
    if (!isOpen) timeInput.focus();
  });

  timeInput.addEventListener('change', () => {
    state.time = timeInput.value;
    timeVal.textContent = timeInput.value;
    timePicker.hidden = true;
  });

  document.getElementById('repeat-toggle').addEventListener('change', e => {
    state.repeat = e.target.checked;
  });

  document.getElementById('sound-toggle').addEventListener('change', e => {
    state.sound = e.target.checked;
  });

  document.getElementById('bathroom-toggle').addEventListener('change', e => {
    state.bathroom = e.target.checked;
  });

  document.getElementById('save-btn').addEventListener('click', save);
}

function save() {
  localStorage.setItem('growvibe-reminder', JSON.stringify(state));
  showToast('Настройки сохранены');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function loadSaved() {
  const saved = localStorage.getItem('growvibe-reminder');
  if (!saved) return;
  const data = JSON.parse(saved);

  document.getElementById('master').checked = data.enabled;
  if (!data.enabled) {
    document.getElementById('settings-body').classList.add('disabled');
  }

  document.querySelectorAll('.day-btn').forEach(btn => {
    if (data.days.includes(btn.dataset.day)) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  document.getElementById('time-input').value = data.time;
  document.getElementById('time-val').textContent = data.time;
  document.getElementById('repeat-toggle').checked = data.repeat;
  document.getElementById('sound-toggle').checked = data.sound;
  document.getElementById('bathroom-toggle').checked = data.bathroom;

  Object.assign(state, data);
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  loadSaved();
});
