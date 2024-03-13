////////////////////////////////////
// PROGRESS BAR DESKTOP AND MOBILE

var arrLogin = ['Progetto','Dettagli ricerca','Beneficiario','Criterio 1','Criterio 2','Criterio 3','Criterio 4','Criterio 5','Criterio 6']
var arrRegister = ['Categoria','Anagrafica','Accettazioni','Sedi','Legale rappresentante','Dati specifici','Banca','Documenti']

var currentStep = 1;
var updateProgressBar;

// passano la label alla progress mobile
var arr
var progressMobile 
// definisce la lunghezza dello stepper
var totalStepNumber



function displayStep(stepNumber) {
  // avanti solo di uno step
  if(stepNumber > currentStep +1 ){
    return
  }
  // avanti e indietro solo uno step 
  // if(stepNumber > currentStep +1 || stepNumber < currentStep - 1){
  //     return
  // }
  
  if (stepNumber >= 1 && stepNumber <= totalStepNumber +1) {
    
    $('.circle').slice(1,stepNumber).removeClass('step-circle').addClass('step-circle-colored');
    
    // avanti e indietro solo uno step 
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
  progressMobile = arr[currentStep-1]
  
  updateProgressBar();
  $(window).scrollTop(0);
}

$(document).ready(function() {

  let body =document.querySelector('body')
  if(body.classList.contains('register')){
    totalStepNumber = 7
    arr = arrRegister
  }
  if(body.classList.contains('login')){
    totalStepNumber = 8
    arr = arrLogin
  }
  
  console.log(arr)

  $('#multi-step-form').find('.step').slice(1).hide();
  
  
  $(".next-step").click(function() {
    
    if (currentStep < totalStepNumber+1) {
      $('.progress-container').find('.circle').eq(currentStep).removeClass('step-circle').addClass('step-circle-colored')
      
      $(".step-" + currentStep).addClass("animate__animated animate__fadeOut");
      currentStep++;
      // progressMobile -> aggiorna testo
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
      // progressMobile -> aggiorna testo
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
    console.log(totalStepNumber)
    var progressPercentage = ((currentStep - 1) / totalStepNumber) * 100;
    $(".progress-bar").css("width", progressPercentage + "%");
    
    // progressMobile -> aggiorna testo
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