import wrapper from '../component-wrapper';

const buttons = () => {
    const content = 'This is a button';
    const component = `<h4>Default button style</h4><button type="button">${content}</button>
<h4>With .cads-bbutton class</h4><button class="cads-button" type="button">${content}</button>
<h4>Primary button</h4><button class="cads-button cads-button__primary" type="button">${content}</button>
<h4>Secondary button</h4><button class="cads-button cads-button__secondary" type="button">${content}</button>
<h4>Tertiary button</h4><button class="cads-button cads-button__tertiary" type="button">${content}</button>`;
    return wrapper('Buttons', component);
};

export default buttons;
