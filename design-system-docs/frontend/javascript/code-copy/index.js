export default function initCodeCopy() {
  const highlights = document.querySelectorAll('pre.highlight');
  if (highlights) {
    highlights.forEach(h => addCopyButton((h)))
  }
}

function addCopyButton(highlight) {
  const buttonDiv = document.createElement("div")
  buttonDiv.classList.add("highlight__buttons")

  const button = document.createElement("button")
  button.classList.add('cads-button')
  button.classList.add('cads-button__tertiary')
  button.textContent = "Copy code"
  highlight.classList.add('highlight--with-button')

  buttonDiv.append(button)
  highlight.prepend(buttonDiv)
}
