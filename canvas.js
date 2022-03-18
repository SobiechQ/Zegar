let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let c = canvas.getContext('2d');
//automatyczna zmiana wielkości canvas 




function degX(rad){
    rad *= Math.PI;
    let x = Math.cos(rad);
    return x*30
}

function degY(rad){
    rad *= Math.PI;
    let y = Math.sin(rad);
    return y*30
}

class Zegar {
    constructor(x,y){
        this.centerX = x;
        this.centerY = y;
        this.raduis = 30;
        this.i1 = 2.5*Math.random();
        this.i2 = 2.5*Math.random();
        this.i1State = true;
        this.i2State = true;
    }
    setPos(i1,i2){
        //wybieram pozycje strzałek
        this.i1Pos = i1;
        this.i2Pos = i2;
    }
    //zmiana koordynatów zegara dla resize ekranu
    changeCords(x,y){
        this.centerX = x;
        this.centerY = y;
    }
  
    reset(){
        this.i1State = true;
        this.i2State = true;
    }
    draw(){
        
        // console.log("X:"+degX(this.i1)+" Y:"+degY(this.i1));

        // sprawdzanie pozycji strzałki nr1
        if(degX(this.i1) >= -0.5 && degX(this.i1) <= 0.5){
            if(degY(this.i1) >= -30 && degY(this.i1) <= -28){
                //góra
                if(this.i1Pos == 1){
                    this.i1State = false;
                    this.i1 = 1.5;
                }
                
            }
            if(degY(this.i1) >= 28 && degY(this.i1) <= 30){
                //dół
                if(this.i1Pos == 3){
                    this.i1State = false;
                    this.i1 = 0.5;
                }
            }
        }
        if(degY(this.i1) >= -0.5 && degY(this.i1) <= 0.5){
            if(degX(this.i1) >= -30 && degX(this.i1) <= -28){
                //lewo
                if(this.i1Pos == 4){
                    this.i1State = false;
                    this.i1 = 1;
                }
            }
            if(degX(this.i1) >= 28 && degX(this.i1) <= 30){
                //prawo
                if(this.i1Pos == 2){
                    this.i1State = false;
                    this.i1 = 2;
                }
            }
        }

        if((degX(this.i1) >= -21 && degX(this.i1) <= -20) || this.i1 == 0.75){
            if(degY(this.i1) >= 19 && degY(this.i1) <= 23 || this.i1 == 0.75){
               
                //Strzałka skośna
                if(this.i1Pos == 5){
                    this.i1State = false;
                    this.i1 = 0.75;
                  
                }
            }
        }
        c.strokeStyle = `#FFFFFF`;
        //rysowanie okręgu
        c.lineWidth = 0.7;
        c.beginPath();
        c.arc(this.centerX,this.centerY,this.raduis,0,2*Math.PI,0);
        c.stroke();
        c.lineWidth = 1.6;
        
        //rysowanie strzałki nr1
        if(this.i1State){
    
            this.i1 += 0.005;
        }
       
        // sprawdzanie pozycji strzałki nr2
        if(degX(this.i2) >= -0.5 && degX(this.i2) <= 0.5){
            if(degY(this.i2) >= -30 && degY(this.i2) <= -28){
                //góra
                if(this.i2Pos == 1){
                    this.i2State = false;
                    this.i2 = 1.5;
                }
            }
            if(degY(this.i2) >= 28 && degY(this.i2) <= 30){
                //dół
                if(this.i2Pos == 3){
                    this.i2State = false;
                    this.i2 = 0.5;
                }
            }
        }
        if(degY(this.i2) >= -0.5 && degY(this.i2) <= 0.5){
            if(degX(this.i2) >= -30 && degX(this.i2) <= -28){
                //prawo
                if(this.i2Pos == 2){
                    this.i2State = false;
                    this.i2 = 1;
                }
            }
            if(degX(this.i2) >= 28 && degX(this.i2) <= 30){
                //lewo
                if(this.i2Pos == 4){
                    this.i2State = false;
                    this.i2 = 2;
                }
            }
        }
        if(-degX(this.i2) >= -21 && -degX(this.i2) <= -20){
            if(degY(this.i2) >= 19 && degY(this.i2) <= 23){
                //Strzałka skośna
                if(this.i2Pos == 5){
                    this.i2State = false;
                    this.i2 = 0.25;
                }
            }
        }
         
        
        c.beginPath();
        c.moveTo(this.centerX,this.centerY);
        c.lineTo(this.centerX+degX(this.i1),this.centerY+degY(this.i1));
        c.stroke();


        //rysowanie strzałki nr2
        if(this.i2State){
            this.i2 += 0.002;
        }
        
        c.beginPath();
        c.moveTo(this.centerX,this.centerY);
        c.lineTo(this.centerX-degX(this.i2),this.centerY+degY(this.i2));
        c.stroke();

    }
   
    
}

