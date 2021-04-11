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
        animate('3s ease-in', keyframes ( [
          style({ opacity: 1, offset: 0.3 }),
          style({ transform: 'translate({{xPos}}px, {{yPos}}px)', offset: 0.45 }),
          // style({ transform: 'translateX(80px)', offset: 0.4 }),
          style({ transform: 'translate({{xPos}}px, {{yPos}}px)', offset: 0.5 }),
          // style({ transform: 'translateX(0px)',   offset: 0.6 }),
          style({ opacity: 1, offset: 1 })
        ]))
      ])
    ])
  ]
})

/* 
 xpos is translate x and ypos is translate y
 prevX and prevY are the starting x and y coordinates
*/

export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  public showBoard: boolean = true;
  public showAnswer: boolean = true;
  public showVideo: boolean = false;
  public showVan: boolean = true;
  public showVan2: boolean = false;
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
  public vanCrashImgPath: string = '';

  public audio: any;
  public videoUrl: string = '';

  public t4Headline: string = '';
  public t4Subheadline: string = '';
  public t4VideoName: string = '';

  public isPullVanOver: boolean = false;

  // test vars
  public templateFlip: boolean = true;

  @ViewChild('answerTemplateRef1') answerTemplateRef1: TemplateRef<any>;
  @ViewChild('answerTemplateRef2') answerTemplateRef2: TemplateRef<any>;
  @ViewChild('answerTemplateRef3') answerTemplateRef3: TemplateRef<any>;
  @ViewChild('answerTemplateRef4') answerTemplateRef4: TemplateRef<any>;
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
    this.vanCrashImgPath = this.dataObj.baseUrl + 'assets/images/the-van-crash.png';
  }

  public ngAfterViewInit():void {
    this.liveTemplate = this.answerTemplateRef2; // reset on load to intro screen
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }



  /////////////////////////////////
  /// utility functions

  /////////////////////////////////
  // board functions
  /////////////////////////////////

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

  // reset to Start Here screen
  public resetIntro() {
    this.showBoard = false;
    this.showAnswer = true;
    this.startScreen = false; // continue button show/hide
    this.liveTemplate = this.answerTemplateRef2;
    this.gameInd = 0;
    this.answerIndex = 0;
  }

  public handleVanAnimation(val) {
    // set positions of van
    this.showBoard = true;

    // pause? and let SFX load

    // play car skid for question 9: pull over
    if (val.nextStep === 'pullover' && !this.isPullVanOver) {
      this.playSfx('car-skid');
    } else {
      this.playSfx(val.sound);
    }

    // this.vanstate = 'start';
    // this.waitTime(300);
    // this.vanstate = (this.vanstate === 'start') ? 'done' : 'start';
    console.log('ANIMATION :: VAL::: ', val, ' : answer index :: ', this.answerIndex);
    console.log('ANIMATION :: GAME IDX::: ', this.gameInd);
    this.vanstate = 'start';
    new Promise((res) => {
      setTimeout(() => {
        console.log('done waiting');
        this.vanstate = 'done';
      }, 1000);
    })

    // quesiton 10: when van finishes and crashes, switch to crashed van img
    new Promise((res) => {
      setTimeout(() => {
        if (val.nextStep === 'sell') {
          this.vanImgPath = this.dataObj.baseUrl + 'assets/images/the-van-crash.png';
        }
      }, 3000);
    })
    
    new Promise((res) => {
      setTimeout(() => {
        console.log('done waiting');
        // this.vanstate = 'done';
        if (val.nextStep === 'pullover' && !this.isPullVanOver) {
          console.log('PULLOVER!!! ::: ', this.isPullVanOver);
          // question 9: bad food - gotta pull van over
          this.showAnswer = true;
          this.showBoard = false;
          this.isPullVanOver = true; // did it once already
          // this.showVan2 = false;
        } else if (val.nextStep === 'goback') {
          // question 4: go back one step
          this.gameInd = this.gameInd - 1;
          console.log("GO BACK::: GAME IDX:: ", this.gameInd);
          this.showBoard = false;
          this.showAnswer = false;
        } else if (val.nextStep === 'sell') {
          this.showAnswer = true;
          this.showBoard = false;
          // this.showVan2 = true;
          this.handleSellYourGear();
        } else {
          this.gameInd++;
          console.log('MAIN ANIMATION PATH::: gameInd ::: ', this.gameInd);
          this.showBoard = false;
          this.showAnswer = false;
        }
      }, 4000);
    })
  }

  public playSfx(val) {
    console.log('play sfx val ::: ', val);
    
    let sfxVal = '';
    let pauseTime = 1000;
    switch(val) {
      case 'car-start':
        sfxVal = 'car-start.mp3';
        break;
      case 'car-drive1':
        sfxVal = 'car-drive1.mp3';
        break;
      case 'car-drive2':
        sfxVal = 'car-drive2.mp3';
        break;
      case 'car-skid':
        sfxVal = 'car-skid.mp3';
        pauseTime = 2000;
        break;
      case 'car-skid-crash':
        sfxVal = 'car-skid-crash.mp3';
        pauseTime = 2000;
        break;
      default:
        sfxVal = 'car-start.mp3';
        break;
    }
    let audioString = this.dataObj.baseUrl + "assets/audio/" + sfxVal;
    this.audio = new Audio(audioString);
    new Promise((res) => {
      setTimeout(() => {
        console.log('play audio');
        this.audio.play();
      }, pauseTime);
    })
  }

  /////////////////////////////////
  // question functions
  /////////////////////////////////

  // on click go to next screen (answers or next step)
  public onCheckBoxChange(event, idx, val) {
    // this.showBoard = true;
    // console.log('checkbox val: ', val);
    this.showDisclaimer = val.disclaimer ? true : false;
    this.showAnswer = true;
    console.log('checkbox click, ', idx, ' : ', event, ' :::: ', val);
    this.answerIndex = idx;
    if (val.correct === false) {
      this.audio = new Audio(this.dataObj.baseUrl + "assets/audio/buzzer.mp3");
      this.audio.play();
      console.log("WRONG!! ::: ", this.audio);
    } else if (val.nextStep === "pullover") {
      // this.handlePullOver(val);
      // switch to alt van for pullover animation
      this.showVan2 = true; // TODO: switch image to van 1 for prod
      this.handleVanAnimation(val);
    }
  }

  // continue to answer or next step 
  // this is when no check boxes and need to advance to video or next step
  public handleQuestionContinue(val) {
    let answerVal = val.answers[0];
    console.log('QQQQQ NEXT STEP: ', val, ' :: ', answerVal);

    // this.gameInd = 0;
    if (answerVal.nextStep === 'gotgas') {
      // no video - just goes right to board/van animation
      this.answerIndex = 0;
      this.handleVanAnimation(answerVal);
    } else {
      this.liveTemplate = this.answerTemplateRef1;
      this.showAnswer = true;
      this.answerIndex = 0;
    }
  }

  public getTemplate() {
    // show selected template
    // template1 - original answers
    // template2 - start screen
    // template3 - outro screen
    // template4 - alt answer screen
    return this.liveTemplate;
  }


  /////////////////////////////////
  // answers1 - template1
  /////////////////////////////////

  // continue button click on answer screen
  public handleAnswerClick(val) {
    console.log('NEXT STEP: :: ', val);
    this.showDisclaimer = false;

    if (val.nextStep === 'intro') {
      // go to start screen and reset
      console.log('GO TO INTRO');
      this.resetIntro();
    } else if (val.nextStep === 'outro' || val.nextStep === 'whine') {
      this.liveTemplate = this.answerTemplateRef3;
      // this.getVideoUrl('thankyou');
      // this.secondClick = true;
      // this.handleOutro();
    } else if (val.nextStep === 'goback') {
      this.showBoard = true;
      this.handleVanAnimation(val);
      // this.gameInd = this.gameInd - 1;
    } else if (val.nextStep === 'psycho') {
      console.log("PSYCHO FAN AGAIN");
      this.handlePsychoFanMom();
    } else if (val.nextStep === 'pullover') {
      console.log("Pull van over");
      this.showVan2 = false; // switch back to original van animation div
      this.handleVanAnimation(val);
      // this.gameInd++;
      // this.handlePullOver(val);
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

  public getAnswerHeader(val): string {
    return val;
  }

  public getVideoCaption(val): string {
    return val;
  }

  // show/hide video div
  public getShowVideo(val) {
    this.showVideo = val.videoName ? true : false;
    // console.log('video name: ', this.showVideo);
    return this.showVideo;
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
        videoVal = '';
        return videoVal;
        // break;
    }

    return 'https://www.youtube.com/embed/' + videoVal + '?autoplay=1&rel=0&controls=0&enablejsapi=1';
  }

  /////////////////////////////////
  // answers2 - template2 - start/intro screen
  /////////////////////////////////

  public handleGameStartClick(): void {
    // show question 1
    // stop music loop
    this.stateManagerService.stopLoop();
    this.showAnswer = false;
    this.showVan2 = false; // make sure van1 is showing
    this.liveTemplate = this.answerTemplateRef1;
  }

  /////////////////////////////////
  // answers3 - template3 - outro screen
  /////////////////////////////////

  /////////////////////////////////
  // answers4 - template4 - answers alt - psycho fan video
  /////////////////////////////////

  public handlePsychoFanMom() {
    // this.getVideoUrl('psycho')
    this.t4Headline = 'PsychoFan!';
    this.t4Subheadline = "“aaaah!”";
    this.t4VideoName = 'psycho';
    this.liveTemplate = this.answerTemplateRef4;
  }

  public handleT4Click(val) {
    console.log('T4 continue click::: ', val);
    if (val.nextStep === 'sell') {
      this.liveTemplate = this.answerTemplateRef3;
    } else {
      this.showBoard = true;
      this.liveTemplate = this.answerTemplateRef1;
      this.handleVanAnimation(val);
    }
  }

  public handleSellYourGear() {
    this.t4Headline = "Sell your equipment and<br> get out of the music business! <br><br> The End!";
    this.t4Subheadline = "";
    // this.t4VideoName = 'psycho';
    this.liveTemplate = this.answerTemplateRef4;
  }

  /////////////////////////////////
  // controls
  /////////////////////////////////

  // back to main menu - fists
  public handleMenuClick(): void {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }


  

  

  

  

  
  




  

  

  
  

  // public handleOutro(val) {
  //   console.log('handle outro');
  //   // video answer screen and then go to main menu
  //   this.getAnswerHeader('');
  //   this.getVideoCaption('Well, thank you very much!');
  //   this.getVideoUrl('thankyou');
  //   // videoName: 'thankyou',
  //   // caption: "Well, thank you very much!",
  // }

  // public handlePullOver(val) {
  //   this.showVan2 = true;
  //   this.handleVanAnimation(val);
  // }

 
  // reset to Board start screen
  // public resetStart() {
  //   this.showBoard = true;
  //   this.startScreen = true;
  //   this.gameInd = 0;
  //   this.answerIndex = 0;
  // }

  // pause 
  // public waitTime(wait) {
  //   console.log('start waiting');
  //   new Promise((res) => {
  //     setTimeout(() => {
  //       console.log('done waiting');
  //     }, wait);
  //   })
  // }

  // public handleShowBoard() {
  //   this.showBoard = true;
  // }

  // public handleHideBoard() {
  //   this.showBoard = false;
  // }

  
  

  

  

  // test functions

  public handleIndexJumpClick(val) {
    this.gameInd = val;
  }

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
