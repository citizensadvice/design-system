import docs from './icons-docs.mdx';
import icons from '../../examples/icons/icons.html';

export default {
  title: 'Components/SvgIcons',
  parameters: { docs: { page: docs } },
};

export const Default = () => icons;
Default.parameters = { docs: { source: { code: icons } } };
