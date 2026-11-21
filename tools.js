(function () {
  // 2026 PAYE bands, monthly (ZMW): 0% to 5,100; 20% to 7,100; 30% to 9,200; 37% above
  var BANDS = [
    { upTo: 5100, rate: 0 },
    { upTo: 7100, rate: 0.2 },
    { upTo: 9200, rate: 0.3 },
    { upTo: Infinity, rate: 0.37 }
  ];
  var NAPSA_RATE = 0.05;
  var NAPSA_CAP = 1861.8;
  var NHIMA_RATE = 0.01;
  var MAX_PAY = 10000000;

  function round2(n) { return Math.round(n * 100) / 100; }

  function payeOn(taxable) {
    var tax = 0;
    var prev = 0;
    for (var i = 0; i < BANDS.length; i++) {
      if (taxable > prev) tax += (Math.min(taxable, BANDS[i].upTo) - prev) * BANDS[i].rate;
      if (taxable <= BANDS[i].upTo) break;
      prev = BANDS[i].upTo;
    }
    return tax;
  }

  function compute(gross, napsaBeforeTax) {
    var napsa = round2(Math.min(gross * NAPSA_RATE, NAPSA_CAP));
    var nhima = round2(gross * NHIMA_RATE);
    var taxable = round2(napsaBeforeTax ? gross - napsa : gross);
    var paye = round2(payeOn(taxable));
    var takeHome = round2(gross - napsa - nhima - paye);
    return { gross: gross, napsa: napsa, nhima: nhima, taxable: taxable, paye: paye, takeHome: takeHome };
  }

  function parsePay(text) {
    var cleaned = String(text).replace(/zmw|k|,|\s/gi, '');
    if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
    var n = parseFloat(cleaned);
    if (!(n > 0) || n > MAX_PAY) return null;
    return n;
  }

  function money(n) {
    return 'K' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  window.zmPaye = { compute: compute, parsePay: parsePay };

  document.querySelectorAll('form[data-paye]').forEach(function (form) {
    var input = form.querySelector('input[name="pay"]');
    var box = form.querySelector('input[name="napsa"]');
    var error = form.querySelector('.error');
    var result = form.querySelector('.result');
    var next = form.querySelector('.next');
    var touched = false;

    function showError(show) {
      error.hidden = !show;
      input.setAttribute('aria-invalid', String(show));
    }

    function update(fromSubmit) {
      var value = input.value.trim();
      var gross = parsePay(value);
      if (gross === null) {
        result.hidden = true;
        if (next) next.hidden = true;
        showError(value !== '' && (touched || fromSubmit) || fromSubmit);
        return;
      }
      showError(false);
      var r = compute(gross, box ? box.checked : true);
      Object.keys(r).forEach(function (key) {
        var out = form.querySelector('[data-out="' + key + '"]');
        if (out) out.textContent = money(r[key]);
      });
      result.hidden = false;
      if (next) next.hidden = false;
    }

    form.addEventListener('submit', function (e) { e.preventDefault(); touched = true; update(true); });
    input.addEventListener('blur', function () { touched = true; if (input.value.trim() !== '') update(false); });
    input.addEventListener('input', function () { if (touched || !result.hidden) update(false); });
    if (box) box.addEventListener('change', function () { if (!result.hidden) update(false); });
  });
})();
