import * as utils from '../actions/utils.js';

export function newConfig() {
  return ({
    uid: utils.uuid(),
    name: 'New config',
    format: '',
    size: '', // resolution
    fps: '', // frame per second
    vcodec: '', // video codec
    vbtr: 0, // video bit rate
    acodec: '', // audio codec
    aquality: 0, // audi quality
    abtr: 0, // audio bit rate
    options: new Map() // abitrari outputOption depending of the codec.
  });
}
