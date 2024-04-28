$.ajax({
    type: 'GET',
    url: "./rendicontazioni.json",
    dataType: "json",
    success: function(bo) {
        let string = ""
 

        
        const reports = sortByDate(bo);
       

        createReportsWrapper(reports);

        let inputName = document.querySelector("#inputName")
        inputName.addEventListener("input", () => {
            string = inputName.value
            let filtered = filterReports(reports, string)
            console.log(filtered);
            createReportsWrapper(filtered, string)
        })
    },
    error: function(xhr, status, error) {
        console.error("An error occurred while fetching data:", error);
    }
});


function filterReports(reports, nome) {
    const lowerCaseNome = nome.toLowerCase();
    
    return reports.filter((report) => {
        const lowerCaseTitoloBando = report.titoloBando.toLowerCase();
        const lowerCaseTitoloProgetto = report.denominazioneAzienda.toLowerCase();
        return lowerCaseTitoloBando.includes(lowerCaseNome) || lowerCaseTitoloProgetto.includes(lowerCaseNome);
    });
}

function createReportsWrapper(reports, string) {
    let reportsWrapper = document.querySelector("#reportsWrapper")
    reportsWrapper.innerHTML = ""
    reports.forEach((report) => {
        let rowElement = createReportElement(report, string)
        reportsWrapper.appendChild(rowElement)
    })
}
function createReportElement(report,string) {

    let element = document.createElement("tr");
    let properties = ['titoloBando', 'titoloProgetto', 'dataInserimento','denominazioneAzienda','importo', 'nomeUtente','cognomeUtente','email'];

    let iconTd = document.createElement("td");
    iconTd.innerHTML = `<i class="bi bi-eye fs-5"></i>`;

    element.appendChild(iconTd);

    properties.forEach(property => {
        let value = report[property];
        let lowercaseValue = (property === 'titoloBando' || property === 'denominazioneAzienda') ? value.toLowerCase() : value;
        let lowercaseFilter = string ? string.toLowerCase() : '';

        if (property === 'dataInserimento') {
            let date = new Date(value);
            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            let year = date.getFullYear();
            value = `${day}/${month}/${year}`;
        }  

        if ((property === 'titoloBando' || property === 'denominazioneAzienda') && lowercaseFilter && lowercaseValue.includes(lowercaseFilter)) {
            let index = lowercaseValue.indexOf(lowercaseFilter);
            let styledValue = value.substring(0, index) + '<span class="highlight">' + value.substring(index, index + string.length) + '</span>' + value.substring(index + string.length);
            element.innerHTML += `<td>${styledValue}</td>`;
        } else {
            element.innerHTML += `<td>${value}</td>`;
        }
    });

    return element;
}

function sortByDate(array) {
    return array.sort((a, b) => {
        console.log(new Date(a.dataInserimento).toLocaleDateString())
      return new Date(a.dataInserimento) - new Date(b.dataInserimento);
    //   return  new Date(b.dataInserimento) - new Date(a.dataInserimento) ;
    });
  }
  
