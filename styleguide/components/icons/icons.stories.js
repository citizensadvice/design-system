import docs from './icons-docs.mdx';
import icons from '../../examples/icons/icons.html';
import upDown from '../../examples/icons/arrow_up_down.html';
import plusMinus from '../../examples/icons/plus_minus.html';

export default {
  title: 'Components/SVG Icons',
  parameters: { docs: { page: docs } },
};

export const Default = () => icons;
Default.parameters = { docs: { source: { code: icons } } };

export const UpDown = () => upDown;
UpDown.parameters = { docs: { source: { code: upDown } } };
export const PlusMinus = () => plusMinus;
PlusMinus.parameters = { docs: { source: { code: plusMinus } } };
