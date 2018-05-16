Array.prototype.forEach.call(
  document.querySelectorAll('noscript[data-gif]'),
  function (noscript) {
    var anchor = document.createElement('a');
    anchor.className = 'expandable-gif';
    anchor.href = noscript.dataset.gif;
    anchor.textContent = '[GIF] Click here to expand' + (
      noscript.dataset.alt ? ': ' + noscript.dataset.alt : '.'
    );

    anchor.onclick = function (evt) {
      evt.preventDefault();
      anchor.outerHTML = noscript.innerText;
    };

    noscript.parentNode.replaceChild(anchor, noscript);
  }
);
