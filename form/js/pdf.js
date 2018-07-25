$(document).ready(function() {
    $('.pdf').on("click", function() {
        var docDefinition = {
            content: [
                /*
                  FORMAT EXAMPLE 

                    { text: "No. Assurance\n\n", style: 'formElemName' },
                    {
                      columns: [
                        [
                            {text: 'Patient Data\n\n', style: 'subTitleElem'},
                            {text: 'Prénom'},
                            {
                          style: 'tableExample',
                          table: {
                              widths: [200],
                            body: [
                                [
                                    {text: 'André', style: "row", border: [false, false, false, false]}
                                ]
                            ]
                          }
                        },
                        "\n",
                        {text: 'Nom'},
                            {
                          style: 'tableExample',
                          table: {
                              widths: [200],
                            body: [
                                [
                                    {text: 'Reis', style: "row", border: [false, false, false, false]}
                                ]
                            ]
                          }
                        },
                            
                        ],
                        [
                            {text: 'Personne de Contact\n\n', style: 'subTitleElem'},
                            {text: 'Nom'},
                            {
                          style: 'tableExample',
                          table: {
                              widths: [200],
                            body: [
                              [
                                  {text: 'John', style: "row", border: [false, false, false, false]}
                              ],
                            ]
                          }
                        },
                        ],
                      ]
                    },
                    { text: "No. Assurance\n\n", style: 'formElemName', pageBreak: 'before' },
                    {
                      columns: [
                        [
                            {text: 'Patient Data\n\n', style: 'subTitleElem'},
                            {text: 'Prénom'},
                            {
                          style: 'tableExample',
                          table: {
                              widths: [200],
                            body: [
                                [
                                    {text: 'André', style: "row", border: [false, false, false, false]}
                                ]
                            ]
                          }
                        },
                        "\n",
                        {text: 'Nom'},
                            {
                          style: 'tableExample',
                          table: {
                              widths: [200],
                            body: [
                                [
                                    {text: 'Reis', style: "row", border: [false, false, false, false]}
                                ]
                            ]
                          }
                        },
                            
                        ],
                        [
                            {text: 'Personne de Contact\n\n', style: 'subTitleElem'},
                            {text: 'Nom'},
                            {
                          style: 'tableExample',
                          table: {
                              widths: [200],
                            body: [
                              [
                                  {text: 'John', style: "row", border: [false, false, false, false]}
                              ],
                            ]
                          }
                        },
                        ],
                      ]
                    },*/
            ],
            styles: {
                formElemName: {
                    color: "#00356A",
                    fontFamily: "Helvetica Neue",
                    fontSize: 17,
                    fontWeight: "bold",
                    alignment: 'center'
                },
                subTitleElem: {
                    color: "#00356A",
                    fontFamily: "Helvetica Neue",
                    fontSize: 14,
                    alignment: 'left'
                },
                row: {
                    margin: [0, 0, 0, 0],
                    fillColor: '#eeeeee',
                },
            }
        };

        // Get the navigation bar titles
        var blocks = document.getElementById('progressbar').getElementsByTagName('p');

        // Get all fieldsets from form
        var fieldsets = document.forms[0].getElementsByTagName('FIELDSET');
        var fieldsets = [fieldsets[0]];

        // Loop through the fieldsets
        for (var x = 0; x < fieldsets.length ; x++) {
            var fieldset = fieldsets[x];

            // Get the direct children from the fieldset
            // - Div class="row"
            // - Input (will have 2 or more of these)
            var row = fieldset.children;

            // We can ignore the Inputs as we only want the children from the Div
            var rowChild = row[0].children;

            // Get the div with the left content
            var leftColumn = rowChild[0];

            // Get the div with the right content, if exits
            var rightColumn = rowChild.length > 0 ? rowChild[1] : null;

            // Get the direct children from the left side
            var leftColumnChilds = leftColumn.children;
            // Get the direct children from the right side if there's one
            var rightColumnChilds = rightColumn != null ? rightColumn.children : 0;

            // Add the main title (from the navigation bar) and the two columns
            if (x == 0)
                docDefinition.content.push({ text: blocks[x].innerHTML + "\n\n", style: 'formElemName' });
            else
                docDefinition.content.push({ text: blocks[x].innerHTML + "\n\n", style: 'formElemName', pageBreak: 'before' });

            docDefinition.content.push({ columns: [
                    [],
                    []
                ] });

            // Get the array from the left and right columns to populate
            var leftColumnArr = docDefinition.content[docDefinition.content.length - 1].columns[0];
            var rightColumnArr = docDefinition.content[docDefinition.content.length - 1].columns[1];

            buildColumn(leftColumnChilds, leftColumnArr);
            buildColumn(rightColumnChilds, rightColumnArr);
        }

        pdfMake.createPdf(docDefinition).open();
    });

    function buildColumn(columnChilds, columnArr) {
        // Loop through the left children
        for (var c = 0; c < columnChilds.length; c++) {
            var child = columnChilds[c];

            if(child.nodeName == "BR")
              continue; 

            var childLabel = child.children[0];
            var childValue = child.children[1];

            var isRadio = false;
            var isDropdown = false;

            // If it's an H1 it means it's a sub-title
            // If it's not it's labels and text fields/radio buttons/dropdowns/etc
            if (child.nodeName == "H1") {
                columnArr.push({ text: child.innerHTML + '\n\n', style: 'subTitleElem' });
            } else {

                if (child.classList.contains("row")) {
                    buildColumn(child.children, columnArr);
                    continue;
                }

                if (checkRadioOrDropDown(child, "radio")) {
                    childLabel = child.children[0];
                    childValue = child.children[1];

                    var radiobtns = childValue.children;
                    for (var r = 0, length = radiobtns.length; r < length; r++) {
                        //alert("Checked? "+radiobtns[r].children[0].checked+" | "+radiobtns[r].children[0].value);
                        if (radiobtns[r].children[0].checked) {
                            childValue = radiobtns[r].children[0];
                            break;
                        }
                    }

                    isRadio = true;
                } 

                if (checkRadioOrDropDown(child, "dropdown")) {
                    childLabel = child.children[0];
                    childValue = child.children[1];

                    childValue = childValue.children[0][childValue.children[0].selectedIndex];

                    isDropdown = true;
                }

                if (childLabel.nodeName == "INPUT") {
                    columnArr.push({ text: childLabel.value });
                } else {
                    columnArr.push({ text: childLabel.innerHTML });
                }

                //alert(child.children[1].value+"\nEmpty? "+(child.children[1].value == "")+"\nNull? "+(child.children[1].value == null))
                if (childValue.value && childValue.value != "" && childValue.value != undefined && childValue.value != "undefined" && childValue.value != null) {
                    //alert(childValue.value + " [" + childValue.type + "]: " + (childValue.value == "undefined") + " || " + (childValue.value == undefined) + " || " + (childValue.value === undefined) + " || " + (childValue.value === "undefined"));
                    childValue = childValue.value;
                } else {
                    childValue = " ";
                }


                columnArr.push({ style: 'tableExample', table: { widths: [200], body: [
                            [{ text: childValue, style: "row", border: [false, false, false, false] }]
                        ] } });
                columnArr.push("\n");
            }
        }
    }

    function checkRadioOrDropDown(child, elemType) {
        //alert("Node: " + child.nodeName + "\nIs Lable? " + child.children[0].nodeName + "\nIs Div? " + child.children[1].nodeName + "\nClass Radio? " + child.children[1].classList.contains("radio"));

        if (child.children[0].nodeName == "LABEL" && child.children[1].nodeName == "DIV" && child.children[1].classList.contains(elemType)) {
            return true;
        }

        return false;
    }

    // returns true if the element or one of its parents has the class classname
    function hasSomeParentTheClass(element, classname) {
        if (element.className && element.className.split(' ').indexOf(classname) >= 0) return true;
        return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
    }
});