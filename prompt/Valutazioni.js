///////////////////////////////////////////
// FILTRA SU TUTTE LE COLONNE
/////////////////////////////////
$(document).ready(function () {
    $('.filterable .btn-filter').click(function () {
        var $panel = $(this).parents('.filterable'),
            $filters = $panel.find('.filters input'),
            $tbody = $panel.find('.table tbody');
            //console.log('tbody: ',$tbody,'filters: ',$filters);
        if ($filters.prop('disabled') == true) {
            //console.log('son qua');
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            //console.log('son la');
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
            //console.log($tbody.find('tr'))
        }
    });
    $('.filterable .filters input').keyup(function (e) {
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;

        /* Useful DOM data and selectors */
        var $input = $(this),
            $panel = $input.parents('.filterable'),
            $table = $panel.find('.table'),
            $rows = $table.find('tbody tr'),
            $inputs = $panel.find('.filters input');

        /* Combine filters for all input fields */
        var $filteredRows = $rows.filter(function () {
            var $row = $(this);
            return $inputs.toArray().some(function (input) {
                var $input = $(input),
                    inputContent = $input.val().toLowerCase(),
                    column = $panel.find('.filters th').index($input.parents('th')),
                    cellValue = $row.find('td').eq(column).text().toLowerCase();
                    if ($table.attr('id') === 'listaRanking') {
                        cellValue = $row.find('td').eq(column + 2).text().toLowerCase();
                    } else if ($table.attr('id') === 'listaAdmin' ) {
                        cellValue = $row.find('td').eq(column + 1).text().toLowerCase();
                    } else {
                        cellValue = $row.find('td').eq(column).text().toLowerCase();
                    }
                return inputContent && cellValue.indexOf(inputContent) === -1;
            });
        });

        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();

        /* Show all rows, hide filtered ones */
        $rows.show();
        $filteredRows.hide();

        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
        }
    });

});

///////////////////////////////////////////
// FILTRA SU TUTTE LE COLONNE CON PAGINAZIONE
/////////////////////////////////
$(document).ready(function () {
    const rowsPerPage = 10;
    let $table = $('#listaAziende');
    //let $table = $('.liste-aziende-utenti');
    let $allRows = $table.find('tbody tr');
    let $pagination = $('.pagination');
    let filteredRows = $allRows;

    function renderPagination() {
        $pagination.html('');
        let totalPages = Math.ceil(filteredRows.length / rowsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            $pagination.append('<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>');
        }
    }

    function showPage(page) {
        filteredRows.hide();
        let start = (page - 1) * rowsPerPage;
        let end = start + rowsPerPage;
        filteredRows.slice(start, end).show();
    }

    $pagination.on('click', 'a', function (e) {
        e.preventDefault();
        let page = $(this).text();
        showPage(page);
    });

    renderPagination();
    showPage(1);

    $('.filtrabile .btn-filter').click(function () {
        var $panel = $(this).parents('.filtrabile'),
            $filtri = $panel.find('.filtri input'),
            $tbody = $panel.find('.table tbody');
        if ($filtri.prop('disabled') == true) {
            $filtri.prop('disabled', false);
            $filtri.first().focus();
        } else {
            $filtri.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $allRows.show();
            filteredRows = $allRows;
            renderPagination();
            showPage(1);
        }
    });

    $('.filtrabile .filtri input').keyup(function (e) {
        var code = e.keyCode || e.which;
        if (code == '9') return;

        var $input = $(this),
            $panel = $input.parents('.filtrabile'),
            $table = $panel.find('.table'),
            $inputs = $panel.find('.filtri input');

        filteredRows = $allRows.filter(function () {
            var $row = $(this);
            return $inputs.toArray().every(function (input) {
                var $input = $(input),
                    inputContent = $input.val().toLowerCase(),
                    column = $panel.find('.filtri th').index($input.parents('th'));
                if ($table.hasClass('lista-aziende')) {
                        cellValue = $row.find('td').eq(column + 1).text().toLowerCase();
                   } else if ($table.hasClass('lista-utenti'))  {
                        cellValue = $row.find('td').eq(column).text().toLowerCase();
                   }
                return cellValue.indexOf(inputContent) !== -1;
            });
        });

        $table.find('tbody .no-result').remove();
        if (filteredRows.length === 0) {
            $allRows.hide()
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filtri th').length + '">No result found</td></tr>'));
        } else {
            $allRows.hide();  // Hide all rows before showing filtered ones
            filteredRows.show();  // Show filtered rows
            renderPagination();
            showPage(1);
        }
    });
});


////////////////////////////////////////////////////////////////
// FILTRA SOLO UNA COLONNA (quella corrispondente all'input)
/////////////////////////////////////////////////////

//$(document).ready(function () {
//    $('.filterable .btn-filter').click(function () {
//        var $panel = $(this).parents('.filterable'),
//            $filters = $panel.find('.filters input'),
//            $tbody = $panel.find('.table tbody');
//            //console.log('tbody: ',$tbody,'filters: ',$filters);
//        if ($filters.prop('disabled') == true) {
//            //console.log('son qua');
//            $filters.prop('disabled', false);
//            $filters.first().focus();
//        } else {
//            //console.log('son la');
//            $filters.val('').prop('disabled', true);
//            $tbody.find('.no-result').remove();
//            $tbody.find('tr').show();
//            //console.log($tbody.find('tr'))
//        }
//    });

//    $('.filterable .filters input').keyup(function (e) {
//        /*console.log($('.filterable .filters input'))*/
//        /* Ignore tab key */
//        var code = e.keyCode || e.which;
//        if (code == '9') return;
//        /* Useful DOM data and selectors */
//        var $input = $(this),
//            inputContent = $input.val().toLowerCase(),
//            $panel = $input.parents('.filterable'),
//            column = $panel.find('.filters th').index($input.parents('th')),
//            $table = $panel.find('.table'),
//            $rows = $table.find('tbody tr');
//        console.log($input,column);
//        /* Dirtiest filter function ever ;) */
//        var $filteredRows = $rows.filter(function () {
//            var value = $(this).find('td').eq(column).text().toLowerCase();
//        console.log($(this).find('td').eq(column))
//            return value.indexOf(inputContent) === -1;
//        });
//        /* Clean previous no-result if exist */
//        $table.find('tbody .no-result').remove();
//        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
//        $rows.show();
//        $filteredRows.hide();
//        /* Prepend no-result row if all rows are filtered */
//        if ($filteredRows.length === $rows.length) {
//            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
//        }
//    });
//});