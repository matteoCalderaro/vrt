////////////////////////////////////
// PROGRESS BAR DESKTOP AND MOBILE

let arr = ['Progetto','Dettagli ricerca','Beneficiario','Criterio 1','Criterio 2','Criterio 3','Criterio 4','Criterio 5','Criterio 6']

var currentStep = 1;
var updateProgressBar;

// progressMobile mobile - inizializza testo
var progressMobile = arr[0]


function displayStep(stepNumber) {
  // FORWARD ONLY ONE STEP
  if(stepNumber > currentStep +1){
    return
  }
  // FORWARD & BACKWARD ONLY ONE STEP
  // if(stepNumber > currentStep +1 || stepNumber < currentStep - 1){
  //     return
  // }
  
  if (stepNumber >= 1 && stepNumber <= 9) {
    
    $('.circle').slice(1,stepNumber).removeClass('step-circle').addClass('step-circle-colored');
    
    // FORWARD & BACKWARD ONLY ONE STEP
    // if (stepNumber < currentStep) {
    //     $('.circle').eq(stepNumber).removeClass('step-circle-colored').addClass('step-circle')
    // }
    
    if (stepNumber < currentStep) {
      $('.circle').slice(stepNumber).removeClass('step-circle-colored').addClass('step-circle')
    }
    
    $('.label').css("color", "var(--gray-light)").eq(stepNumber -1).css("color", "var(--secondary)")
    // $(".step-" + currentStep).hide();
    // $(".step-" + stepNumber).show();
    $(".step-" + currentStep).addClass("animate__animated animate__fadeOut");
    setTimeout(function() {
      $(".step").removeClass("animate__animated animate__fadeOut").hide();
      $(".step-" + stepNumber).show().addClass("animate__animated animate__fadeIn");
    }, 200);
  }
  currentStep = stepNumber;
  
  // progressMobile - aggiorna testo
  progressMobile=arr[currentStep-1]
  
  updateProgressBar();
  $(window).scrollTop(0);
}

$(document).ready(function() {
  $('#multi-step-form').find('.step').slice(1).hide();
  
  
  $(".next-step").click(function() {
    
    if (currentStep < 9) {
      $('.progress-container').find('.circle').eq(currentStep).removeClass('step-circle').addClass('step-circle-colored')
      
      $(".step-" + currentStep).addClass("animate__animated animate__fadeOut");
      currentStep++;
      // progressMobile - aggiorna testo
      progressMobile=arr[currentStep-1]
      setTimeout(function() {
        $(".step").removeClass("animate__animated animate__fadeOut").hide();
        $(".step-" + currentStep).show().addClass("animate__animated animate__fadeIn");
        updateProgressBar();
      }, 200);
    }
    $('.label').css("color", "var(--gray-light)").eq(currentStep -1).css("color", "var(--secondary)");
    $('.circle').slice(1,currentStep).removeClass('step-circle').addClass('step-circle-colored');
    $(window).scrollTop(0);
  });
  
  $(".prev-step").click(function() {
    if (currentStep > 1) {
      $('.progress-container').find('.circle').eq(currentStep-1).removeClass('step-circle-colored').addClass('step-circle')
      $(".step-" + currentStep).addClass("animate__animated animate__fadeOut");
      currentStep--;
      // progressMobile - aggiorna testo
      progressMobile=arr[currentStep-1]
      setTimeout(function() {
        $(".step").removeClass("animate__animated animate__fadeOut").hide();
        $(".step-" + currentStep).show().addClass("animate__animated animate__fadeIn");
        updateProgressBar();
      }, 200);
    }
    $('.label').css("color", "var(--gray-light)").eq(currentStep -1).css("color", "var(--secondary)");
    $('.circle').slice(currentStep).removeClass('step-circle-colored').addClass('step-circle');
    $(window).scrollTop(0);
    
  });
  
  updateProgressBar = function() {
    var progressPercentage = ((currentStep - 1) / 8) * 100;
    $(".progress-bar").css("width", progressPercentage + "%");
    
    // progressMobile - aggiorna testo
    // $('.step-value').html(currentStep);
    $('.step-value').html(progressMobile);
  }
});



///////////////////////////////////
//////// SCROLL TO TOP ICON
const scrollIcon = document.querySelector('.scroll-icon-inner')

scrollIcon.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener("scroll", () => {
  let scroll = this.scrollY;
  if(scroll>500 && window.innerWidth < 767){
    scrollIcon.style.visibility = "visible"
  }
  else {
    
    scrollIcon.style.visibility = "hidden"
  }
});