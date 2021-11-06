const multiBox = $('#multiChoice');
const binaryBox = $('#binaryChoice');
const timerBox = $('#timerBox');
const highScoreBox = $('#highScoreBox');
const playerName = $('input.startItem');

//names generated from name generator for high score placeholders
const defaultNames = ['Timothy', 'Millie', 'Blanch', 'Tory', 'Bekki', 'Kaley', 'Averie', 'Hervey', 'Solomon', 'Sharleen'];
const scoreCard = {
    score: 250.00,
    timer: 100,
    name: 'Kappa'
}

const questionType = {
    binary: {
        True: 'True',
        False: 'False'
    },
    multiChoice: {
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D'
    }
};

const question = [ 
    {//[0]
        question: 'True or False: You can access cookies using Javascript.',
        type: questionType.binary,
        answer: questionType.binary.True,
        binaryChoice: {
            True: 'True', 
            False: 'False'
        }
    },
    {//[1]
        question: 'Which of the following is the correct syntax to print a page using JavaScript?',
        type: questionType.multiChoice,
        answer: questionType.multiChoice.A,
        multiChoice: {
            A: 'window.print();',
            B: 'browser.print();',
            C: 'navigator.print();',
            D: 'document.print();'
        }
    },
    {//[2]
        question: 'Which built-in method calls a function for each element in the array?',
        type: questionType.multiChoice,
        answer: questionType.multiChoice.C,
        multiChoice: {
            A: 'while()',
            B: 'loop()',
            C: 'forEach()',
            D: 'None of the above.'
        }
    },
    {//[3]
        question: 'Which built-in method reverses the order of the elements of an array?',
        type: questionType.multiChoice,
        answer: questionType.multiChoice.B,
        multiChoice: {
            A: 'changeOrder(order)', 
            B: 'reverse()', 
            C: 'sort(order)', 
            D: 'None of the above.'
        }
    },
    {//[4]
        question: 'Which of the following function of Number object returns the number\'s value?',
        type: questionType.multiChoice,
        answer: questionType.multiChoice.B,
        multiChoice: {
            A: 'toString()',
            B: 'valueOf()',
            C: 'toLocaleString()',
            D: 'toPrecision()'
        }
    },
    {//[5]
        question: 'Which of the following function of String object splits a String object into an '
                    + 'array of strings by separating the string into substrings?',
        type: questionType.multiChoice,
        answer: questionType.multiChoice.B,
        multiChoice: {
            A: 'slice()',
            B: 'split()',
            C: 'replace()',
            D: 'search()'
        }
    },
    {//[6]
        question: 'Which of the following function of String object returns the calling string value '
                    +'converted to lower case while respecting the current locale?',
        type: questionType.multiChoice,
        answer: questionType.multiChoice.A,
        multiChoice: {
            A: 'toLocaleLowerCase()',
            B: 'toLowerCase()',
            C: 'toString()',
            D: 'substring()'
        }
    },
    {//[7]
        question: 'Which of the following function of String object causes a string to be italic, as '
                    + 'if it were in an <i> tag?',
        type: questionType.multiChoice,
        answer: questionType.multiChoice.D,
        multiChoice: {
            A: 'fixed()',
            B: 'fontcolor()',
            C: 'fontsize()',
            D: 'italics()'
        }
    },
    {//[8]
        question: 'Which of the following function of Array object returns the last (greatest) index ' 
                    + 'of an element within the array equal to the specified value, or -1 if none is '
                    + 'found?',
        type: questionType.multiChoice,
        answer: questionType.multiChoice.C,
        multiChoice: {
            A: 'indexOf()',
            B: 'join()',
            C: 'lastIndexOf()',
            D: 'map()'
        }
    },
    {//[9]
        question: 'Which of the following function of Array object returns a string representing the '
                    + 'array and its elements?',
        type: questionType.multiChoice,
        answer: questionType.multiChoice.D,
        multiChoice: {
            A: 'toSource()',
            B: 'sort()',
            C: 'splice()',
            D: 'toString()'
        }
    }
];

let currentHighScores = [];
let correctAnswers = 0;
let wrongAnswers = 0;
let questionPosition = 0;
let countDown; 

const generateHighScores = () => {
    currentHighScores = [];
    for (let i = 0; i < 10; i++) {
        currentHighScores.push(
            {
                name: defaultNames[i],
                score: (i + Math.round(Math.random() * 10) * (60 + ((((Math.random() * 10 ) % 2 == 0) ? -1 : 1 ) * (i * Math.fround(Math.random() * 10)))) * 9).toFixed(2)
            }
        );
    }
    localStorage.setItem('High Scores', JSON.stringify(currentHighScores));
    currentHighScores = JSON.parse(localStorage.getItem('High Scores'));
    currentHighScores.sort((a,b) => {return (b.score - a.score)}); //sort by high score
};

