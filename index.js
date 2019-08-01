

(function(){

    "use strict";

    const container = document.querySelector('.container');
    const coords = container.getBoundingClientRect();

    const shapes = ['square','rect','triangle','circle'];
    const directions = ['up','down','left','right'];
    const sizes = ['small','medium','large'];
    const animations = ['spin','backspin'];

    const numOfItems = 50;
    let isAnimated = true;
    let moveInterval;


    const rand = (max,min=0) => { //min max inclusive;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const randColor = () => `rgb(${rand(255,105)},${rand(255,105)},${rand(255,105)})`;

    const getShape = (el) => {
        for( let i=0;i<shapes.length; i++) {
            const shape = shapes[i];
            if (el.classList.contains(shape)) {
                return shape;
            }         
        }
    };

    const getDir = (el) => {
        for( let i=0;i<directions.length; i++) {
            const dir = directions[i];
            if (el.classList.contains(dir)) {
                return dir;
            }         
        }
    };

    const getSize = (el) => {
        for( let i=0;i<sizes.length; i++) {
            const size = sizes[i];
            if (el.classList.contains(size)) {
                return size;
            }         
        }
    };

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
      
    const move = (el) => {

        let shape = getShape(el);
        //el.classList.remove(shape);
        //shape = shapes[rand(shapes.length)];
        //el.classList.add(shape);
        let dir = getDir(el);
        // el.classList.remove(dir);
        // dir = directions[rand(directions.length)];
        // el.classList.add(dir);
        let origsize = getSize(el);
        
        const size = sizes[rand(sizes.length)];
        el.classList.remove(origsize);
        el.classList.add(size);

        el.style.left = `${rand(coords.width)}px`;
        el.style.top = `${rand(coords.height)}px`;
        const animation = `${animations[rand(2)]}`
        const ms = rand(5000,1000);
        el.style.animationDuration = `${ms}ms`;
        el.style.animationName = animation;

        setColor(el,shape,dir);
    };

    const setColor =(elem,shape,dir) => {
        const color = randColor();
        // elem.style.backgroundColor = 'transparent';
        // elem.style.borderBottomColor = 'transparent';
        // elem.style.borderTopColor = 'transparent';
        // elem.style.borderLeftColor = 'transparent';
        // elem.style.borderRightColor = 'transparent';
        
        if (shape !== 'triangle') {
            elem.style.backgroundColor = color;
            // elem.style.borderBottomColor = 'transparent';
            // elem.style.borderTopColor = 'transparent';
            // elem.style.borderLeftColor = 'transparent';
            // elem.style.borderRightColor = 'transparent';
        } else {
            // elem.style.backgroundColor = 'transparent';
            switch(dir){
                case 'up':
                    elem.style.borderBottomColor = color;
                    break;
                case 'down':
                    elem.style.borderTopColor = color;
                    break;
                case 'left':
                    elem.style.borderRightColor = color;
                    break;
                case 'right':
                    elem.style.borderLeftColor = color;
                    break;                                              
            }
        }
    }
    

    const el = ()=> {
        const elem = document.createElement('div');
        const shape = shapes[rand(shapes.length)];
        const dir = directions[rand(directions.length)];

        const animation = `${animations[rand(2)]}`
        elem.classList.add('item');
        elem.classList.add(shape);
        elem.classList.add(sizes[rand(sizes.length)]);
        elem.classList.add(dir);
        elem.classList.add(`z${rand(10)}`);
        elem.style.left = `${rand(coords.width)}px`;
        elem.style.top = `${rand(coords.height)}px`;
        //elem.style.animationName = animation;
        //elem.style.animationDuration =`${rand(5000,1000)}ms`;
        setColor(elem,shape,dir);
        container.append(elem);
    };
    
    const startMove = () => {
        moveInterval = setTimeout ( ()=>{
            const els = Array.from(document.querySelectorAll('.item'));
            const updated = shuffle(els);
            const itemsToMove = rand(updated.length,20);
            updated.length = itemsToMove;
            updated.forEach( el => move(el));
            clearTimeout(moveInterval);
            startMove()
       },rand(2000,500));
    };



    document.addEventListener('DOMContentLoaded', ()=>{


        for(let i=0;i <= numOfItems;i++) {
            el();
        }

        container.addEventListener('click', (e)=>{
            const el = e.target;
            const con = e.currentTarget;
            if (el !== con ) {
                move(el);
            }
            isAnimated=!isAnimated;
            if (isAnimated) {
                startMove();
            } else {
                clearInterval(moveInterval);
            }
        });
        container.addEventListener('mouseover',(e) =>{
            const el = e.target;
            const con = e.currentTarget;
            if (el !== con ) {
                move(el);
            }
        });


        startMove();

    });

})();