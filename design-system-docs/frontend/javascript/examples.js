export default function initExamples() {
  const plusMinus = document.querySelector('.js-plus-minus-example');

  plusMinus.addEventListener('click', function () {
    const icon = document.querySelector('.cads-icon--plus-minus');
    icon.classList.toggle('show-minus');
  });

  const upDown = document.querySelector('.js-up-down-example');

  upDown.addEventListener('click', function () {
    const icon = document.querySelector('.cads-icon--arrow-up-down');
    icon.classList.toggle('show-up');
  });
}