//tworze kolejne zegary na ekranie
let zegar = [];
let tempX = (window.innerWidth-420)/2;
let tempY = (window.innerHeight-660)/2;
// 12 rzedów
for (let i=0; i< 12; i++){
    //8 kolumn
    for(let i=0; i<8; i++){
        zegar.push(new Zegar(tempX,tempY));
        tempX += 60;
    }
    tempX = (window.innerWidth-420)/2;
    tempY += 60;
}

//pozycje dla cyfr
/*
Budowa Array Number:
number[x][y][z]
x - dla jakiej liczby
y - który z koleji zegar
z - dla strzałki 1 albo 2
*/
let number = [];
number[0]=[
    [3,2],[4,2],[4,2],[4,3],
    [1,3],[3,2],[4,3],[1,3],
    [1,3],[1,3],[1,3],[1,3],
    [1,3],[1,3],[1,3],[1,3],
    [1,3],[1,2],[4,1],[1,3],
    [1,2],[4,2],[4,2],[4,1]];
number[1]=[
    [3,2],[4,2],[4,3],[5,5],
    [1,2],[4,3],[1,3],[5,5],
    [5,5],[1,3],[1,3],[5,5],
    [5,5],[1,3],[1,3],[5,5],
    [3,2],[4,1],[1,2],[4,3],
    [1,2],[4,2],[4,2],[4,1]];
number[2]=[
    [3,2],[4,2],[4,2],[4,3],
    [1,2],[4,2],[4,3],[1,3],
    [2,3],[4,2],[1,4],[1,3],
    [1,3],[2,3],[4,2],[1,4],
    [1,3],[1,2],[4,2],[4,3],
    [1,2],[4,2],[4,2],[4,1]];
number[3]=[
    [3,2],[4,2],[4,2],[4,3],
    [1,2],[4,2],[4,3],[1,3],
    [3,2],[4,2],[4,1],[1,3],
    [1,2],[4,2],[4,3],[1,3],
    [2,3],[4,2],[4,1],[1,3],
    [1,2],[4,2],[4,2],[4,1]];
number[4]=[
    [3,2],[4,3],[5,5],[5,5],
    [1,3],[3,1],[3,2],[4,3],
    [1,3],[1,2],[4,1],[1,3],
    [1,2],[4,2],[4,3],[1,3],
    [5,5],[5,5],[3,1],[1,3],
    [5,5],[5,5],[1,2],[4,1]];
number[5]=[
    [3,2],[4,2],[4,2],[4,3],
    [1,3],[3,2],[4,2],[1,4],
    [1,3],[1,2],[4,2],[4,3],
    [1,2],[4,2],[4,3],[1,3],
    [2,3],[4,2],[4,1],[1,3],
    [1,2],[4,2],[4,2],[4,1]];
number[6]=[
    [3,2],[4,2],[4,2],[4,3],
    [1,3],[3,2],[4,2],[1,4],
    [1,3],[1,2],[4,2],[4,3],
    [1,3],[3,2],[4,3],[1,3],
    [1,3],[1,2],[4,1],[1,3],
    [1,2],[4,2],[4,2],[4,1]];
