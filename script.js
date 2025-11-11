
let events = [];
let archeve = [];
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
    discription: description,
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
let totalevent = document.getElementById('stat-total-events');
let toatlseats = document.getElementById('stat-total-seats');
let totalrevenu = document.getElementById('stat-total-price');
let TOTALEVENTS = Number(totalevent.textContent);
let TOTALSEATS = Number(toatlseats.textContent);
totalrevenu.innerHTML = "0";
let TOTALREVENU = Number(totalrevenu.textContent);
// input seats
let seats = document.getElementById('event-seats');
let price = document.getElementById('event-price');
// alert("add event 1");
btncreateevent.addEventListener('click', function () {

  // events
  ++TOTALEVENTS;
  totalevent.innerHTML = TOTALEVENTS;
  // seats
  TOTALSEATS += Number(seats.value);
  toatlseats.innerHTML = TOTALSEATS;
  // revenu
  TOTALREVENU += Number(price.value);
  totalrevenu.innerHTML = "$" + TOTALREVENU;
});
console.log('detals0');

// list des events 
function listevents() {
  const tbody = document.querySelector(".table__body");
  let cntrevent = 1;
  tbody.innerHTML = "";
  events.forEach(event => {
    tbody.innerHTML += `
    <tr class="table__row" >
        <td>${cntrevent++}</td>
        <td>${event.title}</td>
        <td>${event.seatss}</td>
        <td><span class="badge">$${event.prixx}</span></td>
        <td>${contrVaraint}</td>

        <td>
          <button class="btn btn--small" data-action="details" onclick="Details()"  data-event-id="1">Details</button>
          <button class="btn btn--small" data-action="edit" data-event-id="1">Edit</button>
          <button class="btn btn--danger btn--small" data-action="archive" class="deletet" data-event-id="1" onclick="DELETEevent(this)">Delete</button>
        </td>
    </tr>`
  });
}
console.log('detals1');
// details
const modal = document.querySelector('.modal');
function Details(index) {
  modal.classList.remove('is-hidden');
  const ditals = document.querySelector('.modal__body');
  events.forEach(event => {
  ditals.innerHTML = `
  <h1>TITLE :${event.title}</h1>
  <p>description:${event.discription}</p>
  <p>seats: ${event.seatss}</p>
  <p>price: ${event.prixx}</p>
`
  })
}
console.log('detals10');








function closemodal() {
  const modaldiv=document.querySelector(".modal")
  modal.classList.add('is-hidden');
}

/// add varaint
let contrVaraint = 0;
function ListVaraint() {
  contrVaraint++;
  const varaintList = document.querySelector('.variants__list');
  varaintList.innerHTML += `
<div class="variant-row">
   <input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" />
   <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
   <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
   <select class="select variant-row__type">
   <option value="fixed">Fixed Price</option>
   <option value="percentage">Percentage Off</option>
   </select>
   <button  type="button" class="btn btn--danger btn--small variant-row__remove" onclick="removebtnDIV(this)">Remove</button>
</div>
`
  // const removeVaraint = document.querySelector('.variant-row__remove');
  // console.log('zid2');

}
console.log(events);
//   btn remove varaint
function removebtnDIV(btn) {
  contrVaraint--;
  let BTNREMOVE = btn.closest('.variant-row');
  BTNREMOVE.remove();
}
// delete event
function DELETEevent(event) {
  const delett = event.closest('.table__row');
  delett.remove();
  events.splice(event,1);
  archeve.push(delett);
}


















