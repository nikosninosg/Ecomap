Chart.defaults.global.defaultFontColor = 'white'; 

allDays=Array(31);
let k =0;
while(k<31){alldDays[k] =k+1;k+=1}


drawPieChart(,,,"activitiesPie");
drawBarChart(,,,"usersBar","User Distribution");
drawBarChart(,,,"dayBar","Day Distribution");
drawBarChart(,,,"yearBar","Year Distribution");
drawLineChart(,,,"monthLine","Month Distribution");
drawLineChart(,,,"hourLine","Hour Distribution");


//--------------------------------------------------

function drawPieChart(colors, data, labels, id){
	let ctx = document.getElementById(id);

	let pie = new Chart(ctx, {
		type:'pie',
		data: {
			labels: labels,
			datasets: [{
				label: "number of records",
				data: data,
				backgroundColor: colors,
				borderWidth: 0
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Activities distribution',
				fontSize: 30
			}
		}

	});
}

function drawBarChart(data, labels, id, text){
	let ctx = document.getElementById(id);

	let pie = new Chart(ctx, {
		type:'bar',
		data: {
			labels: labels,
			datasets: [{
				data: data,
				backgroundColor: "DeepPink",
			}]
		},
		options: {
			title: {
				display: true,
				text: text,
				fontSize: 30
			},
			scales: {
				xAxes : [{
					gridLines:{color : "#cccfff", lineWidth : 0.5}
				}],
				yAxes : [{
					ticks:{beginAtZero: true},
					gridLines:{color : "#cccfff", lineWidth : 0.5}
				}]
			}

		}

	});
}

function drawLineChart(data, labels, id, text){
	let ctx = document.getElementById(id);

	let pie = new Chart(ctx, {
		type:'line',
		data: {
			labels: labels,
			datasets: [{
				label: "Continous " + text,
				fill: false,
				data: data,
				borderColor: "DeepPink"
			}]
		},
		options: {
			title: {
				display: true,
				text: text,
				fontSize: 30
			},
			scales: {
				xAxes : [{
					gridLines:{color : "#cccfff", lineWidth : 0.5}
				}],
				yAxes : [{
					ticks:{beginAtZero: true},
					gridLines:{color : "#cccfff", lineWidth : 0.5}
				}]
			}

		}

	});
}


//--------------------------------------------------
