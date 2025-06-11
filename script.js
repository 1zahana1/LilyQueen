const gongImages = [
  { name: "대통령공", src: "img/president.jpg" },
  { name: "수녀공", src: "img/nun.jpg" },
  { name: "아이돌공", src: "img/idol.jpg" },
  { name: "킬러공", src: "img/killer.jpg" },
  { name: "선생님공", src: "img/teacher.jpg" },
  { name: "마법소녀공", src: "img/maho.jpg" },
  { name: "천사공", src: "img/angel.jpg" },
  { name: "악마공", src: "img/devil.jpg" },
  { name: "재벌공", src: "img/rich.jpg" },
  { name: "외계인공", src: "img/alien.jpg" },
  { name: "과학자공", src: "img/scientist.jpg" },
  { name: "조폭공", src: "img/gang.jpg" }
];


const sooImages = [
  { name: "대통령수", src: "img/president.jpg" },
  { name: "수녀수", src: "img/nun.jpg" },
  { name: "아이돌수", src: "img/idol.jpg" },
  { name: "킬러수", src: "img/killer.jpg" },
  { name: "선생님수", src: "img/teacher.jpg" },
  { name: "마법소녀수", src: "img/maho.jpg" },
  { name: "천사수", src: "img/angel.jpg" },
  { name: "악마수", src: "img/devil.jpg" },
  { name: "재벌수", src: "img/rich.jpg" },
  { name: "외계인수", src: "img/alien.jpg" },
  { name: "과학자수", src: "img/scientist.jpg" },
  { name: "조폭수", src: "img/gang.jpg" }
];

function setupDrawCard(cardSelector, images) {
    document.querySelector(cardSelector).addEventListener("click", function() {
        const randomIndex = Math.floor(Math.random() * images.length);
        const selected = images[randomIndex];

        document.querySelector(cardSelector + " .draw-image img").src = selected.src;
        document.querySelector(cardSelector + " .draw-label h3").textContent = selected.name;
    });
}

setupDrawCard(".gong-card", gongImages);
setupDrawCard(".soo-card", sooImages);


let timerInterval = null;
let timeLeft = 60;
let isTimerRunning = false;

function formatTime(seconds) {
    let min = Math.floor(seconds/60);
    let sec = seconds % 60;
    sec = sec < 10 ? "0" + sec : sec;
    return `${min}:${sec}`;
}

document.querySelector(".timer-box").addEventListener("click", function(){
    if (!isTimerRunning) {
        timeLeft = 60;
        document.querySelector(".timer-num h4").textContent = formatTime(timeLeft);
        timerInterval = setInterval(function(){
            timeLeft--;
            document.querySelector(".timer-num h4").textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeLeft = 0;
        document.querySelector(".timer-num h4").textContent = formatTime(timeLeft);
        let sound = new Audio('sound/timeOver.mp3');
        sound.play()
    }
        }, 1000);

        isTimerRunning = true;
    

    }    else{
        clearInterval(timerInterval);
        timeLeft = 60;
        document.querySelector(".timer-num h4").textContent = formatTime(timeLeft);
        isTimerRunning = false;
    }
});

document.querySelectorAll(".user-name h3").forEach(function(nameElement){
    nameElement.addEventListener("click", function(){
        let newName = prompt("새 이름을 입력하세요!", )
        if (newName !== null && newName.trim() !==""){
            this.textContent = newName;
        }
    });
});

document.querySelectorAll(".user-score h4").forEach(function(scoreElement) {
    let pressTimer;

    scoreElement.addEventListener("click", function() {
        let currentScore = parseInt(this.textContent);
        this.textContent = (currentScore + 1) + "점";
    });

    scoreElement.addEventListener("touchstart", function() {
        pressTimer = setTimeout(() => {
            let currentScore = parseInt(this.textContent);
            this.textContent = Math.max(0, currentScore - 1) + "점";
            pressTimer = null;
        }, 600);
    });

    scoreElement.addEventListener("touchend", function() {
        clearTimeout(pressTimer);
        pressTimer = null;
    });

    scoreElement.addEventListener("touchcancel", function() {
        clearTimeout(pressTimer);
        pressTimer = null;
    });
});

document.querySelector(".next").addEventListener("click", function(){
    resetCards();
    resetTimer();
})

function resetCards() {
    document.querySelector(".gong-card .draw-image img").src = "img/placeholder.jpg";
    document.querySelector(".gong-card .draw-label h3").textContent = "공 뽑기";

    document.querySelector(".soo-card .draw-image img").src = "img/placeholder.jpg";
    document.querySelector(".soo-card .draw-label h3").textContent = "수 뽑기";
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    document.querySelector(".timer-num h4").textContent = formatTime(timeLeft);
    isTimerRunning = false;
}

function getWinnerName() {
    let maxScore = -1;          // 최고 점수 변수 → 처음엔 -1로 시작
    let winnerName = "";        // 최고 점수 가진 사람 이름 → 처음엔 빈 문자열

    // 모든 유저 박스 반복 → .user-box 중에서 .user-add(+)는 제외
    document.querySelectorAll(".user-box:not(.user-add)").forEach(function(userBox) {
        // 이름 읽기
        let name = userBox.querySelector(".user-name h3").textContent;

        // 점수 읽기 → "0점" → 숫자만 뽑기
        let scoreText = userBox.querySelector(".user-score h4").textContent;
        let score = parseInt(scoreText);  // "3점" → 3

        // 최고 점수인지 확인
        if (score > maxScore) {
            maxScore = score;     // 최고 점수 갱신
            winnerName = name;    // 최고 점수 가진 사람 이름 갱신
        }
    });

    return winnerName; // 최종적으로 winnerName 반환
}
document.querySelector("#game-end").addEventListener("click", function() {
    let winnerName = getWinnerName(); // 최고 점수 유저 이름 구하기

    // URL로 넘어가기 (encodeURIComponent로 안전하게 변환 → 한글 깨짐 방지)
    window.location.href = `queen.html?winner=${encodeURIComponent(winnerName)}`;
});

