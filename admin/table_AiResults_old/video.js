// Define a function to handle the search input keyup event
function handleSearchHighlighting2() {
    var searchText = $('input[type="search"]:eq(1)').val().trim();
    $('#myTableVideo tbody tr').each(function() {
        var row = $(this);
        row.find('td').slice(1).each(function() { // Exclude the first and last columns
            var originalText = $(this).data('originalText');
            if (!originalText) {
                originalText = $(this).text().trim();
                $(this).data('originalText', originalText);
            }
            var regex = new RegExp('(' + escapeRegExp(searchText) + ')', 'ig');
            var highlightedText = originalText.replace(regex, '<span class="highlight">$1</span>');
            $(this).html(highlightedText);
        });
    });
}


// Function to escape special characters in a regular expression
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Attach keyup event listener to the search input field
$(document).ready(function() {
    // Initialize DataTable
    var table = $('#myTableVideo').DataTable({
        ajax: {
            url: './video.json', // Adjust the URL to your endpoint
            dataType: 'json',
            dataSrc: ''
        },
        columns: [
            { 
                data: null, 
                render: function(data, type, row) {
                    return '<button><i class="bi bi-eye"></i></button>';
                },
                orderable: false 
            },
            { data: 'titoloBando', orderable: false },
            { data: 'titoloProgetto', orderable: false },
            { data: 'dataInserimento' },
            { data: 'denominazioneAzienda', orderable: false  },
            { data: 'linkVideo', orderable: false  }, // Changed 'importo' to 'linkVideo'
            { data: 'nomeUtente', orderable: false },
            { data: 'cognomeUtente', orderable: false },
            { data: 'email', orderable: false },
           
        ],
        columnDefs: [
            {
                targets: 0, // Targeting the first column
                className: 'text-center' // Centering content in the first column
            },
            {
                targets: 3,
                render: function(data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        // Parse the date string into a Date object
                        var dateParts = data.split('-');
                        var year = dateParts[0];
                        var month = dateParts[1];
                        var day = dateParts[2];
        
                        // Format the date as DD-MM-YYYY
                        return day + '-' + month + '-' + year;
                    } else {
                        // Return the original data for sorting, etc.
                        return data;
                    }
                },
                className: 'dt-body-right'
            }
        ],
        order: [[3, 'des']],
        language: {
            info: 'Visualizzati da _START_ a _END_ di _TOTAL_ elementi',
            infoFiltered:   "(ricerca su totali _MAX_ elementi)",
            infoEmpty: 'Nessun elemento trovato',
            lengthMenu: 'Visualizza _MENU_ risultati per pagina',
            zeroRecords: 'Nessuna rendicontazione corrisponde alla ricerca',
            search: 'Ricerca globale:'
        },
        scrollX: true,
      
        pageLength: 5,
        lengthMenu: [5, 10, 20]
    });

    // Attach keyup event listener to the search input field
    $('input[type="search"]').on('keyup', function() {
        console.log('dadsa')
        handleSearchHighlighting2();
    });

    // Attach draw event listener to DataTable
    table.on('draw', function() {
        handleSearchHighlighting2();
    });
    
});
