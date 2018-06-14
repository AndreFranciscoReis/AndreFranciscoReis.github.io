/**
*
* Simple jQuery Script to parse card data
* that was collected via a USB Magnetic Stripe 
* Card Reader.
* 
* To get this to work, focus your cursor (either 
* programmatically or via a click, it's your choice) on an input field #nCarte
* and then with the card reader plugged in, swipe
* the card and it will take over from there
*
*/


$(document).ready(function(){
  
  $('#nCarte').click(function(){
    
    //document.getElementById('SwipeNowAlert').innerHTML = 'You may now swipe.';
  
  }).blur(function(){
    
    document.getElementById('SwipeNowAlert').innerHTML = ' ';
    
  }).focus(function(){
    
    document.getElementById('SwipeNowAlert').innerHTML = 'Ready for card swipe';
    
  }).keyup(function(event) {
    
    if (event.keyCode == 13) {
      
      var ccNum =  $('#nCarte').val();
    
      var isCaretPresent = false;
      var isEqualPresent = false;
  
      if (ccNum.indexOf("^") != -1)
        isCaretPresent = true
      else
        isCaretPresent = false;
      
      if (ccNum.indexOf("=") != -1)
        isEqualPresent = true
      else
        isEqualPresent = false;
  
      //handle parsing differently depending on card format
      if (isCaretPresent) {
        
        var cardData = ccNum.split('^');
        
        $("#first-name").val(formatFirstName(cardData[1]));
        $("#last-name").val(formatLastName(cardData[1]));
      
        var decryptedCardNumber = formatCardNumber(cardData[0]);
        
        $("#card-number").val(decryptedCardNumber);
        $("#card-type").val(getCardType(decryptedCardNumber));
        
        $("#expiration-month").val(cardData[2].substring(2, 4));
        $("#expiration-year").val(cardData[2].substring(0, 2));
    
      
      } else if (isEqualPresent) {
        
        var cardData = ccNum.split('=');
        
        var decryptedCardNumber = formatCardNumber(cardData[0]);
        
        $("#CardNumber").val(decryptedCardNumber);
        $("#CardType").val(getCardType(decryptedCardNumber));
        
        $("#ExpirationMonth").val(cardData[2].substring(2, 4));
        $("#ExpirationYear").val(cardData[2].substring(0, 2));
      }
    
    } else {
      return true;
    }
  }); 
  
  
  function formatCardNumber(cardNum) {
    
    var result = "";
  
    result = cardNum.replace(/[^0-9]*/, "");
    
    return result;
  }
  
  function formatFirstName(name) {
    
    if (name.indexOf("/") != -1) {
      
      var nameSplit = name.split('/');
  
      return nameSplit[1];
      
    } else {
      return "";
    }
  }
  
  function FormatLastName(name) {
    
    if (name.indexOf("/") != -1) {
      
      var nameSplit = name.split('/');
  
      return nameSplit[0];
      
    } else {
      return "";
    }
  }
  
  function getCardType(number) {
    
    var re = new RegExp("^4");
    if (number.match(re) != null)
      return "Visa";
  
    re = new RegExp("^(34|37)");
    if (number.match(re) != null)
      return "American Express";
  
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null)
      return "MasterCard";
  
    re = new RegExp("^6011");
    if (number.match(re) != null)
      return "Discover";
  
    return "";
  }

});