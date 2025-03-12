Ext.define('App.util.WebSocketSimple', {
    extend: 'Ext.Component',
    xtype: 'web-socket-simple',

    socket: null,
    url: '',
    callback: null,

    initComponent: function () {
        let me=this;
        me.callParent();

        if (me.url==='') {
            console.log('Define a Socket URL to start the socket');
        } else {
            me.socket=new WebSocket(me.url);

            me.socket.addEventListener('message', function (event) {
                let data = JSON.parse(event.data);
                console.log("WebSocket Message Received");
         
                if (me.callback!==null) {
                    me.callback(data,me.socket);
                }
            });
    
            me.socket.addEventListener('open', function () {
                console.log("WebSocket Connected");
            });
    
            me.socket.addEventListener('close', function () {
                console.log("WebSocket Disconnected");
            });
    
            me.socket.addEventListener('error', function (error) {
                console.error("WebSocket Error:", error);
            });
        }
    }
});