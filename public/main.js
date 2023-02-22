const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // Load the React app
  win.loadURL('http://localhost:3000/#/')

  // Open the DevTools when running in development mode
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    win = null
  })
}

app.whenReady().then(() => {
  // Start the JSON server
  exec('json-server --watch db.json --port 3006', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)
  })

  // Create the Electron window
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

