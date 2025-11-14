let events = [];
let archeve = [];
// switch entre les buttons et les sections
let toutsSections = document.querySelectorAll('.screen');
let btns = document.querySelectorAll('.sidebar__btn');
const title = document.getElementById('page-title');
function screenlesSection(index) {
  toutsSections.forEach(section => {
    section.classList.remove('is-visible')
    let datasection = index.dataset.screen;
    let sectionstatus = section.dataset.screen;
    if (sectionstatus === datasection) {
      section.classList.add('is-visible')
      //localStorage
      localStorage.setItem('datasection', sectionstatus);
    }
  });
  btns.forEach(btn => {
    btn.classList.remove("is-active")
    databtns = index.dataset.screen;
    let btnstatus = btn.dataset.screen;
    if (btnstatus === databtns) {
      btn.classList.add("is-active");
      //localStorage
      localStorage.setItem('btnstatus', databtns);
    }
  });

  // verification de title
  if (index.dataset.screen === "stats") {
    title.textContent = "statistique";
    // subtitle.textContent = "Overview of your events";
  } else if (index.dataset.screen === "add") {
    title.textContent = "Add event";
    // subtitle.textContent = "Overview of your events";

  } else if (index.dataset.screen === "list") {
    title.textContent = "Events";
    // subtitle.textContent = "Overview of your events";

  } else if (index.dataset.screen === "archive") {
    title.textContent = "Archive";
    // subtitle.textContent = "Overview of your events";

  }
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
  // stocke data
  let Dataa = {
    title: title,
    imagee: imageurl,
    discription: description,
    seatss: nombrseats,
    prixx: prixbase,
  }
  // console.log(Dataa);
  events.push(Dataa);
  // console.log(events);
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
function Statistique() {
  btncreateevent.addEventListener('click', function () {

    // events
    ++TOTALEVENTS;
    totalevent.innerHTML = TOTALEVENTS;
    // seats
    TOTALSEATS += Number(seats.value);
    toatlseats.innerHTML = TOTALSEATS;
    // revenu
    TOTALREVENU += Number(price.value);
    totalrevenu.innerHTML = TOTALREVENU;

  });
}
Statistique();


// console.log('detals0');

// list des events 
function listevents() {
  const tbody = document.querySelector(".table__body");
  var cntrevent = 0;
  tbody.innerHTML = "";
  events.forEach(event => {
    tbody.innerHTML += `
    <tr class="table__row" >
        <td>${++cntrevent}</td>
        <td class="table_row">${event.title}</td>
        <td>${event.seatss}</td>
        <td><span class="badge">$${event.prixx}</span></td>
        <td>${contrVaraint}</td>
   
        <td>
          <button class="btn btn--small" data-action="details" onclick="Details(${cntrevent})"  data-event-id="1">Details</button>
          <button class="btn btn--small" data-action="edit" data-event-id="1" onclick="Edit(${cntrevent})">Edit</button>
          <button class="btn btn--danger btn--small" data-action="archive" class="deletet" data-event-id="1" onclick="DELETEevent(${cntrevent}),listeArchive()" >Delete</button>
        </td>
    </tr>`
  });
  search();
}
// search
function search() {
  const input = document.querySelector('#search-events');
  const tabll = document.querySelectorAll('.table__row');
  input.addEventListener('input', evx => {
    let xxx = evx.target.value.toLowerCase();
    tabll.forEach(eventt => {
      const td = eventt.querySelector('.table_row');
      if (td.textContent.toLowerCase().includes(xxx)) {
        eventt.style.display = "table-row";
      } else {
        eventt.style.display = "none";
      }
    });
  })
  // console.log(tabll);
  // console.log(xxx);
}
// Edit()
function Edit(index) {
  // console.log(index);
  // const index = btn - 1;
  const evv = events[index - 1];

  // console.log(evv);
  document.querySelector("#event-title").value = evv.title;
  document.querySelector("#event-image").value = evv.imagee;
  document.querySelector("#event-description").value = evv.discription;
  document.querySelector("#event-seats").value = evv.seatss;
  document.querySelector("#event-price").value = evv.prixx;
  const s = document.querySelector('button[data-screen="add"]')
  screenlesSection(s);
  const btncreatevent = document.querySelector('.btn--primary');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    btncreatevent.addEventListener('submit', function () {
      evv.title = document.querySelector("#event-title").value;
      evv.imagee = document.querySelector("#event-image").value;
      evv.discription = document.querySelector("#event-description").value;
      evv.seatss = document.querySelector("#event-seats").value;
      evv.prixx = document.querySelector("#event-price").value;
    });
  })

  events.splice(evv, 1)[0];

    --TOTALEVENTS;
  totalevent.innerHTML = TOTALEVENTS;
  // new total seats
  TOTALSEATS = TOTALSEATS - evv.seatss;
  toatlseats.innerHTML = TOTALSEATS;
  // console.log('seats ');
  // console.log(TOTALSEATS);
  // new total revenu
  TOTALREVENU = TOTALREVENU - evv.prixx;
  totalrevenu.innerHTML = TOTALREVENU + "$";
  // console.log('prix ');
}

