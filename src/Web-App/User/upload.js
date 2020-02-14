let mymap = L.map("map").setView([38.230462, 21.75315], 12);

const attribution =
	'&copy; <a href="https://www.openstreetpam.org/copyright">OpenStreetMap</a> contributors';
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
let tiles = L.tileLayer(url, { attribution });

tiles.addTo(mymap);

L.circle([38.230462, 21.75315], { radius: 10000 })
	.setStyle({ fillOpacity: 0.2, stroke: false, color: "green" })
	.addTo(mymap);

mymap.on("contextmenu", drawNoZone);
let lGroup = L.layerGroup().addTo(mymap);

function drawNoZone(event) {
	let rect = L.rectangle(L.latLngBounds(event.latlng, event.latlng), {
		color: "red"
	}).addTo(mymap);

	let p1 = event.latlng;
	mymap.on("contextmenu", innerCall);
	mymap.off("contextmenu", drawNoZone);
	mymap.on("mousemove", drawRect);

	function innerCall() {
		mymap.off("contextmenu", innerCall);
		mymap.off("mousemove", drawRect);
		mymap.on("contextmenu", drawNoZone);
		rect.on("click", rect.remove);
		lGroup.addLayer(rect);
	}

	function drawRect(event) {
		let p2 = event.latlng;
		bounds = L.latLngBounds(p1, p2);
		rect.setBounds(bounds);
	}
}

//-------------------------------------------------------------------------------------------------

function getRectangles() {
	let recs = [];
	lGroup.eachLayer(rect => {
		recs.push({
			west: rect.getBounds().getWest(),
			north: rect.getBounds().getNorth(),
			east: rect.getBounds().getEast(),
			south: rect.getBounds().getSouth()
		});
	});
	return recs;
}

function isInNoZone(rectangles, point) {
	for (rect of rectangles) {
		if (
			point.lat > rect.north ||
			point.lat < rect.south ||
			point.lng < rect.west ||
			point.lng > rect.east
		)
			return false;
	}
	return true;
}
//-------------------------------------------------------------------------------------------------

document.getElementById("file-input").addEventListener("change", handleUpload);

function readUploadedFile(input) {
	const fileReader = new FileReader();
	return new Promise((resolve, reject) => {
		fileReader.onerror = () => {
			fileReader.abort();
			reject(alert("Problem parsing File"));
		};

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.readAsText(input);
	});
}

let globalFile;

async function handleUpload(event) {
	let file = event.target.files[0];
	globalFile = await readUploadedFile(file).then(text => {
		let json = JSON.parse(text);
		let newLocations = [];
		let rects = getRectangles();
		for (loc of json.locations) {
			let point = {
				lat: loc.latitudeE7 / 10000000,
				lng: loc.longitudeE7 / 10000000
			};
			if (!isInNoZone(rects, point)) {
				newLocations.push(loc);
			}
		}
		return { locations: newLocations };
	});
	document.getElementById("upload-button").toggleAttribute("disabled", false);
}

//alert(
//	"First right-click twice to define exclusion zones and then select file to sumbit, left-click on an exclusion zone to cancel it"
//);

function submit() {
	fetch("http://localhost:80/index.html/testing-backend/test.php", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(globalFile)
	})
		.then(res => {
			return res.json();
		})
		.then(data => {
			console.log(data);
		})
		.catch(res => console.log("8==D"));
}
