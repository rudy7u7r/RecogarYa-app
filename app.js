// ── Service selection ─────────────────────────────────
function selectService(card) {
  document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');

  const price = card.dataset.price || '$1.200';
  document.getElementById('totalPrice').textContent = price;
}

// ── Time selection ────────────────────────────────────
function selectTime(pill) {
  document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('selected'));
  pill.classList.add('selected');
}

// ── Modal ─────────────────────────────────────────────
function openModal() {
  const modal = document.getElementById('modal');
  const stateSearching = document.getElementById('stateSearching');
  const stateFound = document.getElementById('stateFound');

  stateSearching.classList.remove('hidden');
  stateFound.classList.add('hidden');
  modal.classList.add('open');

  // Simulate matching delay
  setTimeout(() => {
    stateSearching.classList.add('hidden');
    stateFound.classList.remove('hidden');

    // Update ETA chip with current selected price
    const price = document.getElementById('totalPrice').textContent;
    const chips = stateFound.querySelectorAll('.eta-val');
    if (chips[2]) chips[2].textContent = price;
  }, 2800);
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

// ── Nav tab switching ─────────────────────────────────
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});
