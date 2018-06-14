$(document).ready(function() {
    $('.pdf').on("click", function() {
        var docDefinition = {
            content: [
                /*// if you don't need styles, you can use a simple string to define a paragraph
                'This is a standard paragraph, using default style',

                // using a { text: '...' } object lets you set styling properties
                { text: 'This paragraph will have a bigger font', fontSize: 15 },

                // if you set pass an array instead of a string, you'll be able
                // to style any fragment individually
                {
                    text: [
                        'This paragraph is defined as an array of elements to make it possible to ',
                        { text: 'restyle part of it and make it bigger ', fontSize: 15 },
                        'than the rest.'
                    ]
                }*/
            ],
            styles: {
                formElemName: {
                    color: "#00356A",
                    fontFamily: "Helvetica Neue",
                    fontSize: 17,
                    fontWeight: "bold",
                    alignment: 'center'
                }
            }

        };

        var blocks = document.getElementById('progressbar').getElementsByTagName('p');
        var fieldsets = document.forms[0].getElementsByTagName('FIELDSET');

        for(var b=0; b < blocks.length; b++) {
            docDefinition.content.push([{ text: blocks[b].innerHTML, style: 'formElemName' }]);
        }

        /*var contentIndex = 1;
        for (var x = 0; x < fieldsets.length; x++) {
          fieldsets[x]..getElementsByTagName('div')







            if(x>0) {
              contentIndex += 2;
            }

            // Add the H1 from the fieldset
            h1Field = fieldsets[x].getElementsByTagName('h1');
            docDefinition.content.push({ text: h1Field[0].innerHTML, style: 'formElemName' });

            // Add 2 columns for each Right and Left side
            docDefinition.content.push({ columns: [] });
            // Add tables so we just have two columns
            docDefinition.content[contentIndex].columns.push([]);
            docDefinition.content[contentIndex].columns.push([]);

            labelField = fieldsets[x].getElementsByTagName('label');
            inputField = fieldsets[x].getElementsByTagName('input');

            //alert("fieldsets: "+fieldsets.length+" | x: "+x+" | contentIndex: "+contentIndex+"\nLabels: "+labelField.length);
            for (var l = 0; l < labelField.length; l++) {
                var columnIndex = 0;
                if(hasSomeParentTheClass(labelField[l], "form-right")) {
                    columnIndex = 1;
                } 
                if (inputField[l] && inputField[l].type != "button") {
                    docDefinition.content[contentIndex].columns[columnIndex].push(
                        
                            { text: labelField[l].innerHTML },
                            
                    );
                }
            }
        }*/

        pdfMake.createPdf(docDefinition).open();
    });

    // returns true if the element or one of its parents has the class classname
    function hasSomeParentTheClass(element, classname) {
        if (element.className && element.className.split(' ').indexOf(classname)>=0) return true;
        return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
    }
});