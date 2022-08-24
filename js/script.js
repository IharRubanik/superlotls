document.addEventListener("DOMContentLoaded", function() {

  // scroll
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener("click", function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  let circlBackground = document.querySelector(".circl-background");
  let circl2 = document.querySelector(".top");
  let circl1 = document.querySelector(".active");
  let circl3 = document.querySelector(".left");
  let sliderText1 = document.querySelector(".slider-text1");
  let sliderText2 = document.querySelector(".slider-text2");
  let sliderText3 = document.querySelector(".slider-text3");
  let rotate = 0;

  circl2.onclick = function () {
    sliderText2.classList.add("active");
    sliderText1.classList.remove("active");
    sliderText3.classList.remove("active");
    if (this.classList.contains("top")) {
      rotatePlus();
      this.classList.replace("top", "active");
      circl1.classList.replace("active", "left");
      circl3.classList.replace("left", "top");
    } else if (this.classList.contains("left")) {
      rotateMinus();
      this.classList.replace("left", "active");
      circl3.classList.replace("active", "top");
      circl1.classList.replace("top", "left");
    }
  };
  circl1.onclick = function () {
    sliderText1.classList.add("active");
    sliderText2.classList.remove("active");
    sliderText3.classList.remove("active");
    if (this.classList.contains("left")) {
      rotateMinus();
      this.classList.replace("left", "active");
      circl2.classList.replace("active", "top");
      circl3.classList.replace("top", "left");
    } else if (this.classList.contains("top")) {
      rotatePlus();
      this.classList.replace("top", "active");
      circl2.classList.replace("left", "top");
      circl3.classList.replace("active", "left");
    }
  };
  circl3.onclick = function () {
    sliderText3.classList.add("active");
    sliderText2.classList.remove("active");
    sliderText1.classList.remove("active");
    if (this.classList.contains("left")) {
      rotateMinus();
      this.classList.replace("left", "active");
      circl2.classList.replace("top", "left");
      circl1.classList.replace("active", "top");
    } else if (this.classList.contains("top")) {
      rotatePlus();
      this.classList.replace("top", "active");
      circl2.classList.replace("active", "left");
      circl1.classList.replace("left", "top");
    }
  };

  function rotatePlus() {
    rotate = rotate + 120;
    circlBackground.style.transform = `rotate(${rotate}deg)`;
  }
  function rotateMinus() {
    rotate = rotate - 120;
    circlBackground.style.transform = `rotate(${rotate}deg)`;
  }

  // slider
  let slides = document.querySelectorAll(".slide");
  let buttonNext = document.querySelector(".button-next");
  let buttonPrev = document.querySelector(".button-prev");

  function nextSlide() {
    buttonPrev.classList.remove('active')
    for (let i = 0; i < slides.length; i++) {
      if(i == slides.length - 2){
        buttonNext.classList.add('active')
      }
      if (
        slides[i].classList.contains("active") &&
        slides[i].nextElementSibling
      ) {
        slides[i + 1].classList.replace("centr", "active");
        slides[i].classList.replace("active", "none");
        
        if (slides[i + 2]) {
          slides[i + 2].classList.replace("left", "centr");
      
        }
        if (slides[i + 3]) {
          slides[i + 3].classList.add("left");
          slides[i + 3].classList.remove("none-reverce");
          
        }
        if (slides[i - 1]) {
          slides[i - 1].classList.remove("centr");
          
        }
        break;
      }
    }
  }

  function prevSlide() {
    buttonNext.classList.remove('active')
    for (let i = 0; i < slides.length; i++) {
      if (
        slides[i].classList.contains("active") &&
        slides[i].previousElementSibling
      ) {
        if (slides[i - 1]) {
          slides[i - 1].classList.replace("none", "active");
          slides[i].classList.replace("active", "centr");
          
          if (slides[i + 1]) {
            slides[i + 1].classList.replace("centr", "left");
          }
          if (slides[i + 2]) {
            slides[i + 2].classList.replace("left", "none-reverce");
          }
        }
          if(i == 1){
        buttonPrev.classList.add('active')
      }
        break;
      }
    }
  }

  buttonPrev.addEventListener("click", prevSlide);
  buttonNext.addEventListener("click", nextSlide);

  const canvas1 = document.getElementById("c1");
  // console.log(canvas1)

  // Вешаем на прикосновение функцию handleTouchStart
  canvas1.addEventListener("touchstart", handleTouchStart, false);
  // А на движение пальцем по экрану - handleTouchMove
  canvas1.addEventListener("touchmove", handleTouchMove, false);

  let xDown = null;
  let yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    // немного поясню здесь. Тут берутся модули движения по оси абсцисс и ординат (почему модули? потому что если движение сделано влево или вниз, то его показатель будет отрицательным) и сравнивается, чего было больше: движения по абсциссам или ординатам. Нужно это для того, чтобы, если пользователь провел вправо, но немного наискосок вниз, сработал именно коллбэк для движения вправо, а ни как-то иначе.
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        prevSlide();
          // canvas1.classList.add('touch')
      } else {
        /* right swipe */
        nextSlide();
        // canvas1.classList.add('touch')
      }
    } else {
      // Это вам, в общем-то, не надо, вы ведь только влево-вправо собираетесь двигать
      if (yDiff > 0) {
        //   canvas1.classList.remove('touch')

        // canvas1.classList.remove('touch')
        /* up swipe */
      } else {
        /* down swipe */
        // canvas1.classList.remove('touch')
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  // bubbles
  let bubbles = document.querySelectorAll(".bubbles");
  function showImages() {
    setTimeout(() => {
      bubbles[0].classList.add("active");
    }, 500);
    setTimeout(() => {
      bubbles[2].classList.add("active");
    }, 2000);
    setTimeout(() => {
      bubbles[1].classList.add("active");
    }, 3500);
    setTimeout(() => {
      bubbles[3].classList.add("active");
    }, 5000);
    setTimeout(() => {
      hidenImages();
    }, 6500);
  }
  showImages();
  function hidenImages() {
    for (i = 0; i < bubbles.length; i++) {
      bubbles[i].classList.remove("active");
    }
    showImages();
  }

  // Beginning

  const beginningSection = document.querySelector('#beginning'),
        beginningBg      = document.querySelector('.beginning-background'),
        fadeWrapper = document.querySelector('.fade-wrapper');
  

  // Waterway 
  const mintBtn = document.querySelector('#mint .btn'),
        mintWaterwayWrap = document.querySelector('#mint-waterway-wrap'),
        mintWaterwaySection = document.querySelector('#mintwaterway'),
        waterwaySection = document.querySelector('#waterway'),
        waterwayTabs = document.querySelectorAll('.waterway-tabs a'),
        waterwayText = document.querySelector('.waterway-texts'),
        waterwayTab = document.querySelectorAll('.waterway-tab');

  let mintWaterwayPercScroll = 0,
      num = 0,
      numOld = 0;

  mintBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: mintWaterwaySection.offsetTop + mintWaterwaySection.clientHeight/100 + 1000,
    })
  })

  waterwayTabs.forEach((el,i) => el.addEventListener('click', function(e) {
    e.preventDefault();

    waterwayTab.forEach(el => el.classList.remove('active'));
    waterwayTab[i].classList.add('active');

    const range = document.querySelector(`#waterway-text-${i+1}`).offsetTop - waterwayText.offsetTop - 1;

    x = (i === 0) ? 30 :
        (i === 1) ? 48 :
        (i === 2) ? 64 :
        (i === 3) ? 80 : 80;

    window.scrollTo({
      top: (mintWaterwaySection.offsetTop + mintWaterwaySection.clientHeight/100 * x) - 4,
    })

    waterwayText.scrollTo({
      top: range,
      behavior: "smooth"
    });

  }))

  let beginningOpacity = 0,
      mintWaterwayOpacity = 0;

  window.addEventListener('scroll', function() {

    mintWaterwayPercScroll = (-1 * mintWaterwaySection.getBoundingClientRect().y/ (mintWaterwaySection.clientHeight/100));
    beginningPercScroll = (-1 * beginningSection.getBoundingClientRect().y/ (beginningSection.clientHeight/100));

    if (beginningPercScroll < 56) {

      beginningOpacity = 1;
      mintWaterwayOpacity = 0;

    } else if (beginningPercScroll >= 56 && beginningPercScroll <= 66) {

      beginningOpacity = (66 - beginningPercScroll)/10;
      mintWaterwayOpacity = (-1 * (56 - beginningPercScroll) / 10);

      if (beginningOpacity <= 0.1) {
        beginningOpacity = 0;
      }
      if (beginningOpacity >= 0.8) {
        beginningOpacity = 1;
      }

      if (mintWaterwayOpacity <= 0.1) {
        mintWaterwayOpacity = 0
      }
      if (mintWaterwayOpacity >= 0.8) {
        mintWaterwayOpacity = 1
      }

    } else if (beginningPercScroll > 66) {

      beginningOpacity = 0;
      mintWaterwayOpacity = 1;

    }

    beginningOpacity >= 1 ? beginningSection.style.zIndex = 9 : beginningSection.style.zIndex = -1;

    beginningSection.style.opacity = beginningOpacity;
    mintWaterwaySection.style.opacity = mintWaterwayOpacity;

    // console.log('beginningOpacity: ', beginningOpacity)
    // console.log('mintWaterwayOpacity: ', mintWaterwayOpacity)
    console.log('beginningPercScroll: ', beginningPercScroll)
    console.log('mintWaterwayPercScroll: ', mintWaterwayPercScroll)
    

    // console.log(beginningPercScroll)

    // if (beginningPercScroll > 0) {
    //   beginningBg.style.transform = `scale(1.${Math.floor(beginningPercScroll)})`;
    //   let num = `0.${beginningPercScroll}`;
    //   let beginningOpacity = Number(num);
    //   let mintWaterwayOpacity = 1 - beginningOpacity
    //   console.log(typeof(+num))
    //   beginningSection.style.opacity = `${mintWaterwayOpacity}`
    // } else {
    //   beginningBg.style.transform = `scale(1)`
    // }

    // if (beginningPercScroll >= 72) {
    //   beginningSection.classList.remove('active');
    //   fadeWrapper.classList.add('active');
    // } else {
    //   beginningSection.classList.add('active');
    //   fadeWrapper.classList.remove('active');
    // }

    if (mintWaterwayPercScroll > 20) {
      mintWaterwayWrap.classList.add('active');
    } else {
      mintWaterwayWrap.classList.remove('active');
    }

    num = (mintWaterwayPercScroll <= 36) ? 0 :
          (mintWaterwayPercScroll < 52) ? 1 :
          (mintWaterwayPercScroll < 68) ? 2 :
          (mintWaterwayPercScroll < 84) ? 3 : 3;

      if (num === 0) {
        waterwaySection.classList = '';
        waterwaySection.classList.add('first');
      }
      if (num === 1) {
        waterwaySection.classList = '';
        waterwaySection.classList.add('second');
      }
      if (num === 2) {
        waterwaySection.classList = '';
        waterwaySection.classList.add('third');
      }
      if (num === 3) {
        waterwaySection.classList = '';
        waterwaySection.classList.add('four');
      }

      if (num !== numOld) {
        numOld = num;
        waterwayTabs[num].click();
      }

    })


    // Accordion
    const accordionItem = document.querySelectorAll('.accordion-item'),
        accordionTitle = document.querySelectorAll('.accordion-title'),
        accordionContent = document.querySelectorAll('.accordion-content');

    accordionTitle.forEach((el, i) => el.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('show');
      accordionItem[i].classList.toggle('show');
      accordionContent[i].classList.toggle('show');
    }))

});