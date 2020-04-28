const initAdviceFeedback = () => {
    try {
        const d = document;
        const form = d.getElementById('cads-advice-feedback');
        const form2 = d
            .getElementById('cads-advice-feedback-form')
            .getElementsByClassName('cads-form')[0];
        const errorSummary = form.getElementsByClassName(
            'cads-error-summary'
        )[0];

        d.getElementById('cads-advice-feedback__yes').addEventListener(
            'click',
            () => {
                // Yes
                form.classList.remove('step1');
                form.classList.add('step3');

                // TODO Send respong to API
                console.log('Send "page was useful" reply');
            }
        );

        d.getElementById('cads-advice-feedback__no').addEventListener(
            'click',
            () => {
                // No
                form.classList.remove('step1');
                form2.classList.remove('cads-form-error');
                form.classList.add('step2');
            }
        );

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
                errorSummary.getElementsByClassName(
                    'cads-error-summery__field_count'
                )[0].innerHTML = '1 field';
                const errorList = errorSummary.getElementsByClassName(
                    'cads-error-summary__list'
                )[0];
                errorList.innerHTML = '<li>Select a feedback option</li>';
                errorSummary.style.display = 'block';
            } else {
                errorSummary.style.display = 'none';
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
            errorSummary.style.display = 'none';
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
