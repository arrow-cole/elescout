import { contextBridge, ipcRenderer,  } from "electron";

// Create a type that should contain all the data we need to expose in the
// renderer process using `contextBridge`.

export type scoutingAPI = {
  // Declare a `readFile` function that will return a promise. This promise
  // will contain the data of the file read from the main process.
  getCentralTreeContents: () => Promise<Object>
}

// Expose our functions in the `api` namespace of the renderer `Window`.
//
// If I want to call `readFile` from the renderer process, I can do it by
// calling the function `window.api.readFile()`.
contextBridge.exposeInMainWorld( "scoutingAPI", {
  send: (channel: string, data: any) => {
      let validChannels = [
        "get-nav-data", 
        "get-info-data",
        "get-event-data",
        "get-tablet-data",
        "set-tablet-data",
        "get-team-data",
        "set-team-data",
        "load-ba-event-data",
        "execute-command"
      ];
      if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
      }
  },
  receive: (channel: string, func:any) => {
      let validChannels = [
        "update-main-window-view",
        "send-nav-data", 
        "send-info-data",
        "send-event-data",
        "send-tablet-data",
        "send-team-data",
        "set-status-text",
        "set-status-html",
        "set-status-title",
        "set-status-visible",
        "set-status-close-button-visible"
      ];
      if (validChannels.includes(channel)) {
          ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
  }
}) ;
