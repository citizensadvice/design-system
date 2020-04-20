const initAdviceFeedback = () => {
    try {
        const d = document;
        const form = d.getElementById('cads-advice-feedback');
        const rg = d.getElementsByName('radiogroup-advice-feedback');
        const form2 = d
            .getElementById('cads-advice-feedback-form')
            .getElementsByClassName('cads-form')[0];

        rg[0].addEventListener('change', () => {
            // Yes
            form.classList.remove('step1');
            form.classList.add('step3');

            // TODO Send respong to API
            console.log('Send "page was useful" reply');
        });

        rg[1].addEventListener('change', () => {
            // No
            form.classList.remove('step1');
            form2.classList.remove('cads-form-error');
            form.classList.add('step2');
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            const moreInfo = d.getElementById('advice-feedback-optional-input')
                .value;
            let reason = null;
            const rg2 = d.getElementsByName('radiogroup-advice-feedback-step2');
            for (let j = 0; j < rg2.length; j++) {
                if (rg2[j].checked) {
                    reason = rg2[j].value;
                    break;
                }
            }

            if (!reason) {
                form.setAttribute('aria-invalid', true);
                form2.classList.add('cads-form-error');
            } else {
                form.setAttribute('aria-invalid', false);
                form.classList.remove('step2');
                form.classList.add('step3');

                // TODO Send response to API
                console.log(reason, moreInfo);
            }
        });

        const closeButton = form.getElementsByClassName(
            'cads-advice-feedback__close'
        )[0];
        closeButton.addEventListener('click', e => {
            e.preventDefault();
            rg[0].checked = false;
            rg[1].checked = false;
            form.classList.add('step1');
            form.classList.remove('step2');
            form.classList.remove('step3');
        });

        form.classList.add('step1');
    } catch (e) {
        console.warn(`Could not initialise advice feedback component. ${e}`);
    }
};

export default initAdviceFeedback;
