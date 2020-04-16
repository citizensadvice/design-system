const initAdviceFeedback = () => {
    try {
        const d = document;
        const form = d.getElementById('cads-advice-feedback');
        form.classList.add('step1');
        const rg = d.getElementsByName('radiogroup-advice-feedback');

        rg[0].addEventListener('change', () => {
            // Yes
            // form.classList.remove('step1');
            form.classList.add('step3');

            // TODO Send respong to API
            console.log('Send "page was useful" reply');
        });

        rg[1].addEventListener('change', () => {
            // No
            // form.classList.remove('step1');
            form.classList.add('step2');
            form.addEventListener('submit', e => {
                e.preventDefault();
                const moreInfo = d.getElementById(
                    'advice-feedback-optional-input'
                ).value;
                let reason = 'No reason given';
                const rg2 = d.getElementsByName(
                    'radiogroup-advice-feedback-step2'
                );
                for (let j = 0; j < rg2.length; j++) {
                    if (rg2[j].checked) {
                        reason = rg2[j].value;
                        break;
                    }
                }

                // form.classList.remove('step2');
                form.classList.add('step3');

                // TODO Send response to API
                console.log(reason, moreInfo);
            });
        });
    } catch (e) {
        console.warn(`Could not initialise advice feedback component. ${e}`);
    }
};

export default initAdviceFeedback;
