NETWORKING = function() {
  var socket = chrome.sockets.udp;
  var address;
  var inPort = 9876;
  var outPort = 9876;
  var socketInfo;
  this.connectStatus = false;
  var callbacks = [];
  this.bufferANDstr = new BUFFERANDSTR();
  var self = this;

  var Connected = 100;
  var Connecting = 101;


  this.connect = function() {
    address = "127.0.0.1";
    port = inPort;

    console.log('creating socket', address, port);

    socket.create({}, function(_socketInfo) {
      socketInfo = _socketInfo;

      socket.bind(socketInfo.socketId, address, port, function(
        connectResult) {
        self.connectStatus = (connectResult === 0);

        //TODO 设置了setBroadcast该接着搞。。
        socket.setBroadcast(socketInfo.socketId, true, function(
          result) {
          console.log("setBroadcast:" + result);
        });
        socket.onReceive.addListener(function(result) {
          self.receive(result);
        });

        console.log("Connect:" + self.connectStatus);
      });
    });
  };

  this.send = function(data, address, port, callback) {
    if (address === undefined) address = "255.255.255.255";
    callback = callback || function() {};
    socket.send(socketInfo.socketId, data, address, outPort, function(
      sendResult) {
      // callback(sendResult);
      console.log("resultCode:" + sendResult.resultCode);
    });
  };

  this.receive = function(receivedData) {
    remotePort = receivedData.remotePort;
    remoteAddress = receivedData.remoteAddress;
    dataJson = self.bufferANDstr.arrayBufferToString(receivedData.data);
    console.log(dataJson);
    return;
    //TODO 收到通知状态判断做更新动作
    switch (dataJson.status) {
      case Connecting:

        // this.send()
        break;
      default:

    }


  };

  this.disconnect = function() {
    socket.close(socketInfo.socketId, function() {
      connected = false;
    });
  };
};

var BUFFERANDSTR = function() {
  this.arrayBufferToString = function(buffer) {
    var array = new Uint8Array(buffer);
    var str = '';
    var i = 0;
    for (; i < array.length - 1; ++i) {
      str += String.fromCharCode(array[i]);
    }
    status = array[i];
    return [status, str];
  };
  this.stringToArrayBuffer = function(status, string) {
    var buffer = new ArrayBuffer(string.length + 1);
    var bufferView = new Uint8Array(buffer);
    var i = 0;
    for (; i < string.length; i++) {
      bufferView[i] = string.charCodeAt(i);
    }
    bufferView[i] = status;
    return buffer;
  };

};
