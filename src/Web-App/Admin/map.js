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

function populateDropdown(id,list){
	let dropdown = document.getElementById(id);
	for (year of list){
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

populateDropdown("first-year-list", list);
populateDropdown("last-year-list", list);
document.getElementById("last-year").toggleAttribute("disabled");

