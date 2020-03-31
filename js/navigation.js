import priorityNav from '@baseonmars/priority-nav';

export default priorityNav;

export const initNavigation = options => {
    priorityNav.init({
        ...options,
        breakPoint: 0,
        navDropdownLabel:
            '<span class="cads-navigation-toggle-label">More navigation items</span>'
    });
};
