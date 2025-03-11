const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
	const win = new BrowserWindow({
		width: 300,
		height: 250,
		minWidth: 200,
		minHeight: 150,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			enableRemoteModule: false,
			nodeIntegration: false,
		},
		frame: false,
		transparent: true,
	})

	win.loadFile('index.html')
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

// 監聽 'close-app' 事件，並關閉應用程式
ipcMain.on('close-app', () => {
	app.quit()
})
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
