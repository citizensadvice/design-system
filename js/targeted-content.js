const initTargetedContent = () => {
    try {
        const content = document.getElementsByClassName(
            'cads-targeted-content'
        );
        content.forEach(item => {
            const summary = item.getElementsByClassName(
                'cads-targeted-content__summary'
            )[0];

            summary.addEventListener('click', () => {
                if (item.classList.contains('is-open')) {
                    item.classList.remove('is-open');
                    summary.ariaExpanded = false;
                } else {
                    item.classList.add('is-open');
                    summary.ariaExpanded = true;
                }
            });
            item.getElementsByClassName(
                'cads-targeted-content__close-button'
            )[0].addEventListener('click', () => {
                item.classList.remove('is-open');
            });
        });
    } catch (e) {
        console.log(`Could not initialise targeted content ${e}`);
    }
};

export default initTargetedContent;
