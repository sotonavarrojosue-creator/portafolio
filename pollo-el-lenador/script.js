// Pollo Asado El Leñador — armador de pedido por WhatsApp
// JS vanilla, sin dependencias.

(function () {
  'use strict';

  var WA_NUMBER = '50689292424';
  var WA_BASE = 'Hola, Pollo El Leñador, quiero pedir:';

  var builder = document.querySelector('[data-builder]');
  if (!builder) return;

  var items = Array.prototype.slice.call(builder.querySelectorAll('.b-item'));
  var summary = builder.querySelector('[data-summary]');
  var sendBtn = builder.querySelector('[data-send]');

  var qty = {};
  items.forEach(function (item) {
    qty[item.getAttribute('data-item')] = 0;
  });

  function render() {
    var hasItems = false;
    var lines = [];

    items.forEach(function (item) {
      var n = qty[item.getAttribute('data-item')];
      item.querySelector('[data-qty]').textContent = String(n);
      if (n > 0) {
        hasItems = true;
        lines.push(
          '<li><span>' + item.getAttribute('data-item') + '</span><span class="q">x' + n + '</span></li>'
        );
      }
    });

    if (!hasItems) {
      summary.innerHTML = '<li class="empty">Todavía no hay nada. Elija del menú.</li>';
      sendBtn.setAttribute('aria-disabled', 'true');
      return;
    }

    summary.innerHTML = lines.join('');
    sendBtn.removeAttribute('aria-disabled');

    var pedido = WA_BASE;
    items.forEach(function (item) {
      var n = qty[item.getAttribute('data-item')];
      if (n > 0) {
        pedido += '\n- ' + item.getAttribute('data-item') + ' x' + n;
      }
    });

    sendBtn.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(pedido);
  }

  builder.addEventListener('click', function (e) {
    var btn = e.target.closest('.b-btn');
    if (!btn) return;
    var item = btn.closest('.b-item');
    var name = item.getAttribute('data-item');
    var step = parseInt(btn.getAttribute('data-step'), 10);
    qty[name] = Math.max(0, qty[name] + step);
    render();
  });

  render();
})();
