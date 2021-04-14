import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { VideoServiceService } from '../video-service.service';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'video-player',
  // selector: 'youtube-player',
  templateUrl: './video-player.component.html',
  // template: '<div #youtubeContainer></div>',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() item: object;

  public videoPlayed: boolean = false;

  public isVideoScript: boolean = false;
  public videoId: string;
  // public videoObj: object = {};

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  constructor(
    private stateManagerService: StateManagerService,
    private videoService: VideoServiceService) { }

  ngOnInit(): void {
    console.log('video player object:::: ', this.item);
    this.isVideoScript = document.querySelector('script[src="//www.youtube.com/iframe_api"]') ? true : false;
    // console.log('video script: ', this.isVideoScript);
    // if (!this.isVideoScript) {
    //   this.setYouTubeSDK();
    // }

    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
        console.log('video subscribe::: ====== ', value);
        // this.videoPlayerUpdate(this.dataObj.videoObj.videoUrl);
      }
    )

    // this.videoId = this.item['videoUrl'];


    /* 
    - need to set up to run video on load
    - but also need to be able to run on click of button and 
      dynamically update/switch video id
      - may need to reset video - time index or what ever when switching
    */

    // this.videoObj = {
    //   videoUrl: '-uU5sY1y2Ik',
    //   autoPlay: 1
    // }

    // this.videoId = this.videoObj['videoUrl'];

    // console.log('video url: ', this.item);
    // ACKvQulmV5I good show
    // -uU5sY1y2Ik  decal fridge
    // <div id="ytplayer"></div>
    // <video-player class="video-player" [item]="videoObj"></video-player>

    //     <div class="video-section col-lg-12">
    //   <div class="video-element">
    //     <div id="ytplayer"></div>
    //   </div>
    // </div>

    // this.videoId = this.item.videoUrl;
  }
  
  ngAfterViewInit() {
    // console.log('video player :::: AVI :::::::::: ', this.dataObj.videoObj);
    if (!this.isVideoScript) {
      this.setYouTubeSDK();
    }
    // this.insertYouTubeIframe(this.item);


    // if ((<any>window)['yt']) {
    //   // do nothing
    //   this.setUpPlayer(this.videoId);
    //   return;
    // } else {
    //   (<any>window).onYouTubeIframeAPIReady = () => {
    //     this.setUpPlayer(this.videoId);
    //   }
    // }

    // if(this.videoPlayed && (this.dataObj.videoObj.clickPlay === true)) {
    //   this.videoPlayerUpdate(this.dataObj.videoObj.videoUrl);
    //   // (<any>window).onYouTubeIframeAPIReady();
    // } else {
    //   this.insertYouTubeIframe(this.dataObj.videoObj);
    //   (<any>window).onYouTubeIframeAPIReady();
    // }
    // this.insertYouTubeIframe(this.dataObj.videoObj);
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log('VIDEO PLAYED? :::::::::::::::::::::::: ', this.videoPlayed);
    console.log('Video Player: GET OBJ::::  ', changes);

    // this.videoPlayerUpdate(changes.item.currentValue);
    let videoObj = {
      autoPlay: 1,
      clickPlay: true,
      videoUrl: changes.item.currentValue.videoUrl
    }
    console.log('XXXXXXXXXX VIDEO OBJ XXXXXXXXXXX :: ', videoObj);
    this.insertYouTubeIframe(videoObj);
    // (<any>window).onYouTubeIframeAPIReady();
    // if(!this.videoPlayed) {
    //   this.insertYouTubeIframe(videoObj);
    // } else {
    //   this.videoPlayerUpdate(videoObj.videoUrl);
    // }
  }

  public ngOnDestroy(): void {
    // let videoObj = {
    //   autoPlay: undefined,
    //   clickPlay: false,
    //   videoUrl: ""
    // }
    // this.stateManagerService.setValue('videoObj', videoObj);
    this.dataObjSubscription.unsubscribe();
    console.log('video player destroy');
  }

  // public getVideoVals(obj) {
  //   console.log('Video Player: GET OBJ::::  ', obj);
  // }

  public videoPlayerUpdate(val) {
    console.log('SWITCH video::: ', val, ' : PLAYER :::: ', (<any>window).player);
    (<any>window).player.loadVideoById(val);

    // this.insertYouTubeIframe(this.dataObj.videoObj);
  }
  
  public setYouTubeSDK() {
    // console.log('video player init &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
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
    // if(videoObj['videoUrl']) {
    console.log('INSERT YOUTUBE IFRAME ****** ', videoObj['videoUrl']);
    if(videoObj) {
      this.videoPlayed = true;
      console.log('========= insertYouTubeIframe ============= ', videoObj);
      // let player;
      // let autoPlayVal = videoObj["autoPlay"] ?
      (<any>window).onYouTubeIframeAPIReady = () => {
        console.log('*********** insert iframe: ', videoObj);
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
  }

  public onPlayerReady() {
    console.log('player ready');
  }

  public onPlayerStateChange(event) {
    // console.log('player state change');
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
