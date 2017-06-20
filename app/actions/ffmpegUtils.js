import ffmpeg  from 'fluent-ffmpeg';
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

export function makeThumbnail(file) {
  return new Promise(function(resolve, reject) {
    console.log(file);
    ffmpeg(file.file.path)
    .on('filenames', function(filenames) {
      console.log( userData());
      console.log('Will generate ' + filenames.join(', '));
      return resolve(filenames);
    })
    .screenshots({
      timestamps: [30.5, '50%', '01:10.123'],
      filename: 'thumbnail-at-%s-seconds.png',
      folder: userData().concat('/thumbnails')
    });
  });
}
