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
/////////////////////////////
// CAPITALE SOCIALE
/////////////////////////
let capitaleSociale = []
let wrapperCapitaleSociale = document.querySelector("#wrapperCapitaleSociale")
let createRowCapitale = () => {
    let row = document.createElement("div")
    row.classList.add("row")
    row.classList.add("gap-3")
    row.classList.add("gap-md-0")
    row.classList.add("mb-3")
    row.innerHTML = `
            <div class="col-12 col-md-3">
                <input type="text" class="form-control" id="nomeCapitaleSociale" placeholder="Nome" >
                <div class="invalid-feedback">
                    Campo obbligatorio
                </div>
            </div>
            <div class="col-12 col-md-3">
                <input type="text" class="form-control" id="cognomeCapitaleSociale" placeholder="Cognome" >
                <div class="invalid-feedback">
                    Campo obbligatorio
                </div>
            </div>
            <div class="col-12 col-md-3">
                <div class="input-group">
                    <input type="number" class="form-control" id="quotaPartecipazione" aria-label="Amount (to the nearest dollar)" placeholder="Quota partecipazione">
                    <span class="input-group-text input-add-on-icon">
                        <i class="bi bi-bank"></i>
                    </span>
                </div>
            </div>
            <div class="col-12 col-md-3 d-flex justify-content-between align-items-center align-self-start">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="genereFemminileStep8">
                    <label class="form-check-label" for="genereFemminile">
                        Genere femminile
                    </label>
                </div>
                <button type="button" class="removeBtn btn-vrt-outline-primary-icon">
                    <i class="bi bi-dash-lg"></i>
                </button>
            </div>
           `

    let removeBtn = row.querySelector(".removeBtn")
    removeBtn.addEventListener('click', (e) => {
        e.target.closest('.row').remove()
    })

    wrapperCapitaleSociale.prepend(row)
}

/////////////////////////////
// ORGANO DIRETTIVO
/////////////////////////
let organoDirettivo = []
let wrapperOrganoDirettivo = document.querySelector("#wrapperOrganoDirettivo")
let createRowOrgano = () => {
    let row = document.createElement("div")
        row.classList.add("row")
        row.classList.add("gap-3")
        row.classList.add("gap-md-0")
        row.classList.add("mb-3")
        row.innerHTML = `
            <div class="col-12 col-md-3">
                <input type="text" class="form-control" id="nomeOrganoDirettivo" placeholder="Nome">
                <div class="invalid-feedback">
                    Campo obbligatorio
                </div>
            </div>
            <div class="col-12 col-md-3">
                <input type="text" class="form-control" id="cognomeOrganoDirettivo" placeholder="Cognome">
                <div class="invalid-feedback">
                    Campo obbligatorio
                </div>
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-between align-items-center">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="genereFemminileOrgano">
                    <label class="form-check-label" for="genereFemminileOrgano">
                        Genere femminile
                    </label>
                </div>
                <button type="button" class="removeBtn btn-vrt-outline-primary-icon">
                    <i class="bi bi-dash-lg"></i>
                </button>
            </div>
           `
           
            let removeBtn = row.querySelector(".removeBtn")
            removeBtn.addEventListener('click',(e)=>{
                e.target.closest('.row').remove()
            })
        
    wrapperOrganoDirettivo.prepend(row)
}




let addButtons = document.querySelectorAll(".addBtn")
addButtons.forEach((addBtn) => {
    addBtn.addEventListener('click', (e) => {
        if (e.target.closest('.wrapper').getAttribute('id') === 'wrapperCapitaleSociale') {
            createRowCapitale()
        }
        else {
            createRowOrgano()
        }

    })
})


let somma = 0
let campiVuoti = 0
let nomeCapitaleSociale
let cognomeCapitaleSociale
let quotaPartecipazione
let nomeOrganoDirettivo
let cognomeOrganoDirettivo
let campiVuotiOrganoDirettivo = 0


let saveBtn = document.querySelector("#Salva")
saveBtn.addEventListener('click', () => {
    validateStep8()
})

let checkDocumenti = () =>{
    // CAPITALE SOCIALE
    let rowsCapitale = wrapperCapitaleSociale.querySelectorAll('.row')

    for (let i = 0; i < rowsCapitale.length; i++) {
        
        const element = rowsCapitale[i];
        nomeCapitaleSociale = element.querySelector('#nomeCapitaleSociale').value
        cognomeCapitaleSociale = element.querySelector('#cognomeCapitaleSociale').value
        quotaPartecipazione = element.querySelector('#quotaPartecipazione').value
        if(!nomeCapitaleSociale || !cognomeCapitaleSociale || !quotaPartecipazione){
            campiVuoti++
        }
        somma = somma + Number(quotaPartecipazione)
    }
    for (let i = 0; i < rowsCapitale.length; i++) {
        if(quotaPartecipazione > 100 ||quotaPartecipazione < 0 ){
            console.log('dfsdf')
            $('#messageQuota').text('Valori per quota compresi tra 0 e 100')
            $('#messageCapitaleSociale').text('')

            return false
        }
        $('#messageQuota').text('')
        
        if( ( (!nomeCapitaleSociale || !cognomeCapitaleSociale || !quotaPartecipazione) && somma == 100) ||
            (( nomeCapitaleSociale || cognomeCapitaleSociale || quotaPartecipazione) && somma != 100) || (campiVuoti && somma ==100)){
            $('#messageCapitaleSociale').text('La somma delle quote è diversa da 100 oppure alcuni campi sono incompleti')
            console.log('somma',somma)
            somma = 0
            campiVuoti = 0
            return false
        }
        $('#messageCapitaleSociale').text('')
    }
    
    somma = 0

    // ORGANO DIRETTIVO
    let rowsOrgano = wrapperOrganoDirettivo.querySelectorAll('.row')
    
    for (let i = 0; i < rowsOrgano.length; i++) {
        const element = rowsOrgano[i];
        nomeOrganoDirettivo = element.querySelector('#nomeOrganoDirettivo').value
        cognomeOrganoDirettivo = element.querySelector('#cognomeOrganoDirettivo').value
        if(!nomeOrganoDirettivo || !cognomeOrganoDirettivo){
            campiVuotiOrganoDirettivo++
        }
    }
    console.log('campi vuoti',campiVuotiOrganoDirettivo)
    for (let i = 0; i < rowsOrgano.length; i++) {
        if(
           (nomeOrganoDirettivo && !cognomeOrganoDirettivo) || 
            (!nomeOrganoDirettivo && cognomeOrganoDirettivo) || 
            (nomeOrganoDirettivo && cognomeOrganoDirettivo && campiVuotiOrganoDirettivo) 
        
        )
            {
            $('#messageOrganoDirettivo').text('I campi sono incompleti')
            console.log('Alcuni campi sono incompleti')
            console.log(campiVuotiOrganoDirettivo)
            campiVuotiOrganoDirettivo = 0
            return false
        }
    } 
    $('#messageOrganoDirettivo').text('')

    campiVuotiOrganoDirettivo = 0
    return true
}



