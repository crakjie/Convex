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
