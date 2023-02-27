let score = document.getElementById("score")
let start = document.querySelector(".hide")
let gameArea = document.querySelector(".gameArea")
let car = document.createElement("div")
let main = document.querySelectorAll("main")




let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
}
let player = {
    ready:false,
    speed : 5,
    score:0
}

const updateDiv=()=>{
location.reload();
        
}

const isCollide=(a,b)=>{

    let aRect = a.getBoundingClientRect()
    let bRect = b.getBoundingClientRect()

    return !((aRect.top > bRect.bottom || aRect.bottom < bRect.top || aRect.left > bRect.right || aRect.right < bRect.left))

}


const moveLines = ()=>{
    let roadLines = document.querySelectorAll(".lines")

    roadLines.forEach(function(line){

   if (line.y >= 1000) {
       line.y -= 1050
   }
   
   line.y  += player.speed
   
   line.style.top = line.y + "px"
   
   
   })
   
   
   }

const endGame=()=>{
    player.ready = false
    start.style.display = "block"
    start.innerHTML = `Game Over <br /> Your Score is ${player.score} <br /> Press Here To Restart`
start.addEventListener("click",updateDiv)
}


   const moveEnemy = ()=>{
    let enemies = document.querySelectorAll(".enemy")

    enemies.forEach(function(enemy){
      
        if (isCollide(car,enemy)) {
            console.log("boom")
            endGame()
        }

   if (enemy.y >= 1000) {
       enemy.y = -300

 enemy.style.left = Math.floor(Math.random() * 350) + "px"

   }
   enemy.y  += player.speed   
   enemy.style.top = enemy.y + "px"
   
   
   })
   
   
   }


   

const playGame=()=>{

    let road = gameArea.getBoundingClientRect();


    
    if (player.ready) {
        score.style.display = "inline"

        moveLines()
        moveEnemy()
        
if (keys.ArrowUp && player.y > road.top + 70) {
    player.y -= player.speed 
}if (keys.ArrowDown && player.y < road.bottom - 100) {
    player.y += player.speed 
}if (keys.ArrowLeft && player.x > 0) {
    player.x -= player.speed 
}if (keys.ArrowRight && player.x < road.width - 50) {
    player.x += player.speed 
}
car.style.top = player.y + "px"
car.style.left = player.x + "px"
        window.requestAnimationFrame(playGame);
        player.score++
        score.innerText = `Score:  ${player.score - 1}`
    }
}



const startGame=()=>{
    start.style.display = "none"
        gameArea.style.visibility = "visible"
      window.requestAnimationFrame(playGame);
    player.ready = true
    
}





const keyDown = (e) => {
    e.preventDefault()
    keys[e.key] = true

}


const keyUp = (e) => {
    e.preventDefault()
    keys[e.key] = false

}


car.setAttribute("class","car");

gameArea.appendChild(car)


for (let i = 0; i <7 ; i++) {
   let roadLine = document.createElement("div")
roadLine.setAttribute("class","lines");
roadLine.y = (i*150);
roadLine.style.top = roadLine.y + "px"
gameArea.appendChild(roadLine)
    
}




for (let i = 0; i <3 ; i++) {
    let enemy = document.createElement("div")
 enemy.setAttribute("class","enemy");
 enemy.y = ((i*1) * 350) -1;
 enemy.style.top = enemy.y + "px"
 enemy.style.left = Math.floor(Math.random() * 350) + "px"
 gameArea.appendChild(enemy)
     
 }

document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)
start.addEventListener("click",startGame)



player.y = car.offsetTop
player.x = car.offsetLeft