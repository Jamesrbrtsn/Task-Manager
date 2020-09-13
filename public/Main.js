
const {app, BrowserWindow} = require('electron')     
//const path = require('path')

function createWindow () {   
  // Create the browser window.     
    win = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: { nodeIntegration: true }
    }) 
        
    win.removeMenu();
    win.setResizable(true);
    //win.setMinimumSize(220,240);

    //win.webContents.openDevTools();

    // and load the index.html of the app.     
    //win.loadFile('index.html')   
    win.loadURL('http://localhost:3000/');
    //win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
}      
app.on('ready', createWindow)