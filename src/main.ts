import { app, BrowserWindow, ipcMain, Menu } from "electron";
import * as path from "path";
import { SCBase } from "./apps/scbase";
import { SCScout } from "./apps/scscout";
import { SCCentral } from "./apps/sccentral";
import { SCCoach } from "./apps/sccoach";
import { getTreeData, executeCommand, getInfoData, getSelectEventData, loadBaEventData, getTabletData, 
         setTabletData, getTeamData, setTeamData, getMatchData, setMatchData, getTeamForm, getMatchForm, 
         getTeamStatus, getMatchStatus, setTabletNamePurpose, getPreviewForm, 
         provideResult,
         setEventName,
         getMatchDB,
         getTeamDB,
         sendMatchColConfig,
         sendTeamColConfig} from "./ipchandlers" ;


export let scappbase : SCBase | undefined = undefined ;

function createWindow() : void {
    const args = process.argv;
    let year = 2024 ;
  
    const win = new BrowserWindow({
      webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          preload: path.join(__dirname, 'preload.js'),
      },
      title: "XeroScout",
    });

    win.maximize() ;

    if (process.argv.length > 2) {
        let args = process.argv.slice(3) ;

        if (process.argv[2] === "scout") {
            scappbase = new SCScout(win, args) ;
        }
        else if (process.argv[2] === "coach") {
            scappbase = new SCCoach(win, args) ;
        }
        else if (process.argv[2] === 'central') {
            scappbase = new SCCentral(win, args) ;
        }
    }

    if (!scappbase) {
        console.log(process.argv) ;
        console.log("No App Created") ;
        app.exit(1) ;
    }
  
    win
      .loadFile(scappbase!.basePage())
      .then(() => {
      })
      .catch((e) => console.error(e));

    Menu.setApplicationMenu(scappbase!.createMenu()) ;

    scappbase!.windowCreated() ;
}

app.on("ready", () => {
    ipcMain.on('get-nav-data', getTreeData);
    ipcMain.on('get-info-data', getInfoData) ;
    ipcMain.on('set-event-name', (event, ...args) => { setEventName(...args)}) ;
    ipcMain.on('get-event-data', getSelectEventData) ;
    ipcMain.on('get-tablet-data', getTabletData) ;
    ipcMain.on('set-tablet-data', (event, ...args) => { setTabletData(...args)}) ;
    ipcMain.on('get-team-data', getTeamData) ;
    ipcMain.on('get-match-db', getMatchDB);
    ipcMain.on('get-team-db', getTeamDB) ;
    ipcMain.on('get-team-form', getTeamForm);
    ipcMain.on('get-match-form', getMatchForm);
    ipcMain.on('get-match-data', getMatchData);
    ipcMain.on('get-preview-form', getPreviewForm);
    ipcMain.on('get-team-status', getTeamStatus) ;
    ipcMain.on('get-match-status', getMatchStatus) ;
    ipcMain.on('set-team-data', (event, ...args) => { setTeamData(...args)}) ;
    ipcMain.on('set-match-data', (event, ...args) => { setMatchData(...args)}) ;
    ipcMain.on('load-ba-event-data', (event, ...args) => { loadBaEventData(...args)}) ;
    ipcMain.on('execute-command', (event, ...args) => { executeCommand(...args)}) ;
    ipcMain.on('set-tablet-name-purpose', (event, ...args) => { setTabletNamePurpose(...args)}) ;
    ipcMain.on('provide-result', (event, ...args) => { provideResult(...args)}) ;
    ipcMain.on('send-match-col-config', (event, ...args) => { sendMatchColConfig(...args)}) ;
    ipcMain.on('send-team-col-config', (event, ...args) => { sendTeamColConfig(...args)}) ;
    createWindow() ;
}) ;

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', (ev) => {
    if (scappbase) {
        if (!scappbase.canQuit()) {
            ev.preventDefault() ;
        }
    }
}) ;
