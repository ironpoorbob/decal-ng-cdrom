import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() item: object;

  constructor() { }

  ngOnInit(): void {
    console.log('video url: ', this.item);
  }
  
  ngAfterViewInit() {
    this.setYouTubeSDK();
    this.insertYouTubeIframe(this.item);
    
  }
  
  public setYouTubeSDK() {
    console.log('video player init');
    const doc = (<any>window).document;
    let playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = '//www.youtube.com/iframe_api';

    // let tag = document.createElement('script');
    // tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(playerApiScript, firstScriptTag);
  }

  public insertYouTubeIframe(videoObj: object) {
    // let player;
    // let autoPlayVal = videoObj["autoPlay"] ?
    (<any>window).onYouTubeIframeAPIReady = () => {
      (<any>window).player = new (<any>window).YT.Player('ytplayer', {
        height: '390',
        width: '640',
        videoId: videoObj["videoUrl"],
        playerVars: {
          'autoplay': videoObj["autoPlay"] ? videoObj["autoPlay"] : 0,
          'rel': 0, 
          'controls': 2, 
          'enablejsapi': 1
        },
        events: {
          'onReady': this.onPlayerReady.bind(this),
          'onStateChange': this.onPlayerStateChange.bind(this)
        }
      });
    }
  }

  public onPlayerReady() {
    console.log('player ready');
  }

  public onPlayerStateChange(event) {
    console.log('player state change');
    if (event.data === -1) {
      // unstarted
      console.log('player state change: unstarted: ', event.data);
    } else if (event.data === 0) {
      // video ended

      console.log('player state change: ended: ', event.data);
    } else if (event.data === 1) {
      // video playing
      console.log('player state change: playing: ', event.data);
    } else if (event.data === 2) {
      // video paused
      console.log('player state change: paused: ', event.data);
    } else if (event.data === 3) {
      // video buffereing
      console.log('player state change: buffering: ', event.data);
    } else if (event.data === 5) {
      // video cued
      console.log('player state change: cued: ', event.data);
    }
  }

}