number[7]=[
    [3,2],[4,2],[4,2],[4,3],
    [1,2],[4,2],[4,3],[1,3],
    [5,5],[5,5],[1,3],[1,3],
    [5,5],[5,5],[1,3],[1,3],
    [5,5],[5,5],[1,3],[1,3],
    [5,5],[5,5],[1,2],[4,1]];
number[8]=[
    [3,2],[4,2],[4,2],[4,3],
    [1,3],[3,2],[4,3],[1,3],
    [1,3],[1,2],[4,1],[1,3],
    [1,3],[2,3],[4,3],[1,3],
    [1,3],[1,2],[4,1],[1,3],
    [1,2],[4,2],[4,2],[4,1]];
number[9]=[
    [3,2],[4,2],[4,2],[4,3],
    [1,3],[3,2],[4,3],[1,3],
    [1,3],[1,2],[4,1],[1,3],
    [1,2],[2,4],[4,3],[1,3],
    [2,3],[4,2],[4,1],[1,3],
    [1,2],[4,2],[4,2],[4,1]];

//Generowanie tablicy na bazie godziny
const d = new Date();
let hour = d.getHours();
let min = d.getMinutes();
hour = hour.toString();
min = min.toString();
if(hour.length == 1){
    hour="0"+hour;
}
if(min.length == 1){
    min="0"+min;
}
hour = hour.split('');
min = min.split('');
let godzina = hour.concat(min);
// godzina = [4,4,4,4];



//Generowanie kolenych klatek
function animate() {

   requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    zegar.forEach(i => {
        i.draw();
    });

    //odświeżanie godziny
    let d = new Date();
    hour = d.getHours();
    min = d.getMinutes();
    hour = hour.toString();
    min = min.toString();
    if(hour.length == 1){
        hour="0"+hour;
    }
    if(min.length == 1){
        min="0"+min;
    }
    hour = hour.split('');
    min = min.split('');
    let godzina = hour.concat(min);
    // console.log(godzina);
    //odświeżanie zegara na nową godzinę
    


        //ustawianie dla segmentu nr 1
    let k = 0;
    let iArr = 0;
    for(let i=0; i<=5; i++){
        for(let i=0; i<=3; i++){
            zegar[k].setPos(number[godzina[0]][iArr][0],number[godzina[0]][iArr][1]);
            iArr++;
            k++;
        }
        k+=4;
    }

    //ustawienie dla segmentu 2
    k=0
    iArr=0;
    for(let i=0; i<=5; i++){
        k+=4;
        for(let i=0; i<=3; i++){
            zegar[k].setPos(number[godzina[1]][iArr][0],number[godzina[1]][iArr][1]);
            iArr++;
            k++;
        }
    }

    //ustawianie dla segmentu nr 3
    k = 48;
    iArr = 0;
    for(let i=0; i<=5; i++){
        for(let i=0; i<=3; i++){
            zegar[k].setPos(number[godzina[2]][iArr][0],number[godzina[2]][iArr][1]);
            iArr++;
            k++;
        }
        k+=4;
    }

    //ustawianie dla segmentu nr 4
    k=48
    iArr=0;
    for(let i=0; i<=5; i++){
        k+=4;
        for(let i=0; i<=3; i++){
            zegar[k].setPos(number[godzina[3]][iArr][0],number[godzina[3]][iArr][1]);
            iArr++;
            k++;
        }
    }
    zegar.forEach(i => {
        i.reset();
    });




}
animate();
// console.log(zegar[0])


//resize i zmiana kordów przy resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    tempX = (window.innerWidth-420)/2;
    tempY = (window.innerHeight-660)/2;
    let tempI = 0;
    // 12 rzedów
    for (let i=0; i< 12; i++){
    //8 kolumn
    for(let i=0; i<8; i++){
        zegar[tempI].changeCords(tempX,tempY);
        tempX += 60;
        tempI++;
    }
    tempX = (window.innerWidth-420)/2;
    tempY += 60;
}
  })

 