import ffmpeg  from 'fluent-ffmpeg';

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
