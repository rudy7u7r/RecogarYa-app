document.addEventListener('DOMContentLoaded', function () {

  const metrics = { ctaClicks: 0, contactsLeft: 0 };

  window.selectService = function (card) {
    document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const price = card.dataset.price || '$4.990';
    document.getElementById('totalPrice').textContent = price;
    document.getElementById('btnCTA').textContent = 'Solicitar Retiro Express — ' + price;
  };

  window.selectTime = function (pill) {
    document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('selected'));
    pill.classList.add('selected');
  };

  window.openModal = function () {
    metrics.ctaClicks++;
    document.getElementById('stateSearching').classList.remove('hidden');
    document.getElementById('stateCapture').classList.add('hidden');
    document.getElementById('stateConfirm').classList.add('hidden');
    document.getElementById('modal').classList.add('open');
    setTimeout(function () {
      document.getElementById('stateSearching').classList.add('hidden');
      document.getElementById('stateCapture').classList.remove('hidden');
    }, 2800);
  };

  window.closeModal = function () {
    document.getElementById('modal').classList.remove('open');
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputPhone').value = '';
    document.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));
    document.querySelectorAll('.form-error').forEach(e => e.classList.remove('visible'));
  };

  window.handleOverlayClick = function (e) {
    if (e.target === document.getElementById('modal')) window.closeModal();
  };

  window.submitCapture = function () {
    const email = document.getElementById('inputEmail').value.trim();
    const phone = document.getElementById('inputPhone').value.trim();
    document.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));
    document.querySelectorAll('.form-error').forEach(e => e.classList.remove('visible'));

    let valid = true;
    if (!email && !phone) {
      marcarError('inputEmail', 'Ingresa al menos tu correo o teléfono.');
      valid = false;
    } else {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        marcarError('inputEmail', 'Ingresa un correo válido.');
        valid = false;
      }
      if (phone && !/^[\+\d\s\-\(\)]{7,15}$/.test(phone)) {
        marcarError('inputPhone', 'Ingresa un teléfono válido.');
        valid = false;
      }
    }
    if (!valid) return;

    metrics.contactsLeft++;

    const box = document.getElementById('confirmData');
    box.innerHTML = '';
    if (email) box.innerHTML += '<span>' + email + '</span>';
    if (phone) box.innerHTML += '<span>' + phone + '</span>';
    box.innerHTML += 'Te notificaremos cuando lleguemos a tu zona.';

    document.getElementById('stateCapture').classList.add('hidden');
    document.getElementById('stateConfirm').classList.remove('hidden');
  };

  function marcarError(id, msg) {
    const input = document.getElementById(id);
    input.classList.add('error');
    let err = input.parentElement.querySelector('.form-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'form-error';
      input.parentElement.appendChild(err);
    }
    err.textContent = msg;
    err.classList.add('visible');
  }

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

});
