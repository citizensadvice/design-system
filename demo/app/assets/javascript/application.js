import initHeader from '../../../../lib/header';
import greedyNav from '../../../../lib/greedy-nav/index';
import initTargetedContent from '../../../../lib/targeted-content';
import initOnThisPage from '../../../../lib/on-this-page/on-this-page';
import initDisclosure from '../../../../lib/disclosure/disclosure';
import initErrorSummary from '../../../../lib/error-summary';

initHeader();
greedyNav.init();
initTargetedContent();
initOnThisPage();
initDisclosure();
initErrorSummary();
