import priorityNav from '@citizensadvice/priority-nav';

export default priorityNav;

export const initNavigation = options => {
    priorityNav.init({
        ...options,
        breakPoint: 0
    });
};
