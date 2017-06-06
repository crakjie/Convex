
// just don't look at this function
function readableSize(value : number) {
  if(value / 1024 >= 1 ) {
    if(value / 1024 / 1024 >= 1 ) {
      if(value / 1024 / 1024 / 1024 >= 1 ) {
        if(value / 1024 / 1024 / 1024 / 1024 >= 1 ) {
          return (value/ 1024 / 1024 / 1024 / 1024).toFixed(2) + 'to';
        } else {
          return (value/ 1024 / 1024 / 1024).toFixed(2) + 'go';
        }
      } else {
        return (value/ 1024 / 1024).toFixed(2) + 'mo';
      }
    } else {
      return (value/ 1024).toFixed(2) +'ko';
    }
  } else {
    return '';
  }
}

//file must contain fileInfo and metadata
export function extractMetadata(fileInfo) {
  if(fileInfo === null) {
    return [];
  } else {
    const common = [
      {
          label: 'File Info',
          lines: [
            { label: 'format name', value: fileInfo.metadata.format.format_name },
            { label: 'bit rate', value: fileInfo.metadata.format.bi_rate },
            { label: 'duration', value: fileInfo.metadata.format.duration },
            { label: 'size', value: readableSize(fileInfo.metadata.format.size) }
          ]
        }
    ];

    const videoStream = fileInfo.metadata.streams.filter(stream => stream.codec_type === 'video');
    const audioStream = fileInfo.metadata.streams.filter(stream => stream.codec_type === 'audio');
    const srtStream = fileInfo.metadata.streams.filter(stream => stream.codec_type === 'subtitle');

    const v = videoStream.map(stream =>{
      return {
        label: 'Video',
        lines: [
            { label: 'average frame rate', value: stream.avg_frame_rate },
            { label: 'Codec', value: stream.codec_long_name},
            { label: 'Codec tag', value: stream.codec_tag_string },
            { label: 'Video bit rate', value: stream.bit_rate },
            { label: 'Dimension / codec dimensions', value: stream.width+'x'+stream.height+' / '+stream.coded_width+'x'+stream.coded_height },
            { label: 'Number of frames', value: stream.nb_frames },
            { label: 'Pixel format', value: stream.pix_fmt }
          ]
        }
      }
    );

    const a = audioStream.map(stream => {
        return {
          label: 'Audio',
          lines: [
            { label: 'Codec', value: stream.codec_long_name},
            { label: 'Codec tag', value: stream.codec_tag_string },
            { label: 'Video bit rate', value: stream.bit_rate },
            { label: 'Chanel', value: stream.chanel },
            { label: 'Number of frames', value: stream.nb_frames }
          ]
        }
      }
    );

    const s = srtStream.map(stream => {
        return {
            label: 'Subtitle',
            lines: []
          }
      }
    );

    return common.concat(v).concat(a).concat(s);
  }
}

