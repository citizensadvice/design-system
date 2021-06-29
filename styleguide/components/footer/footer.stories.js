import docs from './footer-docs.mdx';
import templateDefault from '../../examples/footer/default.html';
import templateMinimal from '../../examples/footer/minimal.html';

export default {
  title: 'Components/Footer',
  parameters: { docs: { page: docs } },
};

export const Default = () => templateDefault;
Default.parameters = { docs: { source: { code: templateDefault } } };

export const Minimal = () => templateMinimal;
Minimal.parameters = { docs: { source: { code: templateMinimal } } };
