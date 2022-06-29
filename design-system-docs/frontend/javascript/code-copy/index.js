import copy from 'clipboard-copy';

export default function initCodeCopy() {
  const highlights = document.querySelectorAll('pre.highlight');
  if (highlights) {
    highlights.forEach((h) => addCopyButton(h));
  }
}

function addCopyButton(highlight) {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('highlight__buttons');

  const button = document.createElement('button');
  button.classList.add('cads-button');
  button.classList.add('cads-button__tertiary');
  button.textContent = 'Copy code';

  button.addEventListener('click', function () {
    copyCode(highlight);
  });

  highlight.classList.add('highlight--with-button');

  buttonDiv.append(button);
  highlight.prepend(buttonDiv);
}

function copyCode(highlight) {
  copy(highlight.querySelector('code').innerText);
}
