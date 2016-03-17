//  Use SockJS
Stomp.WebSocketClass = SockJS;

var username = "guest",
    password = "A505256158b",
    vhost    = "/",
    url      = "http://vskylab.essystem.pl:17022/stomp",
    queue    = "/topic/xstream1.#"; // To translate mqtt topics to
                             // stomp we change slashes 
                             // to dots
var console;

function on_connect() {
  console += 'Connected to RabbitMQ-Web-Stomp<br />';
  console.log(client);
  client.subscribe(queue, on_message);
}

function on_connection_error() {
  console.innerHTML += 'Connection failed!<br />';
}

function on_message(m) {
  console.log('Received:' + m);
  output.innerHTML += m.body + '<br />';
}

var ws = new SockJS(url);
var client = Stomp.over(ws);
client.heartbeat.outgoing = 0;
client.heartbeat.incoming = 0;

window.onload = function () {
  console = document.getElementById("console");
  // Connect
  client.connect(
    username,
    password,
    on_connect,
    on_connection_error,
    vhost
  );
}
