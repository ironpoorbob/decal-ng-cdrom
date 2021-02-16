import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../state-manager.service';
import { VideoServiceService } from '../video-service.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        "opacity": 0,
      })),
      state('closed', style({
        "opacity": 1,
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.4s')
      ]),
    ])
  ]
})
export class AskComponent implements OnInit, OnDestroy, AfterViewInit {
  public kickPath: string = '';
  public pizzaBoyPath: string = '';

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  public isOpen: boolean = true;
  public isOpen2: boolean = false;
  public isOpen3: boolean = false;

  public hideLinks: boolean = false;

  public kickShow: boolean = false;

  public showVideoPlayer: boolean = false;
  public toggleVideoPlayer: boolean = false;

  public videoUrl: string = '';

  public weirdSlideShow: boolean = false;
  public weirdSlideShow1: boolean = false;
  public weirdSlideShow2: boolean = false;
  public weirdSlideShow3: boolean = false;
  public weirdSlideShow4: boolean = false;

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router,
    private videoService: VideoServiceService
  ) { }

  ngOnInit(): void {
    this.isOpen = true;
    this.isOpen2 = true;
    this.isOpen3 = false;
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
      }
    )

    this.kickPath = this.dataObj.baseUrl + 'assets/images/full-band-kick.jpg';
    this.pizzaBoyPath = this.dataObj.baseUrl + 'assets/images/pizza-boy2.jpg';

    new Promise((res) => {
      setTimeout(() => {
        this.handleAnimation();
      }, 500);
    })

    new Promise((res) => {
      setTimeout(() => {
        this.handleShowText();
      }, 1500);
    })
    this.stateManagerService.startLoop("ask");
  }

  public ngAfterViewInit() {}

  public handleAnimation() {
    this.isOpen = !this.isOpen;
  }

  public handleShowText() {
    this.isOpen2 = !this.isOpen2;
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public onAnimationEvent(event) {
    // if lets get weird section showing
    // hide links will display:none
    if (this.weirdSlideShow === true) {
      this.hideLinks = true;
    }
  }

  // back to main screen
  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

  // close video button
  public handleCloseClick() {
    this.showVideoPlayer = false;
    this.toggleVideoPlayer = false;
    this.stateManagerService.startLoop("ask");
  }

  // play video on text button click
  public handleAskClick(val) {
    this.stateManagerService.stopLoop();
    this.showVideoPlayer = true;
    this.toggleVideoPlayer = true;

    let videoVal = '';
    switch(val) {
      case 'suits':
        // what's with the suits
        videoVal = 'UPrXqwUJygk';
        break;
      case 'live':
        // the live show
        videoVal = 'hkBHd4SsZqM';
        break;
      case 'hungry':
        // decal fridge
        videoVal = '-uU5sY1y2Ik';
        break;
      case 'rear':
        // a rear view
        videoVal = 'TmV3SuwJOCw';
        break;
      case 'show':
        // good show
        videoVal = 'ACKvQulmV5I';
        break;
      case 'weird':
        // lets get weird
        videoVal = 'ACKvQulmV5I';
        break;
      case 'strings':
        // break strings
        videoVal = '5AHo9XkLfGQ';
        break;
      case 'time':
        // I ain't got no time!
        videoVal = 'tuHorWjZbWI';
        break;
      default:
        // decal fridge 
        videoVal = '-uU5sY1y2Ik';
        break;
    }

    this.videoUrl = 'https://www.youtube.com/embed/' + videoVal + '?autoplay=1&rel=0&controls=2&enablejsapi=1';
  }

  public backgroundImagePath(imageName) {
    let imageObj = [
      {
        name: 'background',
        imageUrl: 'assets/images/let-it-be.jpg'
      },
      {
        name: 'overlay',
        imageUrl: 'assets/images/let-it-be3.jpg'
      }
    ]
    let result = imageObj.find(x => x.name === imageName);
    return this.dataObj.baseUrl + result.imageUrl;
  }

  // handle click of small kick image - lower right
  public handleKickImage(event) {
    event.preventDefault();
    this.stateManagerService.stopLoop();

    this.showVideoPlayer = true;
    this.kickShow = true;
    let assetPath = this.dataObj.baseUrl + 'assets/audio/ask-kick.mp3';
    let audio = new Audio(assetPath);
    audio.play();

    new Promise((res) => {
      setTimeout(() => {
        this.showVideoPlayer = false;
        this.kickShow = false;
        this.stateManagerService.startLoop("ask");
      }, 800);
    })
  }

  // open Lets get weird section
  public handleWeirdClick() {
    this.stateManagerService.stopLoop();
    this.isOpen2 = true;
    this.weirdSlideShow = true;
    this.weirdSlideShow1 = true;
  }

  // advance slices in Lets get Weird section
  public advanceSlide(val) {
    switch(val) {
      case 2:
         // show part 2 of text - slide 2
        this.weirdSlideShow1 = false;
        this.weirdSlideShow2 = true;
        break;
      case 3:
        // show 3 slide / video
        this.weirdSlideShow2 = false;
        this.weirdSlideShow3 = true;
        break;
      case 4:
        // show pizza boy bob slide
        this.weirdSlideShow3 = false;
        this.weirdSlideShow4 = true;
        break;
      case 5:
        // go back to ask screen
        this.hideLinks = false;
        this.weirdSlideShow = false;
        this.weirdSlideShow1 = false;
        this.weirdSlideShow4 = false;
        this.isOpen2 = false;
        this.stateManagerService.startLoop("ask");
        break;
      default:
        // go back to ask screen
        this.hideLinks = false;
        this.weirdSlideShow = false;
        this.weirdSlideShow1 = false;
        this.weirdSlideShow4 = false;
        this.isOpen2 = false;
        this.stateManagerService.startLoop("ask");
        break;
    }
  }

}
