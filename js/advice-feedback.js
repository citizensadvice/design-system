const initAdviceFeedback = () => {
    try {
        const d = document;
        const form = d.getElementById('cads-advice-feedback');
        form.classList.add('step1');
        const rg = d.getElementsByName('radiogroup-advice-feedback');
        for (let i = 0; i < rg.length; i++) {
            const item = rg[i];
            item.addEventListener('change', () => {
                if (item.value.toLowerCase() === 'yes') {
                    form.classList.remove('step1');
                    form.classList.add('step3');

                    // TODO Send respong to API
                    console.log('Send "page was useful" reply');
                } else {
                    form.classList.remove('step1');
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
                        for (let i = 0; i < rg2.length; i++) {
                            if (rg2[i].checked) {
                                reason = rg2[i].value;
                                break;
                            }
                        }

                        // TODO Send response to API
                        console.log(reason, moreInfo);

                        form.classList.remove('step2');
                        form.classList.add('step3');
                    });
                }
            });
        }
    } catch (e) {
        console.log(`Could not initialise header ${e}`);
    }
};

export default initAdviceFeedback;
