// Define a variable to store the row index
var selectedRowIndex;

// Triggered when a row's button is clicked
$('#myTable').on('click', 'button', function () {
    var row = $(this).closest('tr');
    selectedRowIndex = row.index(); // Save the index of the clicked row
    console.log("Selected Row Index:", selectedRowIndex); // Add this line for debugging

    var titoloBando = row.find('td').eq(1).text();
    var denominazioneAzienda = row.find('td').eq(4).text();
    var dataInserimento = row.find('td').eq(3).text();
    var importo = row.find('td').eq(5).text();

    $('#titoloBando').val(titoloBando);
    $('#denominazioneAzienda').val(denominazioneAzienda);
    $('#dataInserimento').val(dataInserimento);
    $('#importo').val(importo);

    // Update modal checkbox based on DataTable checkbox
    var isChecked = row.find('input[type="checkbox"]').prop('checked');
    $('#autorizzato').prop('checked', isChecked);

    // Set label text based on checkbox state
    if (isChecked) {
        $('label[for="autorizzato"]').text('Autorizzato');
    } else {
        $('label[for="autorizzato"]').text('Non autorizzato');
    }

    $('#myModal').modal("show");
});



// Attach click event listener to the "Salva" button in the modal
$('#myModal .btn-secondary').on('click', function() {
    var isChecked = $('#autorizzato').is(':checked');
    
    // Get the index of the selected row
    var rowIndex = selectedRowIndex;
    console.log('Selected Row Index:', rowIndex); // Add this line to check the selected row index

    // Find the checkbox element within the selected row
    var checkboxElement = $('#myTable tbody tr').eq(rowIndex).find('input[type="checkbox"]');
    if (checkboxElement.length > 0) {
        // Update the checkbox state
        checkboxElement.prop('checked', isChecked);
    } else {
        console.error('Checkbox element not found in the row.');
    }
    $('#myModal').modal('hide');
});




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
            search: 'Ricerca globale:'
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