const populateHighScores = () => {
    currentHighScores.sort((a,b) => {return (b.score - a.score)}); //sort by high score
    highScoreBox.html('');
    //add high score header
    const highScoreHeader = '<div class="row justify-content-center my-1 bg-light-gradient" id="highScoreHeader">'
        + '<div class="col-2 card p-5 align-self-center border-end-0" style="border-radius: 8px 0 0 8px;">'
            + 'Place </div>'
        + '<div class="col-4 card p-5 align-self-center border-start-0 border-end-0 " style="border-radius: 0 0 0 0;">'
            + 'Name </div>'
        + '<div class="col-4 card p-5 align-self-center border-start-0 " style="border-radius: 0 8px 8px 0;">'
            + 'Score </div></div>';
    highScoreBox.append(highScoreHeader);

    //add high score list
    for (let j = 0; j < currentHighScores.length; j++) {
        const element = currentHighScores[j];
        const score = element.score;
        highScoreBox.append('<div class="row justify-content-center">'
            + '<div class="col-2 card p-5 align-self-center border-end-0" style="border-radius: 8px 0 0 8px;"> '
                + (j + 1 ) + ': </div>'
            + '<div class="col-4 card p-5 align-self-center border-start-0 border-end-0" style="border-radius: 0 0 0 0; overflow: visible; white-space: nowrap"> '
                + element.name + '</div>'
            + '<div class="col-4 card p-5 align-self-center border-start-0" style="border-radius: 0 8px 8px 0;"> ' 
                + score + '</div></div>'
        );
    }
    while(currentHighScores.length > 10){
        currentHighScores.pop(); //remove lowest score(s) from top 10
    }
};

const setTimerDisplay = function () {
    $('#timerDisplay').html(scoreCard.timer.toFixed(1) + ' second' + ((scoreCard.timer != 1) ? 's' : '') + ' remaining');
};

const initializeQuiz = () => {
    questionPosition = 0;
    scoreCard.name = playerName.val();
    scoreCard.timer = 60;
    scoreCard.score = 0;
    $('.startItem').addClass('d-none');
    $('#complete').removeClass('d-grid').addClass('d-none');
    timerBox.removeClass('d-none');
    correctAnswers = 0;
    wrongAnswers = 0;
}

const start = ()=>{
    if(playerName.val().length > 0){ //Don't start if there's no name
        initializeQuiz();
        setTimerDisplay(); // show timer
        displayQuestion(); // display first question
        countDown = setInterval(()=>{ //timer function
            scoreCard.timer -= 0.1;
            scoreCard.timer = Math.fround(scoreCard.timer);
            setTimerDisplay();
            if(scoreCard.timer <= 0) { // end interval if timer runs out
                scoreCard.timer = 0.000;
                setTimerDisplay();
                end();
            }
        }, 100); //timer updates every 1/10th of a second
    } else { //simply highlight in red if no name
        playerName.addClass('border-3 border-danger');
        setTimeout(()=>{playerName.removeClass('border-3 border-danger')}, 1000);
    }
};

const end = () => {
    $('.startItem').removeClass('d-none'); //show start items (name, start button)
    clearInterval(countDown); // end clock if not already
    countDown == undefined; // clear variable for next start

    const percent = ((correctAnswers / (correctAnswers + wrongAnswers)) * 100).toFixed(0); 
    $('#percentDisplay').html(correctAnswers + ' Correct / ' + wrongAnswers + ' Wrong: ' + (percent) + '%');

    binaryBox.removeClass('d-grid').addClass('d-none'); //hide true/false section
    multiBox.removeClass('d-grid').addClass('d-none'); //hide multiple choice section
    
    // add player score to high scores
    currentHighScores.push({name: scoreCard.name, score: (scoreCard.score * scoreCard.timer).toFixed(2) }); 
    populateHighScores();

    const newHighScores = JSON.stringify(currentHighScores);
    localStorage.setItem('High Scores', newHighScores); // store new high scores

    $('#scoreDisplay').html("Points: " + scoreCard.score + '<br/>Time: ' + scoreCard.timer.toFixed(1)  //set player stat display
        + ' seconds' + '<br/>Total: ' + (scoreCard.score * scoreCard.timer).toFixed(2));
    $('#complete').removeClass('d-none').addClass('d-grid'); // show high scores section
    
};

