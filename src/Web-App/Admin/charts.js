Chart.defaults.global.defaultFontColor = "white";

allDays = Array(31);
let k = 0;
while (k < 31) {
	alldDays[k] = k + 1;
	k += 1;
}

drawPieChart(colors.slice(0, activities.length), pieData, "activitiesPie");
drawBarChart(userData.users, userData.count, "usersBar", "User Distribution");
drawBarChart(
	dayData,
	["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
	"dayBar",
	"Day Distribution"
);
drawBarChart(yearData.years, yearData.count, "yearBar", "Year Distribution");
drawLineChart(
	monthData,
	[
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
	],
	"monthLine",
	"Month Distribution"
);
drawLineChart(
	hourData,
	[
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
	],
	"hourLine",
	"Hour Distribution"
);

//--------------------------------------------------

function drawPieChart(colors, data, labels, id) {
	let ctx = document.getElementById(id);

	let pie = new Chart(ctx, {
		type: "pie",
		data: {
			labels: labels,
			datasets: [
				{
					label: "number of records",
					data: data,
					backgroundColor: colors,
					borderWidth: 0
				}
			]
		},
		options: {
			title: {
				display: true,
				text: "Activities distribution",
				fontSize: 30
			}
		}
	});
}

function drawBarChart(data, labels, id, text) {
	let ctx = document.getElementById(id);

	let pie = new Chart(ctx, {
		type: "bar",
		data: {
			labels: labels,
			datasets: [
				{
					data: data,
					backgroundColor: "DeepPink"
				}
			]
		},
		options: {
			title: {
				display: true,
				text: text,
				fontSize: 30
			},
			scales: {
				xAxes: [
					{
						gridLines: { color: "#cccfff", lineWidth: 0.5 }
					}
				],
				yAxes: [
					{
						ticks: { beginAtZero: true },
						gridLines: { color: "#cccfff", lineWidth: 0.5 }
					}
				]
			}
		}
	});
}

function drawLineChart(data, labels, id, text) {
	let ctx = document.getElementById(id);

	let pie = new Chart(ctx, {
		type: "line",
		data: {
			labels: labels,
			datasets: [
				{
					label: "Continous " + text,
					fill: false,
					data: data,
					borderColor: "DeepPink"
				}
			]
		},
		options: {
			title: {
				display: true,
				text: text,
				fontSize: 30
			},
			scales: {
				xAxes: [
					{
						gridLines: { color: "#cccfff", lineWidth: 0.5 }
					}
				],
				yAxes: [
					{
						ticks: { beginAtZero: true },
						gridLines: { color: "#cccfff", lineWidth: 0.5 }
					}
				]
			}
		}
	});
}

//--------------------------------------------------
