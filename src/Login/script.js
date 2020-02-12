let state = 0;
let btn1 = $("#login-button");
let btn2 = $("#register-button");

btn2.click(function() {
  if (state == 0) {
    $("#register").collapse("toggle");
    btn2.html('<i class="fa fas fa-long-arrow-alt-left"></i>');
    btn1.text("Register");
    state = 1;
  } else {
    $("#register").collapse("toggle");
    btn2.text("Register");
    btn1.text("Login");
    state = 0;
  }
});

let container_dom = document.getElementById("heatmap-container");
let d_radius = window.innerWidth / 20;
let config = {
  container: container_dom,
  radius: d_radius,
  maxOpacity: 1,
  minOpacity: 0,
  blur: 0.75
};

heat_flucs(config, 0.5, 25);

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
