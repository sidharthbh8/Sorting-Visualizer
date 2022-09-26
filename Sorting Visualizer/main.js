const slider = document.querySelector('.slider');
const output = document.querySelector('#output');

slider.oninput = () => {
    output.innerHTML = `Array Length: ${slider.value}`;
}

let totBar = [];
let barHeight = [];
const lines = document.querySelector('.lines');

let randomNum = () => {
    return Math.floor(Math.random() * 21) * 19 + 20;
}

let newArray = (val) => {
    lines.innerHTML = "";
    for (let i = 0; i < val; i++) {
        totBar[i] = document.createElement('div');
        totBar[i].className = 'tab';

        let ranNum = randomNum()
        totBar[i].style.height = `${ranNum}px`;
        barHeight[i] = ranNum;
        lines.appendChild(totBar[i])
    }
}

slider.addEventListener('click', function (e) {
    let sliderVal = slider.value;
    newArray(sliderVal);
});

const bubble = document.querySelector('.bubble');
bubble.addEventListener('click', () => {
    bubbleSort();
});

const selection = document.querySelector('.selection');
selection.addEventListener('click', () => {
    selectionSort();
});

const insertion = document.querySelector('.insertion');
insertion.addEventListener('click', () => {
    insertionSort();
})

const quick = document.querySelector('.quick');
quick.addEventListener('click', () => {
    let sliderVal = parseInt(slider.value);
    quickSort( 0, sliderVal - 1);
    for(let i = 0; i < sliderVal; i++ )
    {
        animat(totBar[i],YELLOW);
    }
    console.log(barHeight);
})

//RESET ARRAY
const resArr = document.querySelector('.reset');
resArr.addEventListener('click', () => {
    lines.innerHTML = '';
    location.reload();
});

//colors
const RED = '#e6153e';
const BLUE = '#ad17db';
const YELLOW = '#ffc107'
const DEFAULTCOLOR = '#adff2f';

//***********************<SORTING ALGO>*********************************//

const bubbleSort = () => {
    disable();

    let sliderVal = slider.value;
    for (let i = 0; i < sliderVal - 1; i++) {
        for (let j = 0; j < sliderVal - i - 1; j++) {
            animate(totBar[j], barHeight[j], RED);
            animate(totBar[j + 1], barHeight[j + 1], BLUE);
            if (barHeight[j] > barHeight[j + 1]) {
                let temp = barHeight[j];
                barHeight[j] = barHeight[j + 1];
                barHeight[j + 1] = temp;
                animate(totBar[j], barHeight[j], RED);
                animate(totBar[j + 1], barHeight[j + 1], BLUE);
            }
            animate(totBar[j], barHeight[j], DEFAULTCOLOR);
            animate(totBar[j + 1], barHeight[j + 1], DEFAULTCOLOR);
        }
    }
}

const selectionSort = () => {
    disable();

    let sliderVal = slider.value;
    let k
    for (let i = 0; i < sliderVal - 1; i++) {
        for (let j = k = i; j < sliderVal; j++) {
            animat(totBar[i], YELLOW)
            animat(totBar[k], RED)
            animat(totBar[j], BLUE);
            animat(totBar[j - 1], DEFAULTCOLOR)
            if (barHeight[j] < barHeight[k]) {
                animat(totBar[k], DEFAULTCOLOR)
                k = j;
                animat(totBar[k], RED)
                animat(totBar[j], DEFAULTCOLOR)
            }
        }
        animat(totBar[sliderVal - 1], DEFAULTCOLOR)
        let temp = barHeight[i];
        barHeight[i] = barHeight[k];
        barHeight[k] = temp;
        animate(totBar[i], barHeight[i], DEFAULTCOLOR)
        animate(totBar[k], barHeight[k], DEFAULTCOLOR)
    }
}

const insertionSort = () => {
    disable();

    let sliderVal = slider.value;
    animat(totBar[0], YELLOW);
    for(let i = 1; i < sliderVal; i++)
    {
        let j=i-1;
        let x = barHeight[i];
        animat(totBar[i], RED);
        while(i>-1 && x < barHeight[j])
        {
            barHeight[j+1] = barHeight[j];
            animat(totBar[j+1],  RED);
            animate(totBar[j+1], barHeight[j+1], YELLOW)
            j--;
        }
        barHeight[j+1] = x;
        animate(totBar[j+1], barHeight[j+1], YELLOW)
        animat(totBar[i], YELLOW);
    }
}

let quickSort = ( l, h) => {
    disable();

    if (l > h) {
        return
      }
        let pivot = barHeight[l];
        animate(totBar[l],pivot, '#fff')
        let i = l;
        let j = h + 1;
        do{
            do{
                i++
                animate(totBar[i],barHeight[i],RED);
                animate(totBar[i],barHeight[i],DEFAULTCOLOR)
            }while(barHeight[i] <= pivot);
            animate(totBar[i],barHeight[i],RED);
            do{
                j--;
                animate(totBar[j],barHeight[j],BLUE);
                animate(totBar[j],barHeight[j],DEFAULTCOLOR)
            }while(barHeight[j] > pivot);
            animate(totBar[i],barHeight[i], BLUE);
            if(i<j)
            {
                let temp = barHeight[i];
                barHeight[i] = barHeight[j];
                barHeight[j] = temp;
                animate(totBar[i],barHeight[i],BLUE);
                animate(totBar[j],barHeight[j],RED);
            }
            animate(totBar[i],barHeight[i],DEFAULTCOLOR);
            animate(totBar[j],barHeight[j],DEFAULTCOLOR);
        }while(i<j);
        let temp = barHeight[l];
        barHeight[l] = barHeight[j];
        barHeight[j] = temp;
        animate(totBar[l],barHeight[l],DEFAULTCOLOR);
        animate(totBar[j],barHeight[j],YELLOW);
        quickSort(l, j - 1);
        quickSort(j + 1, h);
}

let c = 0
let speed = 500
let delay = 10000 / (Math.floor(slider.value / 10) * speed);
let animate = (bar, higt, color) => {
    setTimeout(() => {
        bar.style.backgroundColor = color;
        bar.style.height = `${higt}px`;
        console.log('run');
    }, (c += delay + 200))
}
let animat = (bar, color) => {
    setTimeout(() => {
        bar.style.backgroundColor = color;
        console.log('run');
    }, (c += delay + 100))
} 

const disable = () => {
    bubble.disabled = true;
    selection.disabled = true;
    insertion.disabled = true;
    quick.disabled = true;
    slider.disabled = true;
}

//Souce Code PopUp
const popUp = document.querySelector('.popup');
const source = document.querySelector('.source-code');
source.addEventListener('mouseover', () => {
    popUp.classList.add('visible');
})
source.addEventListener('mouseout', () => {
    popUp.classList.remove('visible');
})