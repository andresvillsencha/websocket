const WebSocket = require("ws");
const PORT = 3000;
const server = new WebSocket.Server({ port: PORT });

server.on("connection", (socket, request) => {
    let pathname=request.url;
    console.log(`Client connected to ${pathname}`);

    switch (pathname) {
        case '/trafficvisitors':
            trafficVisitors(socket);
            break;
        case '/trafficpageviews':
            trafficPageViews(socket);
            break;
        case '/trafficSources':
            trafficSources(socket);
            break;
        case '/health/cpu':
            healthStats('cpu',socket,50,100);
            break;
        case '/health/memory':
            healthStats('memory',socket,30,60);
            break;
        case '/health/disk':
            healthStats('disk',socket,10,30);
            break;
    }

    socket.on("close", () => {
        console.log("Client disconnected");
    });
});

function trafficVisitors(socket) {
    console.log('Started: Traffic Visitors');
    let data = [{
        type: 'Unique Visitors',
        value: Math.round(Math.random()*1000/2)
    }, {
        type: 'Visitors',
        value: Math.round(Math.random()*1000+500)
    }];
    setInterval(() => {
        data[0].value=data[0].value+Math.round(Math.random()*20/2);
        data[1].value=data[1].value+Math.round(Math.random()*20);
        
        socket.send(JSON.stringify(data));
    }, 5000);
    
}

function trafficPageViews(socket) {
    console.log('Started: Traffic Page Views per Sessions');
    let data = [{
        id: 1,
        type: '1 Page',
        value: 1
    }, {
        id: 2,
        type: '2 Pages',
        value: 1
    }, {
        id: 3,
        type: '3 Pages',
        value: 1
    }, {
        id: 4,
        type: '4 Pages',
        value: 1
    }, {
        id: 5,
        type: '5+ Pages',
        value: 1
    }];
    setInterval(() => {
        for (let i=0;i<data.length;i++) {
            data[i].value=Math.round(Math.random()*(data.length-i)*100);
        }
        socket.send(JSON.stringify(data));
    }, 5000);
}


function trafficSources(socket) {
    console.log('Started: Traffic Sources per Sessions');
    let data = [{
        id: 1,
        type: 'Facebook',
        value: 1
    }, {
        id: 2,
        type: 'Google',
        value: 1
    }, {
        id: 3,
        type: 'Paid Ad',
        value: 1
    }, {
        id: 4,
        type: 'Referrals',
        value: 1
    }, {
        id: 5,
        type: 'Direct',
        value: 1
    }];
    setInterval(() => {
        for (let i=0;i<data.length;i++) {
            data[i].value=Math.round(Math.random()*50);
        }
        socket.send(JSON.stringify(data));
    }, 5000);
}

function healthStats(label,socket,min=0,max=100) {
    let diff=max-min;
    console.log('Started: Server Health: '+label);
    let data = {
        type: label,
        value: 1
    };
    setInterval(() => {
        data.value=Math.round(Math.random()*diff)+min;
        socket.send(JSON.stringify(data));
    }, 1000);
}


console.log(`WebSocket server for Dashboard running on ws://localhost:${PORT}`);
