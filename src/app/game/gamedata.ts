export const gamedata = [
  {
    id: '1',
    headline: "Try to start the Van.",
    questionSubheadline: "Van doesn’t start, do you...",
    questions: [
      {question: "a) call AAA"},
      {question: "b) call Hertz and rent a new van for the tour because you would never drive 2500 miles in six days with an unreliable vehicle."},
      {question: "c) yell at the member of the band who owns the van (and who got it just for the bands use) that he/she better get under the hood and fix this piece of crap fast or you're going to find a new bass player and/or drummer (singers and guitarists never own vans)."}
    ],
    answers: [
      {
        answer: "No one in your band or for that matter anyone you know has a AAA card. <br><br>Start again.",
        correct: false,
        wide: false,
        nextStep: 'intro'
      },
      {
        answer: "Yeah right. If you picked this one your day job is too good. Give up and get a promotion. Quit this game and sell it to your little brother or sister.",
        correct: false,
        nextStep: 'outro',
        wide: false
      },
      {
        answer: "You’re off to a good start! Move ahead one square.",
        correct: true,
        sound: "car-start",
        startXpos: 40,
        startYpos: 50,
        xMove: 95,
        yMove: 0
      }
    ]
  },
  {
    id: '2',
    headline: "Ego!",
    questionSubheadline: "Since your band is at least together enough to get a couple of shows and call it a tour, your lead singer’s head is now so big it’s gonna explode. Help him/her?",
    questions: [],
    answers: [
      {
        alignment: "center",
        answer: "“I’m ready for my close up Mr. DeMille!”",
        caption: "There’s no helping you!",
        videoName: "closeup",
        correct: true,
        sound: "car-drive1",
        startXpos: 135,
        startYpos: 50,
        xMove: 60,
        yMove: 55
      }
    ]
  },
  {
    id: '3',
    headline: "You’re Bored!",
    questionSubheadline: "One hour into the trip everyone’s already exhausted their conversation storage tanks. Boredom has begun! What do you do?",
    questions: [
      {question: "a) Pull out your book of 1001 elephant jokes."},
      {question: "b) Take the time to gather the other members and have discussion on how to resolve the band’s personality conflicts and to start concentrating more on organizing the business end of things."},
      {question: "c) Start farting."},
    ],
    answers: [
      {
        answer: "While actually not a bad idea, the other members of the band will proceed to inflict bodily harm on you in order to get rid of their own intense boredom. <br><br>Try again.",
        correct: false
      },
      {
        answer: "Yeah Right. (see question 1, answer b) How about the business end of this! <br><br>Try again.",
        correct: false  
      },
      {
        answer: "No one knows why, but bands just do this. Yes, even girl bands.<br><br> Move ahead one square.",
        correct: true,
        sound: "car-drive2",
        startXpos: 190,
        startYpos: 90,
        xMove: 35,
        yMove: 70
      },
    ]
  },
  {
    id: '4',
    headline: "Wrong Turn!",
    questionSubheadline: "You forget to bring a map and the guy who said he knew directions fell asleep long ago. Do you...",
    questions: [
      {question: "a) decide that you inherited your father’s good sense of direction and try to “wing it”."},
      {question: "b) totally freak and start yelling at everyone that they are losers and that <span class='underlineItem'>_______</span> (insert more popular local band here) wanted you in their band."},
      {question: "c) stop and get beer."},
    ],
    answers: [
      {
        answer: "Not a bad idea and certainly takes the least effort (always a plus). Possibly dangerous when everyone wakes up in<span class='underlineItem'>______________</span> (insert your least favorite nowhere town here). <br><br> Try again.",
        correct: false
      },
      {
        answer: "Although tempting, it’s much too early in the trip to display this sort of aggression. <br><br> Move back one space.",
        correct: false,
        sound: "car-drive1",
        nextStep: 'goback',
        startXpos: 225,
        startYpos: 155,
        xMove: -35,
        yMove: -70
      },
      {
        answer: "Now you’re getting the hang of this!<br> Your band members will love you and since you’re getting a good buzz going, who cares where you are.<br><br> Move ahead one space. ",
        disclaimer: true,
        correct: true,
        sound: "car-skid-crash",
        startXpos: 225,
        startYpos: 155,
        xMove: 70,
        yMove: 15
      },
    ]
  },
  {
    id: '5',
    headline: "Need gas.",
    questionSubheadline: "You’ve been drinking beer for seven hours. Believe me you’ve got gas (see question 3, answer c). <br><br>Keep moving, but collect gas money anyway.",
    questions: [],
    answers: [
      {
        correct: true,
        sound: "car-drive2",
        nextStep: 'gotgas',
        startXpos: 295,
        startYpos: 170,
        xMove: 80,
        yMove: 15
      }
    ]
  },
  {
    id: '6',
    headline: "No show!",
    questionSubheadline: "After 16 hours of driving you arrive at the club for your first show and… they fired their guy who booked your show. The new booker refuses to honor the old shows because she/he has their “thing” they’re trying to do with the club. Do you...",
    questions: [
      {question: "a) threaten the new booker?"},
      {question: "b) wave your photocopied “contract” and threaten to sue?"},
      {question: "c) be nice (much easier if booker is of your preferred sex) and offer to do show in the worst slot for no money -- hey, just some free beer. Grovel. But get the beer."},
    ],
    answers: [
      {
        answer: "Very tempting and possibly even worthwhile. Bookers usually deserve every bad thing that happens to them, but hey you still need shows so it’s always better to suck up. Anyway, bouncers are always bigger than band members. Stay cool. <br><br> Try again.",
        correct: false,
        wide: true
      },
      {
        answer: "Yeah right. (see question 2, answer b)<br> Sue this! <br><br> Try again.",
        correct: false,
      },
      {
        answer: "Probably won’t work but definitely worth a try. <br><br> Move ahead.",
        correct: true,
        sound: "car-drive2",
        startXpos: 375,
        startYpos: 185,
        xMove: 55,
        yMove: 60
      },
    ]
  },
  {
    id: '7',
    headline: "It worked!",
    questionSubheadline: "You played a great show to an empty house. Unfortunately there was this one guy there...  <br>the <em>PsychoFan!</em> <br><br>He hangs out alone at bad clubs and has no interests. But your band has changed his life. Your band is his new hobby. He wants to ride with you in your van for the rest of the tour.<br><br> Should you let him???? Yes?",
    questions: [],
    answers: [
      {
        alignment: "center",
        answer: "PsychoFan!",
        caption: "“aaaah!”",
        videoName: "psycho",
        sound: "car-drive2",
        correct: true,
        startXpos: 430,
        startYpos: 245,
        xMove: 50,
        yMove: 40
      }
    ]
  },
  {
    id: '8',
    headline: "Sleep!",
    questionSubheadline: "You need a place to crash after the show, do you...",
    questions: [
      {question: "a) accept the offer of a nice pretty you girl/guy to crash at her/his pad?"},
      {question: "b) find a Motel 6?"},
      {question: "c) sleep in the van?"},
      {question: "d) accept PsychoFan’s offer of a place to sleep?"},
    ],
    answers: [
      {
        answer: "Duh. But what about your other band members???? Borrow some “protection” from them and then, who cares where <em>they</em> sleep!<br><br> Move ahead.",
        correct: true,
        sound: "car-drive2",
        startXpos: 480,
        startYpos: 290,
        xMove: 95,
        yMove: -10
      },
      {
        answer: "Did you already forget that you didn’t get paid for the show? <br><br>If this is not a factor, see question 1, answer b.<br><br> Try again.",
        correct: false,
      },
      {
        answer: "No way. Never sleep in the van. Just make the guy/girl who owns the van sleep in it to watch the equipment. Hey, they own the piece of crap.<br><br> Try again.",
        correct: false,
      },
      {
        answer: "Not unless you’ve exhausted every possibility of answer (a) from possibly, possibly happening. Superior to sleeping in the van. And since he lives at home, his mom will probably cook you breakfast in the morning. <br><br>Move ahead.",
        correct: true,
        t4alignment: "center",
        nextStep: 'psycho',
        t4VideoName: 'psycho',
        sound: "car-drive2",
        startXpos: 480,
        startYpos: 290,
        xMove: 95,
        yMove: -10

      },
    ]
  },
  {
    id: '9',
    headline: "On the road again...",
    questionSubheadline: "but everyone had that bad mexican food last night. It’s 50 miles to the next rest stop. The road is really winding. And bumpy.<br> Uuuuuuuhhhhhhhh.<br> What are you going to do? ",
    questions: [
      {question: "a) Forget about it and go back to reading<br> novelizations of Sylvester Stallone movies."},
      {question: "b) Whine."},
      {question: "c) Threaten the driver with bodily harm if he/she doesn’t pull off to the side of the road<br> now. Now! NOW!"},
    ],
    answers: [
      {
        alignment: "center",
        answer: "",
        caption: "“Come on Rocky!”",
        sound: "car-drive2",
        correct: true,
        videoName: "rocky",
        startXpos: 575,
        startYpos: 280,
        xMove: 65,
        yMove: 40
      },
      {
        answer: "Sorry, you’ve just been thrown out of the band - who needs a lead singer anyway?",
        correct: false,
        nextStep: 'whine',
        wide: false
      },
      {
        answer: "WHEW! THAT WAS CLOSE!",
        alignment: "center",
        correct: true,
        nextStep: 'pullover',
        sound: "car-drive2",
        startXpos: 575,
        startYpos: 280,
        xMove: 65,
        yMove: 40
      },
    ]
  },
  {
    id: '10',
    headline: "You’ve made it to the club. ",
    questionSubheadline: "You’ve arrived at the big club in town for the centerpiece show of your tour. The show isn’t cancelled. You didn’t get lost. The band didn’t break up in the van. Sound check goes great. You’ve got a $400 guarantee. The local college radio station is broadcasting the show live. Major label suit-wearing guys are trying to talk to the cool indie A&R guys who are there to see your band. You play the best show of your life. People help you carry your equipment and don’t steal anything. That model-type asks if you need a place to stay...",
    wide: false,
    questions: [],
    answers: [
      {
        answer: "<span class='big-header'>WAKE UP!!!</span> <br><br>You fell asleep while driving the van. Luckily PsychoFan wakes you up and you all survive.<br><br> Time to go home.",
        nextStep: 'sell',
        t4alignment: "center",
        sound: "car-skid-crash",
        correct: true,
        startXpos: 640,
        startYpos: 320,
        xMove: 85,
        yMove: 60
      },
    ]
  }
]


