document.addEventListener("DOMContentLoaded", function() {

  // Waterway 
  const waterwaySection = document.querySelector('section.waterway'),
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

    // x = (i === 0) ? 0 :
    //     (i === 1) ? 16 :
    //     (i === 2) ? 32 :
    //     (i === 3) ? 48 : 48;

    // console.log('x: ',x)

    // window.scrollTo({
    //   top: waterwaySection.offsetTop + waterwaySection.clientHeight/100 * x,
    // })

    // window.scrollTo({
    //   top: 10
    // });

    waterwayText.scrollTo({
      top: range,
      behavior: "smooth"
    });

  }))
  

  window.addEventListener('scroll', function() {

    percentScrolled = (-1 * waterwaySection.getBoundingClientRect().y/ (waterwaySection.clientHeight/100));

    num = (percentScrolled < 16) ? 0 :
          (percentScrolled < 32) ? 1 :
          (percentScrolled < 48) ? 2 :
          (percentScrolled < 64) ? 3 : 3;

    console.log('num: ', num)
    
    if (num !== numOld) {
      numOld = num;
      waterwayTabs[num].click();
    }

  })


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