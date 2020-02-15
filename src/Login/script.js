let state = 0;
let btn1 = $("#login-button");
let btn2 = $("#register-button");

btn2.click(function() {
	if (state == 0) {
		$("#register").collapse("toggle");
		btn2.html('<i class="fa fas fa-long-arrow-alt-left"></i>');
		btn1.text("Register");
		state = 1;
		document.getElementById("login-button").addEventListener("click", register);
	} else {
		Array.from(document.getElementByClassName("warning")).map(
			div => (div.style.display = "hidden")
		);
		$("#register").collapse("toggle");
		btn2.text("Register");
		btn1.text("Login");
		state = 0;
	}
});

function hash(pass) {
	return pass;
}

function login() {
	let creds = {
		username: document.getElementById("user-input").textContent,
		password: hash(document.getElementById("pass-input").textContent)
	};

	console.log(creds);

	fetch("http://localhost:80/index.html/testing-backend/login.php", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(creds)
	})
		.then(res => {
			return res.json();
		})
		.then(res => {
			if (res.status == "success") {
				window.location.replace(res.url);
			} else if (res.status == "failure") {
				document.getElementById("warning").style.display = "block";
			}
		})
		.catch(res => console.log("8==D"));
}

function register() {
	let username = document.getElementById("user-input").value;
	let password = document.getElementById("pass-input").value;
	let rePassword = document.getElementById("re-pass-input").value;
	let mail = document.getElementById("mail").value;

	if (!checkStrength(password)) {
		document.getElementById("pass-error").style.display = "block";
		return false;
	}

	if (password != rePassword) {
		document.getElementById("re-error").style.display = "block";
		return false;
	}

	let creds = { username: username, password: hash(password), mail: mail };

	fetch("http://localhost:80/index.html/testing-backend/register.php", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(creds)
	})
		.then(res => {
			return res.json();
		})
		.then(res => {
			if (res.status == "success") {
				window.location.replace(res.url);
			} else if (res.status == "failure") {
				document.getElementById("warning").style.display = "block";
				console.log(res);
			}
		})
		.catch(res => console.log("8==D"));
}

function checkStrength(test) {
	const test1 = /[A-Z]/.test(test);
	const test2 = /\d/.test(test);
	const test3 = /[^0-9a-z]/gi.test(test);
	const test4 = /\s/.test(test);
	const test5 = (() => test.length >= 8)();

	return test1 && test2 && test3 && !test4 && test5;
}

//-----------------------------------------------------------------------------------------------

let container_dom = document.getElementById("heatmap-container");
let d_radius = window.innerWidth / 20;
let config = {
	container: container_dom,
	radius: d_radius,
	maxOpacity: 1,
	minOpacity: 0,
	blur: 0.75
};

heat_flucs(config, 0.5, 50);

function heat_flucs(confing, delta, interval) {
	let container = config.container;
	const height = container.offsetHeight;
	const width = container.offsetWidth;

	let heatmap = h337.create(config);
	let data = [];
	add_random_point(data);

	let animation = setInterval(function() {
		if (data == []) {
			clearInterval(animation);
		}
		data = next_frame(data);
		add_random_point(data);
		add_random_point(data);
		add_random_point(data);
		heat_data = { max: 50, min: 0, data: data.map(point => point.data_point) };
		heatmap.setData(heat_data);
	}, interval);

	function next_frame(data) {
		data = data.filter(point => point.time_left > 0);
		for (point of data) {
			if (point.time_left > point.ttl / 2) {
				point.data_point.value += delta;
				point.time_left -= delta;
			} else {
				point.data_point.value -= delta;
				point.time_left -= delta;
			}
		}
		return data;
	}

	function add_random_point(data) {
		let rand_x = Math.floor(Math.random() * width) + 1;
		let rand_y = Math.floor(Math.random() * height) + 1;
		let rand_val = Math.floor(Math.random() * 50) + 20;
		let point = {
			data_point: { x: rand_x, y: rand_y, value: 0 },
			time_left: rand_val,
			ttl: rand_val
		};
		data.push(point);
	}
}
