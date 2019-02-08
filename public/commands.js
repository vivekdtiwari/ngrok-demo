var ws = new WebSocket('ws://'+window.location.origin.replace('http://','')+'/command');
ws.open = function() {
  ws.send("message to send");
  console.log("message is sent");
}

ws.onmessage = function(evt) {
  console.log(evt);
  var received_msg = evt.data;
  var data = JSON.parse(received_msg);
  console.log("got message on socket", data);
  // <hr>
  // <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  var mWindow = document.getElementById('messageWindow');
  $(mWindow).prepend(document.createElement('hr'));
  var para = document.createElement('p');
  para.classList.add('card-text');
  para.innerHTML = data.message;
  $(mWindow).prepend(para);
}

ws.onclose = function() {
  console.log("connection is closed");
}

google.charts.load('current', {'packages':['bar','corechart']});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Count'],
    ['United States', 1000],
    ['China', 1170],
    ['Japan', 660],
    ['Czech Republic', 1030]
  ]);

  var options = {
    chart: {
      title: 'Key Opinion Leaders',
      subtitle: 'Distribution across countries',
    },
    bars: 'horizontal', // Required for Material Bar Charts.
    animation: {"startup": true}
  };

  var chart = new google.charts.Bar(document.getElementById('bar-view'));

  chart.draw(data, google.charts.Bar.convertOptions(options));

  var data2 = google.visualization.arrayToDataTable([
    ['Country', 'Count'],
    ['United States',     11],
    ['Japan',      2],
    ['China',  2],
    ['Czech Republic', 2]
  ]);

  var options2 = {
    title: 'My Daily Activities',
    pieSliceText: 'value'
  };

  var barElem = document.getElementById('bar-view');
  options2.height = barElem.offsetHeight;
  options2.width = barElem.offsetWidth;

  var chart2 = new google.visualization.PieChart(document.getElementById('pie-view'));


  chart2.draw(data2, options2);
}

// $('[href="#home"]').tab('show');
