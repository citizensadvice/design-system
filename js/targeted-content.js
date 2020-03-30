const initTargetedContent = () => {
    try {
        const content = document.getElementsByClassName(
            'cads-targeted-content'
        );
        content.forEach(item => {
            item.getElementsByClassName(
                'cads-targeted-content__title'
            )[0].addEventListener('click', () => {
                if (item.classList.contains('is-open')) {
                    item.classList.remove('is-open');
                } else {
                    item.classList.add('is-open');
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
