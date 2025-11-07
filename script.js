
let toutsSections = document.querySelectorAll('.screen');
let btns = document.querySelectorAll('.sidebar__btn');
const headerr=document.getElementById('page-title');
function screenlesSection(index) {
    toutsSections.forEach(section => {
        section.classList.remove('is-visible')
        const datasection = index.dataset.screen;
        let sectionstatus=section.dataset.screen;
        if (sectionstatus === datasection) {
            section.classList.add('is-visible')

            //localStorage
            localStorage.setItem('datasection',sectionstatus);
        }

    });
    btns.forEach(btn => {
        btn.classList.remove("is-active")
        const databtns = index.dataset.screen;
        let btnstatus=btn.dataset.screen;
        if (btnstatus === databtns) {
            btn.classList.add("is-active");
            //localStorage
            localStorage.setItem('btnstatus',databtns);
        }

       
    });

}












