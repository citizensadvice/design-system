const initHeader = () => {
    try {
        const header = document.getElementsByClassName('cads-header')[0];
        const controlButtons = document.getElementsByClassName(
            'cads-search-reveal'
        );

        controlButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (header.classList.contains('cads-header-show-search')) {
                    header.classList.remove('cads-header-show-search');
                } else {
                    header.classList.add('cads-header-show-search');
                }
            });
        });
    } catch (e) {
        console.log(`Could not initialise header ${e}`);
    }
};

export default initHeader;