const adjustScore = (adjustment)=>{ 
    scoreCard.score += adjustment;
    scoreCard.timer += (2 * adjustment); // timer goes up 2x the points
    const pointUp = (adjustment > 0); // check if positive or negative
    timerBox.append('<p class="' + (pointUp ? 'text-success' : 'text-danger') + ' adjusted" >' //show point adjustment on timer 
        + (pointUp ? '+' : '') + 2 * adjustment +'</p>');
    setTimeout(()=>{
        $('.adjusted').animate({opacity: 0}, 250); // make adjustment display fade away 
        setTimeout(()=>{
            $('.adjusted').remove(); // make adjustment go away
        }, 350)
    }, 500);
    setTimerDisplay();
};

const displayQuestion = () => {
    //self explanitory, not wasting my time explaining this.
    const thisQuestion = question[questionPosition];
    if(thisQuestion.type == questionType.multiChoice){
        $('#multiChoiceQuestionText').html(thisQuestion.question);
        $('#answer-A').html(thisQuestion.multiChoice.A);
        $('#answer-B').html(thisQuestion.multiChoice.B);
        $('#answer-C').html(thisQuestion.multiChoice.C);
        $('#answer-D').html(thisQuestion.multiChoice.D);
        multiBox.removeClass('d-none').addClass('d-grid');
        binaryBox.removeClass('d-grid').addClass('d-none');
    } else if(thisQuestion.type == questionType.binary){
        $('#binaryChoiceQuestionText').html(thisQuestion.question);
        $('#answer-True').html(thisQuestion.binaryChoice.True);
        $('#answer-False').html(thisQuestion.binaryChoice.False);
        binaryBox.removeClass('d-none').addClass('d-grid');
        multiBox.removeClass('d-grid').addClass('d-none');
    }
};

const choiceSubmit = (event) => {
    const choice = $(event.currentTarget)[0];
    const thisQuestion = question[questionPosition];
    const correct = (choice.dataset.choice == thisQuestion.answer);
    $(choice).addClass('border border-5');

    //Add background based on answer correctness 
    $(choice).addClass((correct) ? 'border-info bg-success' : 'border-danger bg-warning')
    if(!correct) {
        wrongAnswers++
        adjustScore(-5 * (questionPosition + 1)); //get rekt 
        const multiChoice = (thisQuestion.type == questionType.multiChoice);
        const selectorString = (multiChoice ? '#multiChoice' : '#binaryChoice ') + ' div.answerCard';
        const choiceOptions = $(selectorString);
        //Highlight correct answer
        for (let i = 0; i < choiceOptions.length; i++) {
            const element = choiceOptions[i];
            if(element.dataset.choice == thisQuestion.answer){
                $(element).addClass('bg-success');
            }
        }
    } else {
        correctAnswers++
        adjustScore((questionPosition + 1));
    }
    if(questionPosition < (question.length - 1))
    {
        setTimeout(() => { 
            $('.answerCard').removeClass().addClass('card answerCard');
            questionPosition++;
            if(scoreCard.timer > 0)
                displayQuestion();
            else end();
        }, 500);
    } else end();
};

//function to speed up testing
/* USING THIS IS CHEATING AND WILL BE REFLECTED IN YOUR SCORE CARD*/
const devSkip = () => {
    playerName.val('Cheater Cheater, the eater of Pumpkins');
    start();
    correctAnswers = question.length;
    wrongAnswers = 0;
    for (questionPosition = 0; questionPosition < question.length; questionPosition++) {
        setTimeout(adjustScore((questionPosition + 1)), 500);
    }
    setTimeout(end(), 2100);
    return '[DEV] > Cheater. You cheated. I know you cheated because I made this. ';
};

//On document ready, assign click methods and generate high scores if necessary
$(document).ready(() => {
    $('#StartQuiz').click(start)
    $('.answerCard').click(choiceSubmit);
    $('#highScoreLink').click(()=>{
        populateHighScores();
        $('#complete').removeClass('d-none').addClass('d-grid'); // show high scores section
    });
    currentHighScores = JSON.parse(localStorage.getItem('High Scores'));
    if(currentHighScores == undefined || currentHighScores == null ) generateHighScores();
});

/*

    Question Object Templates

    {
        question: '',
        type: questionType.binary,
        answer: binaryChoice.<choice>,
        binaryChoice: {
            True, 
            False
        }
    },
    {
        question: '',
        type: questionType.multiChoice,
        answer: multiChoice.<choice>,
        multiChoice: {
            A: '',
            B: '',
            C: '',
            D: ';'
        }
    },

*/