  
  $(document).ready(function() {

      $('.diagnosticList').select2();

      $('input[type="radio"]').on('change', function(e) {
        $(this).checked="checked";
      });

      $('.scrollUp').on("click", function() {
        document.getElementById('scrollHere').scrollIntoView();
      });

      document.getElementById('nCarte').addEventListener('input', function(c) {
          var targetC = c.target,
              positionC = targetC.selectionEnd,
              lengthC = targetC.value.length;

          targetC.value = targetC.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
          targetC.selectionEnd = positionC += ((targetC.value.charAt(positionC - 1) === ' ' && targetC.value.charAt(lengthC - 1) === ' ' && lengthC !== targetC.value.length) ? 1 : 0);
      });

      /*
      This will give an error because nAvs is not set at this time
      document.getElementById('nAvs').addEventListener('input', function(e) {
          var target = e.target,
              position = target.selectionEnd,
              length = target.value.length;

          target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
          target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
      });

      document.getElementById('base_ofas').addEventListener('input', function(e) {
          var target = e.target,
              position = target.selectionEnd,
              length = target.value.length;

          target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
          target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
      });

      document.getElementById('compl_ofas').addEventListener('input', function(e) {
          var target = e.target,
              position = target.selectionEnd,
              length = target.value.length;

          target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
          target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
      });*/

      //jQuery time
      var current_fs, next_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches


      $('.next').on("click", function() {
          var validator = $('#contact_form').data('bootstrapValidator');
          validator.validate();

          if (validator.isValid()) {

              if (animating) return false;
              animating = true;

              current_fs = $(this).parent();
              next_fs = $(this).parent().next();

              //activate next step on progressbar using the index of next_fs
              $("#progressbar p").eq($("fieldset").index(next_fs)).addClass("active");

              //show the next fieldset
              next_fs.show();
              //hide the current fieldset with style
              current_fs.animate({
                  opacity: 0
              }, {
                  step: function(now, mx) {
                      //as the opacity of current_fs reduces to 0 - stored in "now"
                      //1. scale current_fs down to 80%
                      scale = 1 - (1 - now) * 0.2;
                      //2. bring next_fs from the right(50%)
                      left = (now * 50) + "%";
                      //3. increase opacity of next_fs to 1 as it moves in
                      opacity = 1 - now;
                      current_fs.css({
                          'transform': 'scale(' + scale + ')',
                          'position': 'relative'
                      });
                      next_fs.css({
                          'left': left,
                          'opacity': opacity
                      });
                  },
                  duration: 0,
                  complete: function() {
                      current_fs.hide();
                      animating = false;
                  },
                  //this comes from the custom easing plugin
                  easing: 'easeInOutBack'
                  
              });

          }
      });
      $(".previous").click(function() {
          if (animating) return false;
          animating = true;

          current_fs = $(this).parent();
          previous_fs = $(this).parent().prev();

          //de-activate current step on progressbar
          $("#progressbar p").eq($("fieldset").index(current_fs)).removeClass("active");

          //show the previous fieldset
          previous_fs.show();
          //hide the current fieldset with style
          current_fs.animate({
              opacity: 0
          }, {
              step: function(now, mx) {
                  //as the opacity of current_fs reduces to 0 - stored in "now"
                  //1. scale previous_fs from 80% to 100%
                  scale = 0.8 + (1 - now) * 0.2;
                  //2. take current_fs to the right(50%) - from 0%
                  left = ((1 - now) * 50) + "%";
                  //3. increase opacity of previous_fs to 1 as it moves in
                  opacity = 1 - now;
                  current_fs.css({
                      'left': left
                  });
                  previous_fs.css({
                      'transform': 'scale(' + scale + ')',
                      'opacity': opacity
                  });
              },
              duration: 0,
              complete: function() {
                  current_fs.hide();
                  animating = false;
              },
              //this comes from the custom easing plugin
              easing: 'easeInOutBack'
          });
          window.scrollTo(0, 135);
      });
      $(".submit").click(function() {
          return false;
      })
      ValidateForm();
  });

    function hospExtraFields(that) {
        if (that.value == "hospitalisation") {
            document.getElementById("showHospOptions").style.display = "block";
        } else {
            document.getElementById("showHospOptions").style.display = "none";
        }
    }

    function typeExtraFields(that) {
        if (that.value == "maladieLAA" || that.value == "accidentLAA") {
            document.getElementById("showTypeOptions").style.display = "block";
        } else {
            document.getElementById("showTypeOptions").style.display = "none";
        }
    } 

    function classeExtraFields(that) {
        if (that.value == "prive" || that.value == "demiPrive") {
            document.getElementById("showClasseOptions").style.display = "block";
        } else {
            document.getElementById("showClasseOptions").style.display = "none";
        }
    }

  function ValidateForm() {
      $('#contact_form').bootstrapValidator({
          framework: 'bootstrap',
          // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
          icon: {
              valid: 'glyphicon glyphicon-ok',
              invalid: 'glyphicon glyphicon-remove',
              validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
              nCarte: {
                  message: 'The Assurance number is not valid',
                  validators: {
                      stringLength: {
                          min: 24,
                          max: 24,
                          message: 'The Assurance number must contain 20 numbers. '
                      },
                      regexp: {
                          regexp: /^[0-9 ]+$/,
                          message: 'The Assurance number can only contain numbers. '
                      }
                  }
              },
              prenom: {
                  message: 'Prénom is not valid',
                  validators: {
                      notEmpty: {
                          message: 'Prénom is required and cannot be empty'
                      },
                      regexp: {
                          regexp: /^[a-zA-Z0-9]+$/,
                          message: 'Prénom can only consist of alphabetical and number'
                      }
                  }
              },
              nom: {
                  message: 'Nom is not valid',
                  validators: {
                      notEmpty: {
                          message: 'Nom is required and cannot be empty'
                      },
                      regexp: {
                          regexp: /^[a-zA-Z0-9]+$/,
                          message: 'Nom can only consist of alphabetical and number'
                      }
                  }
              },
              _email: {
                  validators: {
                      notEmpty: {
                          message: 'The email address is required and cannot be empty'
                      },
                      emailAddress: {
                          message: 'The email address is not a valid'
                      }
                  }
              },
              birthDate: {
                  validators: {
                      date: {
                          message: 'The date of birth is not valid',
                          format: 'DD.MM.YYYY',
                          separator: '.'
                      }
                  }
              },
              gender: {
                  validators: {
                      notEmpty: {
                          message: 'The gender is required'
                      }
                  }
              },
              nAvs: {
                  message: 'The AVS number is not valid',
                  validators: {
                      stringLength: {
                          min: 24,
                          max: 24,
                          message: 'The AVS number must contain 20 numbers'
                      },
                      regexp: {
                          regexp: /^[0-9 ]+$/,
                          message: 'The AV number can only contain numbers'
                      }
                  }
              },
              assuranceBASE_OFAS: {
                  message: 'The Asurance Base Nº OFAS is not valid',
                  validators: {
                      stringLength: {
                          min: 24,
                          max: 24,
                          message: 'The Asurance Base Nº OFAS must contain 20 numbers'
                      },
                      regexp: {
                          regexp: /^[0-9 ]+$/,
                          message: 'The Asurance Base Nº OFAS can only contain numbers'
                      },
                      different: {
                          field: 'assuranceCOMPL_OFAS',
                          message: 'The Asurance Base Nº OFAS and Asurance COMPL Nº OFAS cannot be the'
                      }
                  }
              },
              assuranceCOMPL_OFAS: {
                  message: 'The Asurance COMPL Nº OFAS is not valid',
                  validators: {
                      stringLength: {
                          min: 24,
                          max: 24,
                          message: 'The Asurance COMPL Nº OFAS must contain 20 numbers'
                      },
                      regexp: {
                          regexp: /^[0-9 ]+$/,
                          message: 'The Asurance COMPL Nº OFAS can only contain numbers'
                      },
                      different: {
                          field: 'assuranceBASE_OFAS',
                          message: 'The Asurance Base Nº OFAS and Asurance COMPL Nº OFAS cannot be the'
                      }
                  }
              }
          }
      });
  }
