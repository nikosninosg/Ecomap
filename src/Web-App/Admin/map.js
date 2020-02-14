let mymap = L.map("map").setView([38.24, 21.73], 12);

const attribution =
	'&copy; <a href="https://www.openstreetpam.org/copyright">OpenStreetMap</a> contributors';
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
let tiles = L.tileLayer(url, { attribution });

tiles.addTo(mymap);

//----------------------------------------

let list = [];
let i = 2015;
while (list.length < 6) {
	list.push(i.toString());
	i += 1;
}

//----------------------------------------

function populateDropdown(id, items) {
	let dropdown = document.getElementById(id);
	for (year of items) {
		let btn = document.createElement("button");
		let textNode = document.createTextNode(year);
		btn.appendChild(textNode);
		btn.setAttribute("onclick", "updateLabel(this)");
		btn.classList.add("dropdown-item");
		dropdown.appendChild(btn);
	}
}

function updateLabel(element) {
	element.parentNode.parentNode.childNodes[1].textContent = element.textContent;
	if (!element.parentNode.classList.contains("until")) {
		let group = element.parentNode.parentNode.parentNode;
		let dropdown = group.querySelector("div.until");
		let btns = dropdown.children;
		for (btn of btns) {
			btn.toggleAttribute("disabled", false);
		}
		for (btn of btns) {
			if (btn.textContent == element.textContent) {
				btn.toggleAttribute("disabled", true);
				break;
			}
			btn.toggleAttribute("disabled", true);
		}
	}
}

function rangeToggle(btn) {
	btn.classList.toggle("active");
	btn.parentNode.childNodes[5].childNodes[1].toggleAttribute("disabled");
}

function populateActivities(id, items) {
	let dropdown = document.getElementById(id);
	for (activity of items) {
		let btn = document.createElement("button");
		let textNode = document.createTextNode(activity);
		btn.appendChild(textNode);
		btn.setAttribute("onclick", "tick(this)");
		btn.classList.add("dropdown-item");
		dropdown.appendChild(btn);
	}
}

function tick(button) {
	let tick = '<i class="fas fa-check"></i>';
	if (button.classList.contains("ticked")) {
		button.classList.remove("ticked");
		let s = button.textContent;
		button.innerHTML = s;
	} else {
		button.classList.add("ticked");
		button.innerHTML = tick + button.innerHTML;
	}
}

function collectSelectos() {}

//----------------------------------------

populateActivities("activities-list", ["drive", "walk"]);

populateDropdown("first-year-list", list);
populateDropdown("last-year-list", list);
document.getElementById("last-year").toggleAttribute("disabled");

populateDropdown("first-month-list", [
	"JAN",
	"FEB",
	"MAR",
	"APR",
	"MAY",
	"JUN",
	"JUL",
	"AUG",
	"SEP",
	"OCT",
	"NOV",
	"DEC"
]);
populateDropdown("last-month-list", [
	"JAN",
	"FEB",
	"MAR",
	"APR",
	"MAY",
	"JUN",
	"JUL",
	"AUG",
	"SEP",
	"OCT",
	"NOV",
	"DEC"
]);
document.getElementById("last-month").toggleAttribute("disabled");

populateDropdown("first-day-list", [
	"MON",
	"TUE",
	"WED",
	"THU",
	"FRI",
	"SAT",
	"SUN"
]);
populateDropdown("last-day-list", [
	"MON",
	"TUE",
	"WED",
	"THU",
	"FRI",
	"SAT",
	"SUN"
]);
document.getElementById("last-day").toggleAttribute("disabled");

populateDropdown("first-hour-list", [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24
]);
populateDropdown("last-hour-list", [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24
]);

document.getElementById("last-hour").toggleAttribute("disabled");
//--------------------------------------------------

function getJSON() {
	yearStart = document
		.getElementById("first-year")
		.textContent.replace(/\t|\n/g, "");
	yearEnd = document
		.getElementById("last-year")
		.textContent.replace(/\t|\n/g, "");
	monthStart = document
		.getElementById("first-month")
		.textContent.replace(/\t|\n/g, "");
	monthEnd = document
		.getElementById("last-month")
		.textContent.replace(/\t|\n/g, "");
	dayStart = document
		.getElementById("first-day")
		.textContent.replace(/\t|\n/g, "");
	dayEnd = document
		.getElementById("last-day")
		.textContent.replace(/\t|\n/g, "");
	hourStart = document
		.getElementById("first-hour")
		.textContent.replace(/\t|\n/g, "");
	hourEnd = document
		.getElementById("last-hour")
		.textContent.replace(/\t|\n/g, "");
	let actList = [];
	let list = document.getElementById("activities-list").children;
	for (item of list) {
		if (item.classList.contains("ticked")) {
			actList.push(item.textContent);
		}
	}
	return {
		yearStart: yearStart,
		yearEnd: yearEnd,
		monthStart: monthStart,
		monthEnd: monthEnd,
		dayStart: dayStart,
		dayEnd: dayEnd,
		hourStart: hourStart,
		hourEnd: hourEnd,
		actList: actList
	};
}

//================================================================================

//const data = {fuck: "you",u: 2,why: "mean"};

//fetch('http://localhost:80/index.html/testing-backend/test.php', {
//	method: "POST",
//	headers: { "Content-Type": "application/json" },
//	body: JSON.stringify(data)
//	})
//	.then(res => { return res.text(); }).then((data) => {console.log(data);}) .catch((res) => console.log('8==D'));

let fileUrl =
	"http://localhost:80/index.html/testing-backend/locationDataSmall.json";

var cfg = {
	radius: 30,
	maxOpacity: 0.7,
	scaleRadius: false,
	useLocalExtrema: false,
	latField: "lat",
	lngField: "lng",
	valueField: "count"
};

async function recieveCoords() {
	let coords = [];
	let data = await fetch(fileUrl).then(response => {
		return response.json();
	});
	for (i of data.locations) {
		pair = {
			lat: i.latitudeE7 / 10000000,
			lng: i.longitudeE7 / 10000000,
			count: 1
		};
		coords.push(pair);
	}
	return { max: 10, data: coords };
}

async function drawHeatMap(map) {
	if (map.heatmap) {
		map.remove(heatmap);
		return;
	}

	let data = await recieveCoords().then(data => {
		return data;
	});
	console.log(data);

	let heatmap = new HeatmapOverlay(cfg);
	map.addLayer(heatmap);
	heatmap.setData(data);
}
