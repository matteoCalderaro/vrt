    /*"use strict";*/

    console.log('fsdfdsfs')
    let valueArray = []
    let valueCheckbox = null

    var params = null;      // Parameters
    var colsEdi = null;
    var newColHtml = '<div class="btn-group pull-right">' +

        '<button id="bEdit" type="button" class="btn btn-sm btn-default" onclick="EditRow(this);">' +

            '<svg class="nav-icon" width="16" height="16" style="vertical-align: baseline;"><use xlink: href="/Content/vendors/coreui/icons/svg/free.svg#cil-pencil" ></use ></svg > ' +

            '</button>' +

        //'<button id="bElim" type="button" class="btn btn-sm btn-default" data-toggle="modal" onclick="DeleteRow(this);">' +

        //'<svg class="nav-icon" width="16" height="16" style=";vertical-align: baseline;"><use xlink: href="/Content/vendors/coreui/icons/svg/free.svg#cil-trash" ></use ></svg > ' +

        //'</button>' +

        //'<button id="bElim" type="button" class="btn btn-sm btn-default" onclick="DeleteRow(this);" data-toggle="modal" data-target="#exampleModal">' +

        //'<svg class="nav-icon" width="16" height="16" style=";vertical-align: baseline;"><use xlink: href="/Content/vendors/coreui/icons/svg/free.svg#cil-trash" ></use ></svg > ' +

        //'</button>' +

        '<button id="bAcep" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="AcceptRow(this);">' +

            '<svg class="nav-icon" width="16" height="16" style="vertical-align: baseline;"><use xlink: href="/Content/vendors/coreui/icons/svg/free.svg#cil-plus" ></use ></svg > ' +

            '</button>' +

        '<button id="bCanc" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="CancelRow(this);" >' +

            '<svg class="nav-icon" width="16" height="16" style="vertical-align: baseline;"><use xlink: href="/Content/vendors/coreui/icons/svg/free.svg#cil-minus" ></use ></svg > ' +

            '</button>' +

        '</div>';
    var colEdicHtml = '<td name="buttons">' + newColHtml + '</td>';

    $.fn.SetEditable = function (options) {
    var defaults = {
        columnsEd: null,         // Index to editable columns. If null all td editables. Ex.: "1,2,3,4,5"
    $addButton: null,        // Jquery object of "Add" button
    onEdit: function () { },   // Called after edition
    onBeforeDelete: function () { }, // Called before deletion
    onDelete: function () { }, // Called after deletion
    onAdd: function () { }     // Called when added a new row
    };
    params = $.extend(defaults, options);
    this.find('thead tr').append('<th name="buttons">Edit</td>');  // Empty header
    this.find('tbody tr').append(colEdicHtml);
    var $tabedi = this;   // Read reference to the current table, to resolve "this" here.
    // Process "addButton" parameter
    if (params.$addButton != null) {
        // Parameter provided
        params.$addButton.click(function () {
            rowAddNew($tabedi.attr("id"));
        });
    }
    // Process "columnsEd" parameter
    if (params.columnsEd != null) {
        // Extract fields
        colsEdi = params.columnsEd.split(',');
    }
};
    function IterateEditableFields($cols, task) {
    // Iterate through editable fields of a row
    var n = 0;
    $cols.each(function () {
        n++;
    if ($(this).attr('name') == 'buttons') return;  // Exclude button column

    /////////////////////////////////////////
    //// BUSINESS INTELLIGENCE NETWORK
    ////////////////////////////////////////
    if ($(this).attr('name') == 'select') return;  // Exclude "selects"
    if ($(this).attr('name') == 'checkbox') return;  // Exclude "checkbox"
    //////////////////////////////////////////

    if (!IsEditable(n - 1)) return;   // Not editable field
    task($(this));
    });

    function IsEditable(idx) {
        // Indicates if the passed column is set to be editable
        if (colsEdi == null) {  // Not defined
            return true;  // All are editable
        } else {  // There's a field filter
            for (var i = 0; i < colsEdi.length; i++) {
                if (idx == colsEdi[i]) return true;
            }
    return false;  // Not found
        }
    }
}
    function SetNormalMode(but) {
        $(but).parent().find('#bAcep').hide();
    $(but).parent().find('#bCanc').hide();
    $(but).parent().find('#bEdit').show();
    $(but).parent().find('#bElim').show();
    var $row = $(but).parents('tr');  // Access the row
    $row.attr('id', '');  // Remove mark
}
    function SetEditMode(but) {
        $(but).parent().find('#bAcep').show();
    $(but).parent().find('#bCanc').show();
    $(but).parent().find('#bEdit').hide();
    $(but).parent().find('#bElim').hide();
    var $row = $(but).parents('tr');  // Access the row
    $row.attr('id', 'editing');  // Indicate it's in edition
}
    function EditionMode($row) {
    if ($row.attr('id') == 'editing') {
        return true;
    } else {
        return false;
    }
}
    function AcceptRow(but) {
    // Accepts edition changes
    var $row = $(but).parents('tr');  // Access the row
    var $cols = $row.find('td');  // Read fields
    if (!EditionMode($row)) return;  // Already in edition
    // In edition. Need to finish edition
    IterateEditableFields($cols, function ($td) {  // Iterate through columns
        var cont = $td.find('input').val(); // Read input content
    $td.html(cont);  // Set content and remove controls
    });
    SetNormalMode(but);
    params.onEdit($row);

    /////////////////////////////////////////
    //// BUSINESS INTELLIGENCE NETWORK
    ////////////////////////////////////////
    var row = but.closest('tr')
    let selects = row.querySelectorAll('select')
    for (let i = 0; i < selects.length; i++) {
        selects[i].setAttribute('disabled', true) // Disables all "selects" in the row
    }
    let checkbox = row.querySelector('.form-check-input') // Gets the checkbox
    checkbox.setAttribute('disabled', true)
}
    function CancelRow(but) {
    // Rejects edition changes
    var $row = $(but).parents('tr');  // Access the row
    var $cols = $row.find('td');  // Read fields
    if (!EditionMode($row)) return;  // Already in edition
    // In edition. Need to finish edition
    IterateEditableFields($cols, function ($td) {  // Iterate through columns
        var cont = $td.find('div').html(); // Read div content
    $td.html(cont);  // Set content and remove controls
    });
    SetNormalMode(but);

    /////////////////////////////////////////
    //// BUSINESS INTELLIGENCE NETWORK
    ////////////////////////////////////////
    var row = but.closest('tr')
    let selects = row.querySelectorAll('select') // Gets all "selects"
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = valueArray[i] // Evaluates the "selects" with the "previous value" from the global variable (valuesArray)
        selects[i].setAttribute('disabled', true) //  Disables the "selects"
    }
    let checkbox = row.querySelector('.form-check-input') // Gets the checkbox
    checkbox.checked = valueCheckbox
    checkbox.setAttribute('disabled', true)
}
    function EditRow(but) {  // Starts editing a row
    var $row = $(but).parents('tr');  // Access the row
    var $cols = $row.find('td');  // Read fields
    if (EditionMode($row)) return;  // Already in edition
    // Set in edition mode
    IterateEditableFields($cols, function ($td) {  // Iterate through columns
        var cont = $td.html(); // Read content
    var div = '<div style="display: none;">' + cont + '</div>';  // Save content
    var input = '<input class="form-control input-sm" value="' + cont + '">';
        $td.html(div + input);  // Set content
    });
        SetEditMode(but);
        /////////////////////////////////////////
        //// BUSINESS INTELLIGENCE NETWORK 
        ////////////////////////////////////////
        valueArray = []
        var row = but.closest('tr')
        let selects = row.querySelectorAll('select') // Gets all "selects"
        for (let i = 0; i < selects.length; i++) {
            //let currentValue = Number(selects[i].value)
            valueArray.push(selects[i].value) // Gets the value from the "selects" and save it in the global variable (valuesArray)
        selects[i].removeAttribute('disabled', true) // Enables the "selects"
    }
        valueCheckbox = null
        let checkbox = row.querySelector('.form-check-input') // Gets the checkbox
        checkbox.removeAttribute('disabled', true)
        valueCheckbox = checkbox.checked
}
        function DeleteRow(but) {
            /////////////////////////////////////////
            //// BUSINESS INTELLIGENCE NETWORK
            ////////////////////////////////////////
            (async () => {
                const result = await b_confirm('CONFERMA CANCELLAZIONE') // Opens the modal and waits for the returned value
                if (result == true) {
                    var $row = $(but).parents('tr');
                    params.onBeforeDelete($row);
                    $row.remove(); // Delete current row
                    params.onDelete();
                    $('#myModal').modal('hide');
                } else {
                    $('#myModal').modal('hide');
                }
            })()
        }
        function AddNewRow(tabId) {  // Add row to the indicated table.
    var $tab_en_edic = $("#" + tabId);  // Table to edit
        var $filas = $tab_en_edic.find('tbody tr');
        if ($filas.length == 0) {
        // No data rows. Need to create them completely
        var $row = $tab_en_edic.find('thead tr');  // Header
        var $cols = $row.find('th');  // Read fields
        // Build html
        var htmlDat = '';
        $cols.each(function () {
            if ($(this).attr('name') == 'buttons') {
            // Button column
            htmlDat = htmlDat + colEdicHtml;  // Add buttons
            } else {
            htmlDat = htmlDat + '<td></td>';
            }
        });
        $tab_en_edic.find('tbody').append('<tr>' + htmlDat + '</tr>');
    } else {
        // Other rows exist, can clone the last row to copy buttons
        var $ultFila = $tab_en_edic.find('tr:last');
        $ultFila.clone().appendTo($ultFila.parent());
        $ultFila = $tab_en_edic.find('tr:last');
        var $cols = $ultFila.find('td');  // Read fields
        $cols.each(function () {
            if ($(this).attr('name') == 'buttons') {
            // Button column
        } else {
            $(this).html('');  // Clear content
            }
        });
    }
        params.onAdd();
}
        function TableToCSV(tabId, separator) {  // Convert table to CSV
        var datFil = '';
        var tmp = '';
        var $tab_en_edic = $("#" + tabId);  // Table source
        $tab_en_edic.find('tbody tr').each(function () {
        // Ends edition if exists
        if (EditionMode($(this))) {
            $(this).find('#bAcep').click();  // Accept edition
        }
        var $cols = $(this).find('td');  // Read fields
        datFil = '';
        $cols.each(function () {
            if ($(this).attr('name') == 'buttons') {
            // Button column
        } else {
            datFil = datFil + $(this).html() + separator;
            }
        });
        if (datFil != '') {
            datFil = datFil.substring(0, datFil.length - separator.length);
        }
        tmp = tmp + datFil + '\n';
    });
        return tmp;
}



//apply
$("#table-list").SetEditable({
    $addButton: $('#add')
});
