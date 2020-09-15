import wrapper from '../component-wrapper';

export default function buttons() {
  return wrapper(
    'Buttons',
    `<p><button type="button">Primary button</button></p>
<p><button class="cads-button cads-button__secondary" type="button">Secondary button</button></p>
<p><button class="cads-button cads-button__tertiary" type="button">Tertiary button</button></p>`
  );
}
