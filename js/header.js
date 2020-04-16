const initHeader = () => {
    try {
        const header = document.getElementsByClassName('cads-header')[0];
        const controlButton = document.getElementsByClassName(
            'cads-search-reveal'
        )[0];

        controlButton.addEventListener('click', () => {
            if (header.classList.contains('cads-header-show-search')) {
                header.classList.remove('cads-header-show-search');
                controlButton.classList.remove('cads-icon-close');
                controlButton.classList.add('cads-icon-search');
                controlButton.ariaExpanded = false;
                controlButton.title = 'Open search';
            } else {
                header.classList.add('cads-header-show-search');
                controlButton.classList.remove('cads-icon-search');
                controlButton.classList.add('cads-icon-close');
                controlButton.ariaExpanded = true;
                controlButton.title = 'Close search';
            }
        });
    } catch (e) {
        console.warn(`Could not initialise header ${e}`);
    }
};

export default initHeader;