// console.log('detals1');

// details

const modal = document.querySelector('.modal');
function Details(index) {
  modal.classList.remove('is-hidden');
  const modal_body = document.querySelector('.modal__body');
  const evv = events[index - 1];
  // events.forEach(event => {
  modal_body.innerHTML = `
  <h1>TITLE :${evv.title}</h1>
  <p>description:${evv.discription}</p>
  <p>seats: ${evv.seatss}</p>
  <p>price: ${evv.prixx}$</p>
`
  // })
}
// console.log('detals10');
// close modal
function closemodal() {
  const modaldiv = document.querySelector(".modal")
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
}
// console.log(events);

//   btn remove varaint
function removebtnDIV(btn) {
  contrVaraint--;
  let BTNREMOVE = btn.closest('.variant-row');
  BTNREMOVE.remove();
}
// delete event
function DELETEevent(btn) {
  const index = btn - 1;
  var removed = events.splice(index, 1)[0];
  archeve.push(removed);
  listeArchive();
  listevents();
  // new total events
  --TOTALEVENTS;
  totalevent.innerHTML = TOTALEVENTS;
  // new total seats
  TOTALSEATS = TOTALSEATS - removed.seatss;
  toatlseats.innerHTML = TOTALSEATS;
  // console.log('seats ');
  // console.log(TOTALSEATS);
  // new total revenu
  TOTALREVENU = TOTALREVENU - removed.prixx;
  totalrevenu.innerHTML = TOTALREVENU + "$";
  // console.log('prix ');
  // console.log(TOTALREVENU);

  // console.log("removed");
  // console.log(removed);

}

// lestArchive
function listeArchive() {
  const tbody = document.querySelectorAll(".table__body")[1];
  // if(!tbody) return;
  let cntrevent = 0;
  tbody.innerHTML = "";
  archeve.forEach(event => {
    tbody.innerHTML += `
         <tr class="search" >
               <td>${++cntrevent}</td>
               <td>${event.title}</td>
               <td>${event.seatss}</td>
              <td>${event.prixx}$</td>
              <td>${event.contrVaraint || 0}</td>
              <td>
                <button class="btn btn--small" data-action="restore" onclick="restorEvent(${cntrevent})" data-event-id="1">Restore</button>
               </td>
         </tr>`
  });
}

// restor event
function restorEvent(btnn) {
  const index = btnn - 1;
  const restored = archeve.splice(index, 1)[0];
  events.push(restored);
  listeArchive();
  listevents();

  // new total events
  ++TOTALEVENTS;
  totalevent.innerHTML = TOTALEVENTS;
  // new total seats
  TOTALSEATS = TOTALSEATS + Number(restored.seatss);
  toatlseats.innerHTML = TOTALSEATS;
  // console.log('seats ');
  // console.log(TOTALSEATS);
  // new total revenu
  TOTALREVENU = TOTALREVENU + Number(restored.prixx);
  totalrevenu.innerHTML = TOTALREVENU + "$";
  // console.log('prix ');
  // console.log(TOTALREVENU);
}


