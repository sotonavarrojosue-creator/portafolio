// Juancho's Tejar — armador de pedido con total y envío por WhatsApp
// JS vanilla, sin dependencias.

(function () {
  'use strict';

  var PHONE = '+50683131356';

  function fmtColones(n) {
    return '₡' + n.toLocaleString('es-CR');
  }

  var builder = document.querySelector('[data-builder]');
  if (!builder) return;

  var items = Array.prototype.slice.call(builder.querySelectorAll('.b-item'));
  var summary = builder.querySelector('[data-summary]');
  var totalOut = builder.querySelector('[data-total]');
  var sendBtn = builder.querySelector('[data-send]');

  var qty = {};
  var prices = {};
  items.forEach(function (item) {
    var name = item.getAttribute('data-item');
    qty[name] = 0;
    prices[name] = parseInt(item.getAttribute('data-price'), 10) || 0;
  });

  function render() {
    var hasItems = false;
    var total = 0;
    var lines = [];

    items.forEach(function (item) {
      var name = item.getAttribute('data-item');
      var n = qty[name];
      item.querySelector('[data-qty]').textContent = String(n);
      if (n > 0) {
        hasItems = true;
        var lineTotal = prices[name] * n;
        total += lineTotal;
        lines.push(
          '<li><span>' + name + ' <span class="q">x' + n + '</span></span><span class="line-price">' +
          fmtColones(lineTotal) + '</span></li>'
        );
      }
    });

    totalOut.textContent = fmtColones(total);

    if (!hasItems) {
      summary.innerHTML = '<li class="empty">Todavía no hay nada. Elija del menú.</li>';
      sendBtn.setAttribute('aria-disabled', 'true');
      return;
    }

    summary.innerHTML = lines.join('');
    sendBtn.removeAttribute('aria-disabled');

    sendBtn.href = 'tel:' + PHONE;
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
