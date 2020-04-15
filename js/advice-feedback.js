const initAdviceFeedback = () => {
    try {
        const f = document.getElementById('cads-advice-feedback');
        console.log(f);
    } catch (e) {
        console.log(`Could not initialise header ${e}`);
    }
};

export default initAdviceFeedback;
