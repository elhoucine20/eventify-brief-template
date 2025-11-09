
  let events = [];
  let archevs = [];
// switch entre les buttons et les sections
let toutsSections = document.querySelectorAll('.screen');
let btns = document.querySelectorAll('.sidebar__btn');
const headerr = document.getElementById('page-title');
function screenlesSection(index) {
  toutsSections.forEach(section => {
    section.classList.remove('is-visible')
    const datasection = index.dataset.screen;
    let sectionstatus = section.dataset.screen;
    if (sectionstatus === datasection) {
      section.classList.add('is-visible')
      //localStorage
      localStorage.setItem('datasection', sectionstatus);
    }
  });
  btns.forEach(btn => {
    btn.classList.remove("is-active")
    const databtns = index.dataset.screen;
    let btnstatus = btn.dataset.screen;
    if (btnstatus === databtns) {
      btn.classList.add("is-active");
      //localStorage
      localStorage.setItem('btnstatus', databtns);
    }
  });
}

// validation du form
let form = document.querySelector("form");
  let btncreateevent = document.querySelector(".btn--primary");
  let btnclear = document.querySelector(".btn--ghost");

form.addEventListener("submit", (e) => {
  e.preventDefault();
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
let Dataa = {
  title: title,
  imagee: imageurl,
  discripetion: description,
  seatss: nombrseats,
  prixx: prixbase,
}   
     console.log(Dataa);
     events.push(Dataa);
     console.log(events);
     listevents();
  form.reset();
});
  


    // add total(event,seats,prix)
    // alert("fin du form");
    let totalevent = document.getElementById('stat-total-events');
    let toatlseats = document.getElementById('stat-total-seats');
    let totalrevenu = document.getElementById('stat-total-price');
    let TOTALEVENTS = Number(totalevent.textContent);
    let TOTALSEATS = Number(toatlseats.textContent);
    totalrevenu.innerHTML="0";
    let TOTALREVENU =Number(totalrevenu.textContent);
    // input seats
    let seats=document.getElementById('event-seats');
    let price=document.getElementById('event-price');
    // alert("add event 1");
    btncreateevent.addEventListener('click', function () {
    alert("add event 2");

      // events
    ++TOTALEVENTS;
    totalevent.innerHTML=TOTALEVENTS;
    // seats
    TOTALSEATS += Number( seats.value);
    toatlseats.innerHTML=TOTALSEATS;
    // revenu
    TOTALREVENU+= Number(price.value);
    totalrevenu.innerHTML="$"+ TOTALREVENU;
    alert("add event 2");
  });

    alert("start1");

  // affichie list des events
  
    alert("start2");



function listevents() {
  const tbody=document.querySelector(".table__body");
  let cntrevent=1;
  tbody.innerHTML="";
  events.forEach(event => {
    tbody.innerHTML+=`
    <tr class="table__row" >
        <td>${cntrevent++}</td>
        <td>${event.title}</td>
        <td>${event.seatss}</td>
        <td><span class="badge">${event.prixx}</span></td>
        <td>
          <button class="btn btn--small" data-action="details" onclick=('deletetable()') data-event-id="1">Details</button>
          <button class="btn btn--small" data-action="edit" data-event-id="1">Edit</button>
          <button class="btn btn--danger btn--small" data-action="archive" data-event-id="1">Delete</button>
        </td>
    </tr>`
  });
}
    alert("final");

