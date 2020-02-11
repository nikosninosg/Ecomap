let mymap = L.map('map').setView([38.24,21.73],12);

const attribution = '&copy; <a href="https://www.openstreetpam.org/copyright">OpenStreetMap</a> contributors';
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let tiles = L.tileLayer(url, {attribution});

tiles.addTo(mymap);

//----------------------------------------

let list = [];
let i=2015;
while (list.length < 6){
	list.push(i.toString());
	i +=1;
}

//----------------------------------------

function populateDropdown(id,items){
	let dropdown = document.getElementById(id);
	for (year of items){
		let btn = document.createElement("button");	
		let textNode = document.createTextNode(year);
		btn.appendChild(textNode);
		btn.setAttribute("onclick","updateLabel(this)");
		btn.classList.add("dropdown-item");
		dropdown.appendChild(btn);
	}				
}

function updateLabel(element){
	element.parentNode.parentNode.childNodes[1].textContent = element.textContent;
		
}

function rangeToggle(btn){
	btn.classList.toggle("active");
	btn.parentNode.childNodes[5].childNodes[1].toggleAttribute("disabled");
}

function populateActivities(id,items){
	let dropdown = document.getElementById(id);
	for (activity of items){
		let btn = document.createElement("button");	
		let textNode = document.createTextNode(activity);
		btn.appendChild(textNode);
		btn.setAttribute("onclick","tick(this)");
		btn.classList.add("dropdown-item");
		dropdown.appendChild(btn);
	}				
}

function tick(button){
	let tick = '<i class="fas fa-check"></i>';
	if(button.classList.contains("ticked")){
		button.classList.remove("ticked");
		let s = button.textContent; 
		button.innerHTML = s;

	}else{
		button.classList.add("ticked");
		button.innerHTML = tick + button.innerHTML;
	}

}
//----------------------------------------


populateActivities("activities-list",["drive","walk"]);


populateDropdown("first-year-list", list);
populateDropdown("last-year-list", list);
document.getElementById("last-year").toggleAttribute("disabled");

populateDropdown("first-month-list", ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]);
populateDropdown("last-month-list", ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]);
document.getElementById("last-month").toggleAttribute("disabled");

populateDropdown("first-day-list",[ "MON","TUE","WED","THU","FRI","SAT","SUN"]);
populateDropdown("last-day-list",[ "MON","TUE","WED","THU","FRI","SAT","SUN"] );
document.getElementById("last-day").toggleAttribute("disabled");

populateDropdown("first-hour-list", [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
populateDropdown("last-hour-list", [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
document.getElementById("last-hour").toggleAttribute("disabled");
