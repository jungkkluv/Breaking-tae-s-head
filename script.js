const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const winMessage = document.querySelector('.win-message');
let score = 0;

restartBtn.addEventListener('click', restartGame);

function randomHead() {
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    const head = document.createElement('div');
    head.classList.add('head', Math.random() > 0.5 ? 'boy' : 'girl'); // نوع الرأس

    randomHole.appendChild(head);

    // جعل الرأس يظهر للأعلى
    setTimeout(() => {
        head.style.bottom = '10px'; // يظهر الرأس فوق الفتحة
    }, 100);

    // إذا لم يضرب الرأس، قم بإنقاص النقاط وإخفاء الرأس
    setTimeout(() => {
        if (!head.classList.contains('hit')) {
            score -= 5;
            scoreDisplay.textContent = score;
        }
        head.style.bottom = '-80px'; // اختفاء الرأس
        setTimeout(() => head.remove(), 500); // إزالة الرأس من DOM بعد اختفائه
    }, 1500);
}

function handleClick(e) {
    if (e.target.classList.contains('head')) {
        e.target.classList.add('hit'); // تطبيق صورة الرأس المتورم
        setTimeout(() => {
            e.target.remove(); // إزالة الرأس
        }, 200);
        score += 20; // إضافة النقاط
        scoreDisplay.textContent = score;
        checkWin(); // التحقق من الفوز
    }
}

function checkWin() {
    if (score >= 100) {
        winMessage.textContent = "بحبك يا امونتي 💋";
        winMessage.style.display = "block";
        restartBtn.style.display = "inline-block";
        clearInterval(gameInterval); // توقف اللعبة
    }
}

function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    winMessage.style.display = "none";
    restartBtn.style.display = "none";
    gameInterval = setInterval(randomHead, 1000); // إعادة بدء اللعبة
}

// إضافة الحدث على الفتحات لتحديد مكان النقر
holes.forEach((hole) => {
    hole.addEventListener('click', handleClick);
});

let gameInterval = setInterval(randomHead, 1000); // بداية اللعبة بظهور الرؤوس
