var ws = new WebSocket('ws://localhost:8080/command');
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
