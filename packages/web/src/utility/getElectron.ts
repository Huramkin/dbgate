class ElectronApi {
  private ipcRenderer = getIpcRenderer();

  send(msg: string, args: any = null) {
    this.ipcRenderer.send(msg, args);
  }

  async showOpenDialog(options: any) {
    return await this.ipcRenderer.invoke('showOpenDialog', options);
  }

  async showSaveDialog(options: any) {
    return await this.ipcRenderer.invoke('showSaveDialog', options);
  }

  async showItemInFolder(path: string) {
    return await this.ipcRenderer.invoke('showItemInFolder', path);
  }

  async openExternal(url: string) {
    await this.ipcRenderer.invoke('openExternal', url);
  }

  async invoke(route: string, args: any) {
    return await this.ipcRenderer.invoke(route, args);
  }

  addEventListener(channel: string, listener: Function) {
    this.ipcRenderer.on(channel, listener);
  }

  removeEventListener(channel: string, listener: Function) {
    this.ipcRenderer.removeListener(channel, listener);
  }
}

function getIpcRenderer() {
  if ((window as any)['require']) {
    const electron = (window as any)['require']('electron');
    return electron?.ipcRenderer;
  }
  return null;
}

export function isElectronAvailable() {
  return !!getIpcRenderer();
}

const apiInstance = isElectronAvailable() ? new ElectronApi() : null;

export default function getElectron(): ElectronApi | null {
  return apiInstance;
}
