// Define a function to handle the search input keyup event
function handleSearchHighlighting() {
    var searchText = $('input[type="search"]').val().trim();
    $('#myTable tbody tr').each(function() {
        var row = $(this);
        row.find('td').slice(1, -1).each(function() { // Exclude the first and last columns
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
    var table = $('#myTable').DataTable({
        ajax: {
            url: './rendicontazioni.json', // Adjust the URL to your endpoint
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
            { data: 'importo' },
            { data: 'nomeUtente', orderable: false },
            { data: 'cognomeUtente', orderable: false },
            { data: 'email', orderable: false },
            {
                data: 'autorizzato',
                render: function(data, type, row) {
                    return '<input type="checkbox" class="form-check-input" disabled ' + (data ? 'checked' : '') + '>';
                },
                orderable: false,
                className: 'text-center' // Aligns content to the center
            }
        ],
        columnDefs: [
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
            },
            { targets: 5, render: $.fn.dataTable.render.number('.', ',', 2, '€ '), className: 'dt-body-right' }
        ],
        order: [[3, 'des']],
        language: {
            info: 'Visualizzati da _START_ a _END_ di _TOTAL_ elementi',
            infoFiltered:   "(ricerca su totali _MAX_ elementi)",
            infoEmpty: 'Nessun elemento trovato',
            lengthMenu: 'Visualizza _MENU_ risultati per pagina',
            zeroRecords: 'Nessuna rendicontazione corrisponde alla ricerca',
            search: 'Ricerca in tutte le colonne:'
        },
        scrollX: true,
        autoWidth: true,
        pageLength: 5,
        lengthMenu: [5, 10, 20]
    });

    // Attach keyup event listener to the search input field
    $('input[type="search"]').on('keyup', function() {
        handleSearchHighlighting();
    });

    // Attach draw event listener to DataTable
    table.on('draw', function() {
        handleSearchHighlighting();
    });
    
});
