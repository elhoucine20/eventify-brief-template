
let toutsSections = document.querySelectorAll('.screen');
let btns = document.querySelectorAll('.sidebar__btn');

function screenlesSection(index) {
    toutsSections.forEach(section => {
        section.classList.remove('is-visible')
        const datasection = index.dataset.screen;
        if (section.dataset.screen === datasection) {
            section.classList.add('is-visible')
        }
    });

    btns.forEach(btn => {
        btn.classList.remove("is-active")
        const databtns = index.dataset.screen;
        if (btn.dataset.screen === databtns) {
            btn.classList.add("is-active");
        }
    });
}

