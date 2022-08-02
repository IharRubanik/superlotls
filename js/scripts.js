document.addEventListener("DOMContentLoaded", function() {

  // Waterway 
  const waterwaySection = document.querySelector('section.waterway'),
        waterwayTabs = document.querySelectorAll('.waterway-tabs a'),
        waterwayText = document.querySelector('.waterway-texts'),
        waterwayTab = document.querySelectorAll('.waterway-tab');

  waterwayTabs.forEach((el,i) => el.addEventListener('click', function(e) {
    e.preventDefault();

    waterwayTab.forEach(el => el.classList.remove('active'));
    waterwayTab[i].classList.add('active');

    const range = document.querySelector(`#waterway-text-${i+1}`).offsetTop - waterwayText.offsetTop - 1;
    waterwayText.scrollTo({
      top: range,
      behavior: "smooth"
    });

  }))


  let numOld = 0;

  window.addEventListener('scroll', function() {

    let percentScrolled =  (-1 * waterwaySection.getBoundingClientRect().y/ (waterwaySection.clientHeight/100));

    // console.log(percentScrolled)

    let num = (percentScrolled < 25) ? 0 :
              (percentScrolled < 50) ? 1 :
              (percentScrolled < 67) ? 2 :
              (percentScrolled < 67) ? 3 : 3;
    

    if (num !== numOld) {
      numOld = num;
      waterwayTabs[num].click()
    }

  })


});