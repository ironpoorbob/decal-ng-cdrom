import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject, throwError } from 'rxjs';
import { StateManagerService } from '../state-manager.service';
import { gamedata } from './gamedata';
import {
  trigger,
  state,
  style,
  animate,
  keyframes,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  // host: {
  //   '[@moveVan]': 'showBoard',
  //   '(@moveVan.start)': 'animationStart($event)',
  //   '(@moveVan.done)': 'animationDone($event)',
  // },
  animations: [
    trigger('moveVan', [
      state('start', style({
        "opacity": 1,
        "top": '{{prevY}}px',
        "left": '{{prevX}}px',
      }), {params: {prevX: '{{xPos}}', prevY: '{{yPos}}'}}),
      state('done', style({
        opacity: 1
      })),
      transition('start => done', [
        animate('4s ease-in', keyframes ( [
          style({ opacity: 1, offset: 0.4 }),
          style({ transform: 'translate({{xPos}}px, {{yPos}}px)', offset: 0.55 }),
          // style({ transform: 'translateX(80px)', offset: 0.4 }),
          style({ transform: 'translate({{xPos}}px, {{yPos}}px)', offset: 0.6 }),
          // style({ transform: 'translateX(0px)',   offset: 0.6 }),
          style({ opacity: 1, offset: 1 })
        ]))
      ])
    ])
  ]
})

