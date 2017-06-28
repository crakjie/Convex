import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { userData } from './utils.js';

export function metadataFile(file) {
  return new Promise(function(resolve, reject) {
    ffmpeg.ffprobe(file.path, (err, metadata) => { resolve([file,metadata,err]); });
  });
}

//https://en.wikipedia.org/wiki/Comparison_of_video_container_formats
export const formats = {
  flv: {
    audio: ['libmp3lame', 'pcm_u8', 'pcm_s16be', 'pcm_s16le', 'adpcm_swf', 'aac', 'nellymoser', 'libspeex'],
    video: ['flv', 'h263', 'mpeg4', 'flashsv', 'flashsv2', 'libx264']
  },
  mov: {
    audio: ['aac', 'mp3', 'alac'],
    video: ['prores_ks', 'libx264']
  },
  mp4: {
    audio: ['aac', 'mp3', 'alac', 'libvorbis'],
    video: ['libx264', 'libopenh264', 'libx265']
  },
  webm: {
    audio: ['aac', 'mp3', 'alac', 'libvorbis'],
    video: ['libx264', 'libopenh264', 'libx265']
  }
};

const thumbnailsDir = 'thumbnails';

export const thumbnailsPath = userData() + '/' + thumbnailsDir;

export function makeThumbnail2(file) {
  return new Promise(function(resolve, reject) {
    console.log(file);
    ffmpeg(file.file.path)
    .on('filenames', filenames => {
      console.log( userData());
      console.log('Will generate ' +  thumbnailsPath + filenames.join(', '));
      return resolve(filenames.map(f => thumbnailsPath + '/' + f));
    }).on('end', data => console.log(data))
    .screenshots({
      timestamps: [30.5, '50%', '01:10.123'],
      filename: file.file.name + '-thumbnail-at-%s-seconds.png',
      folder: thumbnailsPath
    });
  });
}

export function makeThumbnail(file) : Promise<Array<string>> {
  // aparently ffmpeg have to read the first part of the stream,
  // so using snapshoot of the last image of the movie can be very long
  const scr = ffmpeg(file.file.path)
    .screenshots({
      timestamps: ['0.1%'],
      filename: file.file.name + '-thumbnail-at-%s-seconds.png',
      folder: thumbnailsPath
    });

  const pr1 = new Promise(function(resolve, reject) {
    scr.on('filenames', filenames => {
      console.log('Will generate ' +  thumbnailsPath + filenames.join(', '));
      return resolve(filenames.map(f => thumbnailsPath + '/' + f));
    });
  });

  const pr2 = new Promise(function(resolve, reject) {
    scr.on('end', data => resolve());
  });
  // Wait the end to return the filenames.
  return Promise.all([pr1, pr2]).then(values => values[0]);
}

export function cleanTempFiles() {
  // Remove thumbnails.
  deleteFolderRecursive(thumbnailsPath);
}

//code pompé de https://stackoverflow.com/questions/8496212/node-js-fs-unlink-function-causes-eperm-error/20920795
function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

//return the aproximate number of second untill the end of the process
export function estimateLastingTime(progress, numberOfFrame: number): number {
  const lastingFrame = numberOfFrame - progress.frames;
  if (progress.currentFps > 0) {
    return Math.floor(lastingFrame / progress.currentFps);
  } else {
    return 0;
  }
}

export function estimateEndTime(curentdate: Date, progress, numberOfFrame: number): Date {
  const lastingMilliSecond = estimateLastingTime(progress, numberOfFrame) * 1000;
  console.log(lastingMilliSecond);
  console.log(new Date(curentdate.getTime() + lastingMilliSecond));
  return new Date(curentdate.getTime() + lastingMilliSecond);
}
