/*
    Name: Truong-Thinh Huynh SID: 01981340
    GitHub Username: TruongHuynh01981340
*/

$(document).ready(function() {
    // https://jqueryvalidation.org/jQuery.validator.addMethod/
    // jQuery validator that checks whether min is less or equal to max.
    jQuery.validator.addMethod("validateMin", function(value, element, params) {
        const minInput = parseInt(value);
        const maxInput = parseInt($(params).val());
        
         // If either is NaN, this means that this validator doesn't apply so return before the wrong error msg is displayed.
        if (isNaN(minInput) || isNaN(maxInput)) {
            return true;
        }

        return minInput <= maxInput;
    }, "Invalid Input: Please enter a number less or equal to maximum value.");

    // jQuery validator that checks whether max is greater or equal to min.
    jQuery.validator.addMethod("validateMax", function(value, element, params) {
        const minInput = parseInt($(params).val());
        const maxInput = parseInt(value);
        
                // If either is NaN, this means that this validator doesn't apply so return before the wrong error msg is displayed.
        if (isNaN(minInput) || isNaN(maxInput)) {
            return true;
        }

        return maxInput >= minInput;
    }, "Invalid Input: Please enter a number greater or equal to minimum value.");

     // Form validator that checks for a required input, if it's a number, whether it's between -50 and 50, and must be less or equal to/greater or equal to min/max.
    $("#mulForm").validate({
        rules: {
            minColVal: {
                required: true,
                number: true,
                range: [-50, 50],
                // Call custom validator that checks for min and max to see if both are valid to each other.
                validateMin: "#maxColVal"
            },
            maxColVal: {
                required: true,
                number: true,
                range: [-50, 50],
                validateMax: "#minColVal"
            },
            minRowVal: {
                required: true,
                number: true,
                range: [-50, 50],
                validateMin: "#maxRowVal"
            },
            maxRowVal: {
                required: true,
                number: true,
                range: [-50, 50],
                validateMax: "#minRowVal"
            }
        },
        // Output error msg based on the reason the validator failed.
        messages: {
            minColVal: {
                required: "Invalid Input: Please enter a number.",
                number: "Invalid Input: Please enter a number.",
                range: "Invalid Input: Please enter a number between -50 to 50."
            },
            maxColVal: {
                required: "Invalid Input: Please enter a number.",
                number: "Invalid Input: Please enter a number.",
                range: "Invalid Input: Please enter a number between -50 to 50."
            },
            minRowVal: {
                required: "Invalid Input: Please enter a number.",
                number: "Invalid Input: Please enter a number.",
                range: "Invalid Input: Please enter a number between -50 to 50."
            },
            maxRowVal: {
                required: "Invalid Input: Please enter a number.",
                number: "Invalid Input: Please enter a number.",
                range: "Invalid Input: Please enter a number between -50 to 50."
            }
        },
        // Important on placing the error msg into span rather than a default view, which will mess up the layout of the program.
        // https://www.webcodegeeks.com/javascript/jquery/jquery-errorplacement-example/
        // https://www.educba.com/jquery-validate-errorplacement/
        errorPlacement: function(error, element) {
            const span = element.attr("id") + "ErrorMsg";
            $("#" + span).html(error);
            $("#" + span).css({"color": "red"});
        },
        submitHandler: function(form) {
            regenerateTable();
            return false;
        }
    })
})

function regenerateTable() {
    // Convert text inputs into numeric values.
    // https://api.jquery.com/val/
    var minColVal = parseInt($('#minColVal').val());
    var maxColVal = parseInt($('#maxColVal').val());
    var minRowVal = parseInt($('#minRowVal').val());
    var maxRowVal = parseInt($('#maxRowVal').val());

    // For debugging purposes
    // console.log(minColVal);
    // console.log(maxColVal);
    // console.log(minRowVal);
    // console.log(maxRowVal);

    const previousTable = $('#generatedTable');

    // If there's already a table being displayed, remove that so the new one will be display.
    if (previousTable.length) {
        previousTable.remove();
    }

    // This div will be for making the table scrollable. Right now, we will add all table elements into this div.
    const tableDiv = $('#tableDiv');

    const table = $("<table id='generatedTable'></table>").css("border", "1px solid black");

    const row = $("<tr>");
    // This lone th is for making an empty spot in the first row and column of the table
    const th = $("<th>");

    // Add the th to the first row.
    row.append(th);

    // This for loop is use to make the header that display the min to max to the first row.
    // Very important source: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
    for (let i = minColVal; i <= maxColVal; i++) {
        const th = $("<th>");
        th.text(i);
        row.append(th);
    }

    // Add it to the table.
    table.append(row);

    // This nested for loops is to generate the rest of the table.
    for (let i = minRowVal; i <= maxRowVal; i++) {
        const row = $("<tr>");
        const th = $("<th>");
        th.text(i);
        row.append(th);

        for (let j = minColVal; j <= maxColVal; j++) {
            const td = $("<td>");
            td.text(i * j);
            row.append(td);
        }

        table.append(row);
    }

    // Add table to the div.
    tableDiv.append(table);
}   