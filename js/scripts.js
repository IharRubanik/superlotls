document.addEventListener("DOMContentLoaded", function() {

  // Waterway 
  const mintWaterwayWrap = document.querySelector('#mint-waterway-wrap'),
        mintWaterwaySection = document.querySelector('#mintwaterway'),
        waterwaySection = document.querySelector('#waterway'),
        waterwayTabs = document.querySelectorAll('.waterway-tabs a'),
        waterwayText = document.querySelector('.waterway-texts'),
        waterwayTab = document.querySelectorAll('.waterway-tab');

  let percentScrolled = 0,
      num = 0,
      numOld = 0;

  waterwayTabs.forEach((el,i) => el.addEventListener('click', function(e) {
    e.preventDefault();

    waterwayTab.forEach(el => el.classList.remove('active'));
    waterwayTab[i].classList.add('active');

    const range = document.querySelector(`#waterway-text-${i+1}`).offsetTop - waterwayText.offsetTop - 1;

    x = (i === 0) ? 20 :
        (i === 1) ? 34 :
        (i === 2) ? 50 :
        (i === 3) ? 68 : 84;

    window.scrollTo({
      top: (mintWaterwaySection.offsetTop + mintWaterwaySection.clientHeight/100 * x) - 4,
    })

    waterwayText.scrollTo({
      top: range,
      behavior: "smooth"
    });

  }))
  

  window.addEventListener('scroll', function() {

    percentScrolled = (-1 * mintWaterwaySection.getBoundingClientRect().y/ (mintWaterwaySection.clientHeight/100));

    console.log(percentScrolled)

    if (percentScrolled > 10) {
      mintWaterwayWrap.classList.add('active');
    } else {
      mintWaterwayWrap.classList.remove('active');
    }

    num = (percentScrolled <= 20) ? 0 :
          (percentScrolled < 36) ? 1 :
          (percentScrolled < 52) ? 2 :
          (percentScrolled < 68) ? 3 :
          (percentScrolled < 84) ? 3 : 3;
    
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