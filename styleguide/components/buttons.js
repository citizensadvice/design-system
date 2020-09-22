import wrapper from '../component-wrapper';

export default function buttons() {
  return wrapper(
    'Buttons',
    `<p><button type="button" class="cads-button cads-button__primary">Primary button</button></p>
<p><button type="button"class="cads-button cads-button__secondary">Secondary button</button></p>
<p><button type="button" class="cads-button cads-button__tertiary">Tertiary button</button></p>`
  );
}
