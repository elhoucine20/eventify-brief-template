
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
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
   e.preventDefault();
  const btnclear = document.querySelector(".btn--ghost");
  const btncreateevent = document.querySelector(".btn--primary");
  const regextitle = /^[a-zA-ZÀ-ÿ0-9\s'.,-]{2,100}$/;
  const regeximageurl = /^(https?:\/\/.*.(?:png|jpg|jpeg|gif|webp|svg))$/i;
  const regexdescription = /^[\wÀ-ÿ\s.,'?!-]{10,500}$/;
  const regexnombrseats = /^[1-9][0-9]{0,2}$/;
  const regexprixbase = /^(?:\d+|\d+.\d{1,2})$/;
  const title = document.querySelector("#event-title").value;
  const imageurl = document.querySelector("#event-image").value;
  const description = document.querySelector("#event-description").value;
  const nombrseats = document.querySelector("#event-seats").value;
  const prixbase = document.querySelector("#event-price").value;
  if (!regextitle.test(title)) {
    alert("saisir title");
  }

  if (!regeximageurl.test(imageurl)) {
    alert("saisir url");
  }
  
  
  if (!regexdescription.test(description)) {
    alert("saisir description");
  }
  
  
  if (!regexnombrseats.test(nombrseats)) {
    alert("saisir nombre seats");
  }
  
  if (!regexprixbase.test(prixbase)) {
    alert("saisir le prix");
  }
  form.reset();
});


