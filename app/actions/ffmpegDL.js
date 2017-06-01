import ffbinaries from 'ffbinaries';
var platform = ffbinaries.detectPlatform();

ffbinaries.downloadFiles(['ffmpeg', 'ffprobe'], function () {
  console.log('Downloaded ffplay binary for ' + platform + '.');
});