export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  public showBoard: boolean = true;
  public showAnswer: boolean = true;
  public showVideo: boolean = false;
  public showVan: boolean = true;
  public startScreen: boolean = true; // only for continue button at start
  public showDisclaimer: boolean = false;
  // public secondClick: boolean = false; // second click in answer screen

  public vanstate: string = '';

  public gamedata: Array<object> = [];
  public gameInd: number = 0; // index of question
  public answerIndex: number = 0;

  public boardImgPath: string = '';
  public vanImgPath: string = '';
  public vanGlowImgPath: string = '';

  public audio: any;
  public videoUrl: string = '';

  // test vars
  public templateFlip: boolean = true;

  @ViewChild('answerTemplateRef1') answerTemplateRef1: TemplateRef<any>;
  @ViewChild('answerTemplateRef2') answerTemplateRef2: TemplateRef<any>;
  @ViewChild('answerTemplateRef3') answerTemplateRef3: TemplateRef<any>;
  public liveTemplate: TemplateRef<any>;

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router,
    private elementRef: ElementRef
  ) { }

  public ngOnInit(): void {
    this.gamedata = gamedata;
    console.log('game data::: ', this.gamedata);

    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
      }
    )

    // this.handleUnderline();


    this.boardImgPath = this.dataObj.baseUrl + 'assets/images/game_board.jpg';
    this.vanImgPath = this.dataObj.baseUrl + 'assets/images/the-van.png';
    this.vanGlowImgPath = this.dataObj.baseUrl + 'assets/images/the-van-glow.png';
  }

  public ngAfterViewInit():void {
    this.liveTemplate = this.answerTemplateRef2; // reset on load to intro screen
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }



  /// utility functions

  public handleShowBoard() {
    this.showBoard = true;
  }

  public handleHideBoard() {
    this.showBoard = false;
  }

  public getShowVideo(val) {
    this.showVideo = val.videoName ? true : false;
    // console.log('video name: ', this.showVideo);
    return this.showVideo;
  }

  public getTemplate() {
    // either show start screen or answer screen
    return this.liveTemplate;
  }

  // pause 
  public waitTime(wait) {
    console.log('start waiting');
    new Promise((res) => {
      setTimeout(() => {
        console.log('done waiting');
      }, wait);
    })
  }

  // reset to Board start screen
  public resetStart() {
    this.showBoard = true;
    this.startScreen = true;
    this.gameInd = 0;
    this.answerIndex = 0;
  }

  // reset to Start Here screen
  public resetIntro() {
    this.showBoard = false;
    this.showAnswer = true;
    this.startScreen = false; // continue button show/hide
    this.liveTemplate = this.answerTemplateRef2;
    this.gameInd = 0;
    this.answerIndex = 0;
  }

  // controls


  // start screen continue button click - board and van intro
  // advance to intro screen
  public handleIntroContinueClick(): void {
    // if (this.startScreen === true) {
    //   console.log('start click:::: ', this.startScreen);
    //   this.showBoard = false;
    //   this.startScreen = false;
    // }
    this.resetIntro();
  }

  public handleGameStartClick(): void {
    // show question 1
    // stop music loop
    this.showAnswer = false;
    this.liveTemplate = this.answerTemplateRef1;
  }

  public onCheckBoxChange(event, idx, val) {
    // this.showBoard = true;
    console.log('checkbox val disclaimer: ', val.disclaimer);
    this.showDisclaimer = val.disclaimer ? true : false;
    this.showAnswer = true;
    console.log('checkbox click, ', idx, ' : ', event, ' :::: ', val);
    this.answerIndex = idx;
    if (val.correct === false) {
      this.audio = new Audio(this.dataObj.baseUrl + "assets/audio/buzzer.mp3");
      this.audio.play();
      console.log("WRONG!! ::: ", this.audio);
    }
  }

  // continue button click on answer screen
  public handleAnswerClick(val) {
    console.log('NEXT STEP: :: ', val);
    this.showDisclaimer = false;
    if (val.nextStep === 'intro') {
      // go to start screen and reset
      this.resetIntro();
    } else if (val.nextStep === 'outro') {
      this.liveTemplate = this.answerTemplateRef3;
      // this.getVideoUrl('thankyou');
      // this.secondClick = true;
      // this.handleOutro();
    } else if (val.nextStep === 'goback') {
      this.showBoard = true;
      this.handleVanAnimation(val);
      // this.gameInd = this.gameInd - 1;
    } else {
      if (val.correct === true) {
        console.log("CORRECT ANSWER");
        // do sfx and van animation
        // this.showBoard = true;
        this.handleVanAnimation(val);
        
      } else {
        this.showAnswer = false;
      }
    }
  }

  public handleOutro(val) {
    console.log('handle outro');
    // video answer screen and then go to main menu
    this.getAnswerHeader('');
    this.getVideoCaption('Well, thank you very much!');
    this.getVideoUrl('thankyou');
    // videoName: 'thankyou',
    // caption: "Well, thank you very much!",
  }

  public handleVanAnimation(val) {
    // set positions of van

    // show board
    this.showBoard = true;

    // pause and let SFX load
    // this.vanstate = 'start';
    // this.waitTime(300);
    // this.vanstate = (this.vanstate === 'start') ? 'done' : 'start';
    this.vanstate = 'start';
    new Promise((res) => {
      setTimeout(() => {
        console.log('done waiting');
        this.vanstate = 'done';
      }, 1000);
    })

    new Promise((res) => {
      setTimeout(() => {
        console.log('done waiting');
        // this.vanstate = 'done';
        this.gameInd++;
        this.showBoard = false;
        this.showAnswer = false;
        if (val.nextStep === 'goback') {
          this.gameInd = this.gameInd - 2;
        }
      }, 5000);
    })

    // console.log("van state1 ::: ", this.vanstate);
    // this.waitTime(3000);
    // console.log("van state2 ::: ", this.vanstate);
    // this.vanstate = 'done';
    // console.log("van state3 ::: ", this.vanstate);
  }

  public handleUnderline() {
    console.log('UNDERLINE =======================');
    let element = this.elementRef.nativeElement.querySelector('.underlineItem');
    element.setAttribute('style', 'color: green; background: red');
    // let foo = document.querySelector(".underlineItem");
    // foo.style.backgroundColor = 'yellow';
  }

  // continue to answer or next step
  public handleQuestionContinue(val) {
    let answerVal = val.answers[0];
    console.log('QQQQQ NEXT STEP: ', val, ' :: ', answerVal);

    // this.gameInd = 0;
    if (answerVal.nextStep === 'gotgas') {
      this.answerIndex = 0;
      this.handleVanAnimation(answerVal);
    } else {
      this.liveTemplate = this.answerTemplateRef1;
      this.showAnswer = true;
      this.answerIndex = 0;
    }
  }

  // back to main menu
  public handleMenuClick(): void {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

  // video url
  public getVideoUrl(val) {
    console.log("VIDEO ::: ", val);
    // this.stateManagerService.stopLoop();
    // this.getSlayer = true;
    // this.toggleVideoPlayer = true;

    let videoVal = '';
    switch(val) {
      case 'psycho':
        // psycho fan
        videoVal = 'tF1iiUlC3nY';
        break;
      case 'rocky':
        // come on, rocky!
        videoVal = 'y8ri94Zgu2c';
        break;
      case 'closeup':
        // I'm ready for my close up
        videoVal = '-N37akNFovc';
        break;
      case 'thankyou':
        // elvis - thank you very much
        videoVal = 'fj-buH5fhAw';
        break;
      default:
        // elvis - thank you very much
        videoVal = 'fj-buH5fhAw';
        break;
    }

    return 'https://www.youtube.com/embed/' + videoVal + '?autoplay=1&rel=0&controls=0&enablejsapi=1';
  }

  public getAnswerHeader(val): string {
    return val;
  }

  public getVideoCaption(val): string {
    return val;
  }

  // test functions

  public handleAnimationStartClick() {
    this.vanstate = (this.vanstate === 'start') ? 'done' : 'start';
    console.log('van state: ', this.vanstate);
  }

  public handleFlipClick() {
    this.templateFlip = !this.templateFlip;
  }


  public handlePrevClick() {
    // this.vanstate = 'done';
    // this.isOpen = false;
    console.log('PREV game index : ', this.gameInd);
    if (this.gameInd > 0) {
      this.gameInd--;
      // this.carTopPos();
      // this.carLeftPos();
    }
  }

  public handleNextClick() {
    // this.vanstate = 'start';
    // this.isOpen = true;
    console.log('NEXT game index : ', this.gameInd);
    if (this.gameInd < this.gamedata.length-1) {
      this.gameInd++;
      // this.carTopPos();
      // this.carLeftPos();
    }
  }

}
