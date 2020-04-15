const initAdviceFeedback = () => {
    try {
        const f = document.getElementById('cads-advice-feedback');
        f.classList.add('step1');
    } catch (e) {
        console.log(`Could not initialise header ${e}`);
    }
};

export default initAdviceFeedback;
