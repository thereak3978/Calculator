const {app, BrowserWindow, ipcMain, Menu } =require('electron');
const { platform } = require('os');
const path =require ('path')

function createWindow(){
    const mainWindow= new BrowserWindow({

        width:365,
        height: 550,
        maxWidth:  500,
        maxHeight: 565,
        minWidth: 250,
        minHeight: 365,
        resizable: true,
        title: "Calculator",
        webPreferences:{
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    })

    if(process.platform === 'win32'){
        Menu.setApplicationMenu(null)
    }
   
    mainWindow.loadFile('renderer/index.html')
    //mainWindow.webContents.openDevTools({mode:'detah'})
}
    

app.whenReady().then(() => {
    createWindow()
})

ipcMain.handle('calcular', (event, datos) => {

    const { num1, num2, op } = datos

    console.log('Se recibió petición')
    console.log(datos)

    switch (op) {

        case 'sumar':
            return num1 + num2

        case 'restar':
            return num1 - num2

        case 'multiplicar':
            return num1 * num2

        case 'dividir':
            if (num2 === 0)
                throw new Error('No es posible dividir entre cero.')
            return num1 / num2

        default:
            throw new Error('La operación "${op}" no existe.')

    }

});
