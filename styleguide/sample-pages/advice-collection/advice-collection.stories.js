import { pageDecorator, pageParameters } from '../page-helpers';
import templateAdviceCollectionPublic from './_advice_collection.html.haml';
import templateAdviceCollectionAdviser from './_advice_collection_adviser.html.haml';

export default {
  title: 'Sample pages/Advice collection',
  parameters: pageParameters,
  decorators: [pageDecorator],
};

export const adviceCollectionPublic = () =>
  templateAdviceCollectionPublic.toString();
adviceCollectionPublic.storyName = 'Public';

export const adviceCollectionAdviser = () =>
  templateAdviceCollectionAdviser.toString();
adviceCollectionAdviser.storyName = 'Adviser';
