var ws = new WebSocket('ws://'+window.location.origin.replace('http://','')+'/command');
ws.open = function() {
  ws.send("message to send");
  console.log("message is sent");
}

ws.onmessage = function(evt) {
  var received_msg = evt.data;
  var data = JSON.parse(received_msg);
  // <hr>
  // <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  var mWindow = document.getElementById('messageWindow');
  $(mWindow).prepend(document.createElement('hr'));
  var para = document.createElement('p');
  para.classList.add('card-text');
  para.innerHTML = data.message;
  $(mWindow).prepend(para);
  var params = JSON.parse(data.params);
  if(  params['plot_type']=="bar chart") {
    $('[href="#home"]').tab('show');
  } else if (params['plot_type']=="pie chart") {
    $('[href="#profile"]').tab('show');
  }
  if(data.info) {
    var cInfo = JSON.parse(data.info);
    if(cInfo.length>0) {
      updateBar(cInfo);;
    }
  } else {
    var spec_name = JSON.parse(data.spec_name);
    var val_name = JSON.parse(data.val_name);
    if(spec_name.length>0) {
        updateSpec(spec_name, val_name,params['jnj_id']);
    }
  }
}

ws.onclose = function() {
  console.log("connection is closed");
}

google.charts.load('current', {'packages':['bar','corechart']});

google.charts.setOnLoadCallback(drawChart);

var chart;
var options;
var chart2;
var options2;

function updateBar(info) {
  var data = [];
  data.push(['Country','Count']);
  info.forEach((dat) => {
    data.push([dat.key,dat.doc_count]);
  });
  var newdata = google.visualization.arrayToDataTable(data);
  options.title = "Key Opinion Leaders across countries";
  options2.title = "Key Opinion Leaders across countries";
  chart.draw(newdata,options);
  chart2.draw(newdata,options2);
}

function updateSpec(spec_name,val_name,flag) {
  var data = [];
  data.push(['Speciality','Count']);
  for(var i=0;i<spec_name.length;i++) {
    data.push([spec_name[i],val_name[i]]);
  }
  var newdata = google.visualization.arrayToDataTable(data);
  options.title = "KOL specialization across countries";
  options2.title = "KOL specialization across countries";
  if(flag) {
    options.title += " - only JnJ";
    options2.title += " - only JnJ";
  }
  chart.draw(newdata,options);
  chart2.draw(newdata,options2);
}

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Count'],
    ['United States', 1000],
    ['China', 1170],
    ['Japan', 660],
    ['Czech Republic', 1030]
  ]);

  options = {
    title: 'Key Opinion Leaders across countries',
    bars: 'horizontal', // Required for Material Bar Charts.
    animation: {"startup": true}
  };

  chart = new google.visualization.BarChart(document.getElementById('bar-view'));

  chart.draw(data, options);

  var data2 = google.visualization.arrayToDataTable([
    ['Country', 'Count'],
    ['United States',     11],
    ['Japan',      2],
    ['China',  2],
    ['Czech Republic', 2]
  ]);

  options2 = {
    title: 'Key Opinion Leaders across countries',
    pieSliceText: 'value',
    animation: {"startup": true}
  };

  var barElem = document.getElementById('bar-view');
  options2.height = barElem.offsetHeight;
  options2.width = barElem.offsetWidth;
  options.height = options2.height;
  options.width = options2.width;

  chart2 = new google.visualization.PieChart(document.getElementById('pie-view'));


  chart2.draw(data2, options2);
}
