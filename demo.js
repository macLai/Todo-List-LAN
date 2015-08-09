var demo = null;
console.debug = function() {};

window.addEventListener("load", function() {
  var connect = document.getElementById("connect");
  var address = document.getElementById("address");

  // var echoClient = newEchoClient(address.value);
  connect.onclick = function(ev) {
    // echoClient.disconnect();
    // echoClient = newEchoClient(address.value);
  };
  address.onkeydown = function(ev) {
    if (ev.which == 13) {
      // echoClient.disconnect();
      // echoClient = newEchoClient(address.value);
    }
  };

  var netConn = new NETWORKING();
  netConn.connect();

  setInterval(function() {
    if (netConn.connectStatus === true) {
      buffer = netConn.bufferANDstr.stringToArrayBuffer(1,
        "hello world!");
      netConn.send(buffer);
    }
  }, 1000);
});
