import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject, throwError } from 'rxjs';
import { StateManagerService } from '../state-manager.service';
import { gamedata } from './gamedata';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        "top": 0,
      })),
      state('closed', style({
        "top": 300
      })),
      transition('*=>*', [
        animate('0.6s ease-out')
      ]),
      transition('*=>*', [
        animate('0.5s ease-out')
      ]),
    ])
  ]
})
export class GameComponent implements OnInit, OnDestroy {
  public boardPath: string = '';
  public van: string = '';

  public gameInd: number = 0; // index of question
  public answerIndex: number = 0;

  public vanPos: Array<object> = [];
  public gamedata: Array<object> = [];

  public showBoard: boolean = false;
  public showAnswer: boolean = false;
  public gameStart: boolean = false;

  public checked: boolean = false;

  public item1: boolean = true;
  public item2: boolean = false;

  public templateFlip: boolean = true;
  public isOpen: boolean = false;

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  @ViewChild('myTemplateRef1') myTemplateRef1: TemplateRef<any>;
  @ViewChild('myTemplateRef2') myTemplateRef2: TemplateRef<any>;
  liveTemplate: TemplateRef<any>;

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gamedata = gamedata;
    console.log('game data::: ', this.gamedata);
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
      }
    )

    new Promise((res) => {
      setTimeout(() => {
        // this.gameStart = true;
        /// show van and start button on load
      }, 5000);
    })

    this.liveTemplate = this.myTemplateRef1;

    this.boardPath = this.dataObj.baseUrl + 'assets/images/game_board.jpg';
    this.van = this.dataObj.baseUrl + 'assets/images/the-van.png';

    this.vanPos = [
      {"top": 20, "left": 60},
      {"top": 45, "left": 150},
      {"top": 93, "left": 212},
      {"top": 147, "left": 242},
      {"top": 167, "left": 322},
      {"top": 173, "left": 412},
      {"top": 235, "left": 466},
      {"top": 278, "left": 526},
      {"top": 271, "left": 635},
      {"top": 313, "left": 687},
      {"top": 369, "left": 794},
    ]
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

  public handlePrevClick() {
    console.log('PREV game index : ', this.gameInd);
    if (this.gameInd > 0) {
      this.gameInd--;
      this.carTopPos();
      this.carLeftPos();
    }
  }

  public handleNextClick() {
    console.log('NEXT game index : ', this.gameInd);
    if (this.gameInd < this.vanPos.length-1) {
      this.gameInd++;
      this.carTopPos();
      this.carLeftPos();
    }
  }

  public carTopPos() {
    console.log('top pos: ', this.vanPos[this.gameInd]['top']);
    return this.vanPos[this.gameInd]['top'] + 'px';
  }

  public carLeftPos() {
    console.log('let pos: ', this.vanPos[this.gameInd]['left']);
    return this.vanPos[this.gameInd]['left'] + 'px';
  }

  public handleFlipClick() {
    // this.isOpen = !this.isOpen;
    // this.showBoard = !this.showBoard;
    this.templateFlip = !this.templateFlip;
    // this.liveTemplate = this.myTemplateRef2;
    // this.liveTemplate = this.showViewTemplate ? this.tmplC : this.tmplC2;
  }

  public onCheckBoxChange(event, idx) {
    // this.showBoard = true;
    this.showAnswer = true;
    console.log('checkbox click, ', idx, ' : ', event);
    this.answerIndex = idx;
  }

  // public backgroundImagePath(imageName) {
  //   return this.boardPath;
  // }

  public getTemplate() {
    // return "#myTemplateRef2";
    this.liveTemplate = this.myTemplateRef1;
    return this.liveTemplate = this.templateFlip ? this.myTemplateRef1 : this.myTemplateRef2;
  }

  public handleGameStartClick() {

  }

  /*

  [ngStyle]="{'top' : carTopPos(), 'left' : carLeftPos()}"

  sections:
   - board
    - car move sfx
   - questions
    - wrong answers get a buzz sfx
   - answers


   how to handle all the different screens 
    we have the questions answer sections and insert partials ng-templates

    need a controller of some sort to handle playing of SFX and car animation
    - steps 
      - load and play sfx
      - start animation of car

  */

}
