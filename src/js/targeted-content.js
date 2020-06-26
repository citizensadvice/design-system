const initTargetedContent = () => {
    try {
        const pageContents = document.getElementsByClassName(
            'cads-main-content'
        );
        const pageContent =
            pageContents && pageContents.length ? pageContents[0] : document;
        const content = pageContent.getElementsByClassName(
            'cads-targeted-content'
        );

        // Expand/collapse handlers for individual items
        for (let i = 0; i < content.length; i++) {
            const item = content[i];
            const summary = item.getElementsByClassName(
                'cads-targeted-content__summary'
            )[0];

            summary.addEventListener('click', () => {
                if (item.classList.contains('is-open')) {
                    item.classList.remove('is-open');
                    summary.setAttribute('aria-expanded', false);
                } else {
                    item.classList.add('is-open');
                    summary.setAttribute('aria-expanded', true);
                }
            });
            item.getElementsByClassName(
                'cads-targeted-content__close-button'
            )[0].addEventListener('click', () => {
                item.classList.remove('is-open');
                summary.setAttribute('aria-expanded', false);
                item.open = false;
            });
        }

        // Print setup
        // eslint-disable-next-line
        window.addEventListener('beforeprint', () => {
            for (let i = 0; i < content.length; i++) {
                const item = content[i];
                const summary = item.getElementsByClassName(
                    'cads-targeted-content__summary'
                )[0];
                if (!item.classList.contains('is-open')) {
                    summary.click();
                }
            }
        });

        // Expand all button for adviser if content present
        if (content.length > 0) {
            const h1 = pageContent.getElementsByTagName('h1')[0];
            const b = document.createElement('buton');
            b.innerHTML = 'Expand all<span class="cads-icon-plus"></span>';
            b.setAttribute('type', 'button');
            b.classList.add('cads-targeted-content__expand-all');
            b.addEventListener('click', e => {
                let expandAll = false;
                const { target } = e;
                if (target.innerText === 'Expand all') {
                    target.innerHTML =
                        'Collapse all<span class="cads-icon-minus"></span>';
                    expandAll = true;
                } else {
                    target.innerHTML =
                        'Expand all<span class="cads-icon-plus"></span>';
                }

                for (let i = 0; i < content.length; i++) {
                    const item = content[i];
                    const summary = item.getElementsByClassName(
                        'cads-targeted-content__summary'
                    )[0];
                    if (
                        (expandAll && !item.classList.contains('is-open')) ||
                        (!expandAll && item.classList.contains('is-open'))
                    ) {
                        summary.click();
                    }
                }
            });
            h1.parentNode.insertBefore(b, h1.nextSibling);
        }
    } catch (e) {
        console.warn(`Could not initialise targeted content ${e}`);
    }
};

export default initTargetedContent;
