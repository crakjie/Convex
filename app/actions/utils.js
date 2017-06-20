import electron from 'electron';

export function uuid() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}


export function findIndexOf(array, fn : A => boolean) {
    for(var i = 0; i < array.length; i += 1) {
        if(fn(array[i])) {
            return i;
        }
    }
    return -1;
}

export function settingsToJson(settings) {
  return settings.map(setting => {
    const copy = Object.assign({}, setting);
    copy.options = [...setting.options];
    return copy;
  });
}

export function settingsFromJson(settings) {
  return settings.map(setting => {
    const copy = Object.assign({}, setting);
    copy.options = new Map(setting.options);
    return copy;
  });
}

// Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
// app.getPath('userData') will return a string of the user's app data directory path.
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
export function userData() {
  return userDataPath;
}
