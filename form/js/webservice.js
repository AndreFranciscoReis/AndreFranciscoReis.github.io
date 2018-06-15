$(document).ready(function() {
    $('#getData').on("click", function() {

        // BELOW I NEED TO ADD PARAMETERS, BUT I DONT KNOW HOW

        var soapEnv =
            "<soap:Envelope xmlns:soap= 'http://www.w3.org/2003/05/soap-envelope ' xmlns:wsa= 'http://schemas.xmlsoap.org/ws/2004/08/addressing ' xmlns:wsse= 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd ' xmlns:wsu= 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd ' xmlns:xsd= 'http://www.w3.org/2001/XMLSchema ' xmlns:xsi= 'http://www.w3.org/2001/XMLSchema-instance '>\
              <env:Header xmlns:env= 'http://www.w3.org/2003/05/soap-envelope '>\
                <wsa:Action>http://www.ehealth.admin.ch/xmlns/vk-adm/1/getCardInformation</wsa:Action>\
                <wsa:MessageID>urn:uuid:c62dff7b-bf8f-42fa-a88b-891992d1a431</wsa:MessageID>\
                <wsa:ReplyTo>\
                  <wsa:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</wsa:Address>\
                </wsa:ReplyTo>\
                <wsa:To>https://owspap13.go4ksow.net/MSHospitalServer/Vk1Service12</wsa:To>\
                <wsse:Security env:mustUnderstand='true'>\
                  <wsu:Timestamp wsu:Id='Timestamp-42a4f5a0-d9d9-49d4-80c3-2f4969c71dd2'>\
                    <wsu:Created>2018-05-15T14:42:07Z</wsu:Created>\
                    <wsu:Expires>2018-05-15T14:47:07Z</wsu:Expires>\
                  </wsu:Timestamp>\
                  <wsse:UsernameToken wsu:Id='SecurityToken-61407b49-3620-4744-8ae7-49ec62ddf384' xmlns:wsu='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd'>\
                    <wsse:Username>genolier</wsse:Username>\
                    <wsse:Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>FP48!ksmAWD</wsse:Password>\
                    <wsse:Nonce>XXXXXXXXXXXXXXX</wsse:Nonce>\
                    <wsu:Created>2018-05-15T14:42:07Z</wsu:Created>\
                  </wsse:UsernameToken>\
                </wsse:Security>\
              </env:Header>\
              <soap:Body>\
                <inputData xmlns='http://www.medidata.ch/xmlns/ms-echx-cardinfo/1'>\
                  <cardNo>\
                    <vekaNo xmlns='http://www.medidata.ch/xmlns/ms-echx-cardinfo/xsd/1'>80756015750001697768</vekaNo>\
                  </cardNo>\
                  <ZSRno>B708006</ZSRno>\
                  <additionalInputData>\
                    <performanceDate xmlns='http://www.medidata.ch/xmlns/ms-echx-cardinfo/xsd/1'>2018-05-15</performanceDate>\
                    <loginName xmlns='http://www.medidata.ch/xmlns/ms-echx-cardinfo/xsd/1'>WE025\support</loginName>\
                  </additionalInputData>\
                </inputData>\
              </soap:Body>\
            </soap:Envelope>";

        $.ajax({
            url: "https://sc005797.aevisintra.ch:443/MSHospitalServer/Vk1Service12?wsdl",
            type: "POST",
            dataType: "xml",
            headers: {
              //"Authorization": "Basic " + btoa(genolier+":"+FP48!ksmAWD)
              "Authorization": "Basic genolier:FP48!ksmAWD"
            },
            data: { xml: escape(soapEnv) },
            contentType: "text/xml; charset=\"utf-8\""
        });
    })
});