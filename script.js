// DA DOCUMENTAZIONE BOOTSTRAP -> https://getbootstrap.com/docs/5.3/forms/validation/#custom-styles

(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  //Loop over them and prevent submission
  Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
      if (!form.checkValidity()||form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
      }

      form.classList.add('was-validated')
      }, false)
  })
})()

////////////////////////

var labelArrayLogin = ['Progetto','Dettagli ricerca','Beneficiario','Criterio 1','Criterio 2','Criterio 3','Criterio 4','Criterio 5','Criterio 6']
var labelArrayRegister = ['Categoria','Anagrafica','Accettazioni','Sedi','Legale rappresentante','Dati specifici','Banca','Documenti']

var currentStep = 1;
var updateProgressBar;

var labelArray
var progressMobileLabel 
var totalStepNumber

// Intro:
// Alla varibile globale currentStep è assegnato lo step corrente (le funzioni A + B aggiornano il valore)
// Le funzioni A e B effettuano il toggle degli step (nodi dom). Il toggle è associato ad animazione css (libreria animate.css).
// La funzione A è invocata da attributo onClick su labels e circonferenze (desktop). L'attributo passa il numero dello step verso il quale verrà effetuato il toggle.
// La funzione B è invocata al caricamento dell'app e associa a tutti i bottoni avanti/indietro (desktop + mobile) un event handler
// che effettua il toggle verso lo step precedente (bottone avanti) o successivo (bottone indietro)


/* 
  FUNCTION A
*/
function displayStep(stepNumber) {

  // esce se lo step cliccato non è quello immediatamente sucessivo a quello cliccato 
  // if(stepNumber > currentStep +1 ){
  //   return
  // }
  // esce se lo step cliccato non è quello immediatamente precedente o sucessivo a quello cliccato 
  // if(stepNumber > currentStep +1 || stepNumber < currentStep - 1){
  //     return
  // }
  
  if (stepNumber >= 1 && stepNumber <= totalStepNumber +1) {

    // colora le circonferenze dello step cliccato e dei precendenti 
    $('.circle').slice(1,stepNumber).removeClass('step-circle').addClass('step-circle-colored');

    // decolora le circonferenze degli step seguenti se lo step cliccato è precedente al corrente
    if (stepNumber < currentStep) {
      $('.circle').slice(stepNumber).removeClass('step-circle-colored').addClass('step-circle')
    }

    // colora la label dello step cliccato
    $('.label').css("color", "var(--gray-light)").eq(stepNumber -1).css("color", "var(--secondary)")

    // fade out corrente step
    $(".step-" + currentStep).addClass("animate__animated animate__fadeOut");

    setTimeout(function() {
      // rimuove corrente step
      $(".step").removeClass("animate__animated animate__fadeOut").hide();
      // visualizza step cliccato
      $(".step-" + stepNumber).show().addClass("animate__animated animate__fadeIn");
    }, 200);
  }
  
  currentStep = stepNumber;
  
  // aggiorna la label (mobile)
  progressMobileLabel = labelArray[currentStep-1]

  updateProgressBar();
  $(window).scrollTop(0);
}

/* 
  FUNCTION B effettua inoltre:
    -  definisce il totale degli step in base alla pagina (register/login)
    -  inizializza la funzione updateProgressBar che definisce la lunghezza della progress bar desktop/mobile)
*/
$(document).ready(function() {

  // elimina dal dom tutti gli step, tranne lo step 1
  $('.form-container').find('.step').slice(1).hide();

  // totale step in base alla pagina
  let body =document.querySelector('body')
  if(body.classList.contains('register')){
    totalStepNumber = 7
    labelArray = labelArrayRegister
  }
  if(body.classList.contains('login')){
    totalStepNumber = 8
    labelArray = labelArrayLogin
  }
  
  
  // bottone avanti event handler
  $(".next-step").click(function() {
    if (currentStep < totalStepNumber+1) {
      
      //////////////////////////////////////
      //// CHIAMA FUNZIONI VALIDAZIONE FORM
      ////////////////////////////////////
      (async () => {
        const result = await eval(`validateStep${currentStep}`)()
        if (result == true) {
            
          // colora la circonferenza dello step cliccato 
          $('.circle').eq(currentStep).removeClass('step-circle').addClass('step-circle-colored')
          // colora la label cliccata
          $('.label').css("color", "var(--gray-light)").eq(currentStep).css("color", "var(--secondary)");
          // fade out corrente step
          $(".step-" + currentStep).addClass("animate__animated animate__fadeOut");
          
          currentStep++;
          
          // mobile | trova la label nel rispettivo array
          progressMobileLabel = labelArray[currentStep-1]

          setTimeout(function() {
            // rimuove corrente step
            $(".step").removeClass("animate__animated animate__fadeOut").hide();
            // visualizza sucessivo step
            $(".step-" + currentStep).show().addClass("animate__animated animate__fadeIn");
            updateProgressBar();
          }, 200);

        } else {
            console.log('respinta')
            return
        }
      })()
      
    }

    $(window).scrollTop(0);
  });
  

  // bottone indietro event handler
  $(".prev-step").click(function() {

    if (currentStep > 1) {
      // decolora la circonferenza del corrente step
      $('.circle').eq(currentStep-1).removeClass('step-circle-colored').addClass('step-circle')
      // colora la label del precedende step
      $('.label').css("color", "var(--gray-light)").eq(currentStep -2).css("color", "var(--secondary)");
      // fade out corrente step
      $(".step-" + currentStep).addClass("animate__animated animate__fadeOut");
      currentStep--;
      
      progressMobileLabel = labelArray[currentStep-1]

      setTimeout(function() {
        // rimuove corrente step
        $(".step").removeClass("animate__animated animate__fadeOut").hide();
        // visualizza precedente step
        $(".step-" + currentStep).show().addClass("animate__animated animate__fadeIn");
        updateProgressBar();
      }, 200);
    }

    $(window).scrollTop(0);
  });
  
  // definisce la lunghezza delle progress bar 
  updateProgressBar = function() {
    // desktop + mobile | definisce la lunghezza della barra
    var progressPercentage = ((currentStep - 1) / totalStepNumber) * 100;
    $(".progress-bar").css("width", progressPercentage + "%");
    
    // mobile | assegna la stringa alla label
    $('.step-value').html(progressMobileLabel);
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


///////////////////////////////////
//////// PASSWORD EYE
$(".show_hide_password span").on('click', function(event) {
  console.log('ciao')
    event.preventDefault();
    if($('.show_hide_password input').attr("type") == "text"){
        $('.show_hide_password input').attr('type', 'password');
        $('.show_hide_password i').addClass( "bi-eye-slash" );
        $('.show_hide_password i').removeClass( "bi-eye" );
    }else if($('.show_hide_password input').attr("type") == "password"){
        $('.show_hide_password input').attr('type', 'text');
        $('.show_hide_password i').removeClass( "bi-eye-slash" );
        $('.show_hide_password i').addClass( "bi-eye" );
    }
});




