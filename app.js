// ── Contadores del test de humo ───────────────────────
const metrics = { ctaClicks: 0, contactsLeft: 0 };

// ── Service selection ─────────────────────────────────
function selectService(card) {
  document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  const price = card.dataset.price || '$4.990';
  document.getElementById('totalPrice').textContent = price;
  document.getElementById('btnCTA').textContent = 'Solicitar Retiro Express — ' + price;
}

// ── Time selection ────────────────────────────────────
function selectTime(pill) {
  document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('selected'));
  pill.classList.add('selected');
}

// ── Modal: abrir ──────────────────────────────────────
function openModal() {
  metrics.ctaClicks++;
  showState('stateSearching');
  document.getElementById('modal').classList.add('open');
  setTimeout(() => showState('stateCapture'), 2800);
}

// ── Modal: cerrar ─────────────────────────────────────
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('inputEmail').value = '';
  document.getElementById('inputPhone').value = '';
  clearErrors();
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

// ── Captura de contacto ───────────────────────────────
function submitCapture() {
  const email = document.getElementById('inputEmail').value.trim();
  const phone = document.getElementById('inputPhone').value.trim();
  clearErrors();
  let valid = true;

  if (!email && !phone) {
    showError('inputEmail', 'Ingresa al menos tu correo o teléfono.');
    valid = false;
  } else {
    if (email && !isValidEmail(email)) {
      showError('inputEmail', 'Ingresa un correo válido.');
      valid = false;
    }
    if (phone && !isValidPhone(phone)) {
      showError('inputPhone', 'Ingresa un teléfono válido (ej: +56912345678).');
      valid = false;
    }
  }

  if (!valid) return;

  metrics.contactsLeft++;

  const confirmData = document.getElementById('confirmData');
  confirmData.innerHTML = '';
  if (email) confirmData.innerHTML += '<span>' + email + '</span>';
  if (phone) confirmData.innerHTML += '<span>' + phone + '</span>';
  confirmData.innerHTML += 'Te notificaremos cuando lleguemos a tu zona.';

  showState('stateConfirm');
}

// ── Helpers ───────────────────────────────────────────
function showState(id) {
  ['stateSearching', 'stateCapture', 'stateConfirm'].forEach(s => {
    document.getElementById(s).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  input.classList.add('error');
  let errEl = input.parentElement.querySelector('.form-error');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.className = 'form-error';
    input.parentElement.appendChild(errEl);
  }
  errEl.textContent = message;
  errEl.classList.add('visible');
}

function clearErrors() {
  document.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));
  document.querySelectorAll('.form-error').forEach(e => e.classList.remove('visible'));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\+\d\s\-\(\)]{7,15}$/.test(phone);
}

// ── Nav ───────────────────────────────────────────────
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});
