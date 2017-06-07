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

