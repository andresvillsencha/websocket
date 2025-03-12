/**
 * Example:
 *  let mySocket = Ext.create('App.util.WebSocket', {
 *      url: '/endPoint/',
 *      listeners: {
 *          message: function (response, socketjs) {
 *          },
 *          error: function (socketjs) {
 *          },
 *          // ...
 *      }
 *  });
 */
Ext.define('App.util.WebSocket', {
    extend: 'Ext.Component',
    xtype: 'web-socket',

    socket: null,
    url: '',
    callback: null,

    logs: false,

    listeners: {
        message: null,
        open: null,
        close: null,
        error: null,
    },

    initComponent: function () {
        let me=this;
        me.callParent();

        if (me.url==='') {
            if (logs) console.log('Define a Socket URL to start the socket');
        } else {
            me.socket=new WebSocket(me.url);

            me.socket.addEventListener('message', function (event) {
                let data = JSON.parse(event.data);
                if (logs) console.log("WebSocket Message Received");
         
                if (me.callback!==null) {
                    me.callback(data,me.socket);
                }
                if (me.listeners!==undefined && me.listeners.message!==undefined && me.listeners.message!==null) {
                    me.listeners.message(data,me.socket);
                }
            });
    
            me.socket.addEventListener('open', function () {
                if (logs) console.log("WebSocket Connected");
                
                if (me.listeners!==undefined && me.listeners.open!==undefined && me.listeners.open!==null) {
                    me.listeners.open(me.socket);
                }
            });
    
            me.socket.addEventListener('close', function () {
                if (logs) console.log("WebSocket Disconnected");
                
                if (me.listeners!==undefined && me.listeners.close!==undefined && me.listeners.close!==null) {
                    me.listeners.close(me.socket);
                }
            });
    
            me.socket.addEventListener('error', function (error) {
                if (logs) console.error("WebSocket Error:", error);
                
                if (me.listeners!==undefined && me.listeners.error!==undefined && me.listeners.error!==null) {
                    me.listeners.error(me.socket);
                }
            });
        }
    }
});