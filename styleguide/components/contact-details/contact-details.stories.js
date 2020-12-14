import docs from './contact-details-docs.mdx';
import templateDefault from './_contact-details.html.haml';

export default {
  title: 'Components/Contact Details',
  parameters: { docs: { page: docs } },
};

export const ContactDetails = () => templateDefault.en;

templateDefault.parameters = {
  docs: { source: { code: templateDefault.toString() } },
};
