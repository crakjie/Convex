import ffmpeg  from 'fluent-ffmpeg';

export function metadataFile(file) {
  return new Promise(function(resolve, reject) {
    ffmpeg.ffprobe(file.path, (err, metadata) => { resolve([file,metadata,err]); });
  });
}

export function availableFormats() {
  return new Promise((resolve, reject) => {
    ffmpeg.getAvailableFormats((err, formats) => { resolve(formats); });
  });
}

export function availableCodecs() {
  return new Promise((resolve, reject) => {
    ffmpeg.getAvailableCodecs((err, codecs) => { resolve(codecs); });
  });
}

export function availableEncoders() {
  return new Promise((resolve, reject) => {
    ffmpeg.getAvailableEncoders((err, encoders) => { resolve(encoders); });
  });
}

export function availableFilters() {
  return new Promise((resolve, reject) => {
    ffmpeg.getAvailableFilters((err, filters) => { resolve(filters); });
  });
}

export function ffmpegCapabilities() {
  return Promise.all([availableFormats(), availableCodecs(), availableEncoders(), availableFilters()]).then(t => {
    const formatsArray = Object.entries(t[0]).map(e => { e[1]['name'] = e[0]; return e[1]; }); // transform a map into an array of objects.
    const codecsArray = Object.entries(t[1]).map(e => { e[1]['name'] = e[0]; return e[1]; }).filter(codec => codec.canEncode); // transform a map into an array of objects.
    const encodersArray = Object.entries(t[2]).map(e => { e[1]['name'] = e[0]; return e[1]; }); // transform a map into an array of objects.
    // const filters_array = Object.entries(t[3]).map(e => { e[1]['name'] = e[0]; return e[1]; }); // transform a map into an array of objects.

    const videoCodecs = codecsArray.filter(codec => codec.type === 'video');
    const audioCodecs = codecsArray.filter(codec => codec.type === 'audio');
    const subtitleCodecs = codecsArray.filter(codec => codec.type === 'subtitle');

    /* const video_encoders = encodersArray.filter(encoder => encoder.type === 'video');
    const audio_encoders = encodersArray.filter(encoder => encoder.type === 'audio');
    const subtitle_encoders = encodersArray.filter(encoder => encoder.type === 'subtitle'); */

    const usableFormats = formatsArray.filter(format => format.canMux);

    return {
      formats: usableFormats,
      videoCodecs,
      audioCodecs,
      subtitleCodecs,
      encoders: encodersArray
    };
  });
}

