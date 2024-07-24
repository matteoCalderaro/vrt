let criteri = []

$(document).ready(function() {
    $.ajax({
        url: './prompt.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            criteri = data
            visualizza(data)
            // data.forEach(function(item, index) {
            //     console.log(item)
            // });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data:', textStatus, errorThrown);
        }
    });
});


function visualizza(data){
    console.log(data);
    // this.contatti.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))
    let wrapperCriteri = document.querySelector("#wrapperCriteri")
    let wrapperPanes = document.querySelector("#wrapperPanes")
    wrapperCriteri.innerHTML =""
    wrapperPanes.innerHTML =""

    data.forEach((criterio,index)=>{

        let criterioElement = creaCriterio(criterio,index)
        wrapperCriteri.appendChild(criterioElement)
        let criterioPane = creaPane(criterio,index)
        wrapperPanes.appendChild(criterioPane)
    })
}

function creaCriterio(criterio,index){
    let del = index > 5 ? true : false
    let criterioElement = document.createElement("li")
        criterioElement.classList.add("nav-item")
        criterioElement.style.position = "relative";

        criterioElement.innerHTML = `
        ${del  ? `
            
            <button class="btn btn-sm btn-outline-dark criterio-element-close">
                <i class="bi bi-x-lg"></i>
            </button>
            ` 
        : 
        ""
        }
        
        <button type="button" 
                class="${index === 0 ? 'sidebar-button active py-2 d-flex px-3' : 'sidebar-button py-2 d-flex px-3'}"                id="${'criterio-prompt-' + criterio.criterio + '-tab'}" 
                data-coreui-toggle="tab" 
                data-coreui-target="${'#criterio-prompt-' + index}" 
                role="tab" 
                aria-controls="criterio-prompt-2" 
                aria-selected="false"
        >
            ${'Criterio ' + (index+1)}
        </button>

       `

    if(del){
        let removeButton = criterioElement.querySelector(".criterio-element-close")
        removeButton.addEventListener('click',()=>{
            cancellaCriterio(index)
        })
    }
    return criterioElement
}

function creaPane(criterio,index){
    let criterioPane = document.createElement("div")
        criterioPane.classList.add("tab-pane", "table-container", "h-100", "pt-2", "pt-md-3", "px-2", "px-md-3", "rounded-top");
        if (index === 0) {
            criterioPane.classList.add("active");
        } else {
            criterioPane.classList.add("fade");
        }
        let paneId = `criterio-prompt-${index}`;
        criterioPane.setAttribute("id", paneId);
        // let label = `criterio-${index}-tab`;
        // criterioPane.setAttribute("aria-labelledby", label)

        criterioPane.innerHTML = `
            <div class="tag rounded tag-outline align-items-center d-flex gap-2 px-3 py-1 mb-3">
                <i class="bi bi-tags"></i>
                <span>${'criterio '+(index+1)}</span>
            </div>
            <div class="row mb-3">
                <div class="col-6">
                    <h1 class="fw-bold">TITOLO</h1>
                    <p>${criterio.titolo}</p>
                </div>
                ${criterio.ambito  ? `
                        <div class="col-6">
                        <h1 class="fw-bold">AMBITO</h1>
                        <p>${criterio.ambito}</p>
                        </div>
                    ` 
                : 
                ""
                }
            </div>
            ${criterio.input  ? `
                    <div class="mb-5">
                        <h1 class="fw-bold">INPUT</h1>
                        <p>${criterio.input}</p>
                    </div>
                ` 
            : 
            ""
            }

            
            <div class="mb-5">
                <h1 class="fw-bold">PROMPT</h1>
                <textarea class="form-control" id="prompt" rows="6" disabled>${criterio.prompt}</textarea>
            </div>
            <div class="d-flex justify-content-end">
                <div>
                    <button id="${index}" class="btn btn-secondary me-3 editPromptButton" type="submit">Modifica</button>
                    <button id="${index}" class="btn btn-primary updatePromptButton" type="submit">Aggiorna</button>
                </div>
            </div>
       `
       
    return criterioPane
}

// Delegating the click event to a static parent element (e.g., the body)
$(document).on('click', '.editPromptButton', function () {
    $(this).closest('.d-flex').prev('.mb-5').find('textarea').prop('disabled', false);
});

$(document).on('click', '.updatePromptButton', function () {
    var buttonIndex = this.id;
    var textarea = $(this).closest('.d-flex').prev('.mb-5').find('textarea');
        textarea.prop('disabled', true);
    var prompt = textarea.val();
    // console.log(buttonIndex,prompt)
    criteri.map((criterio, idx) => {
        if (idx == buttonIndex) {
            criterio.prompt = prompt;
        }
    });
    visualizza(criteri)
    
});




function cancellaCriterio(indexToRemove){
    criteri = criteri.filter((criterio,index)=> index != indexToRemove)
    visualizza(criteri)
}


// Triggered when a row's button is clicked
$('#addCriterio').on('click', function () {
    $('#myModal').modal("show");
});

// Attach click event listener to the "Salva" button in the modal
$('#myModal .btn-secondary').on('click', function() {
    let form = document.querySelector('#myModal')
    
    if(form.checkValidity()){
        var ambito = $('#ambito option:selected').text();
        var titolo = $('#titolo').val();
        var prompt = $('#prompt').val();
    
        criteri.push({
            titolo: titolo,
            input :  null,
            prompt : prompt,
            ambito : ambito
        })
        visualizza(criteri)

        $('#myModal').modal('hide');
    }
});


