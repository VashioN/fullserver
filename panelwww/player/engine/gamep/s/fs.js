﻿

(function($) {

jQuery.extend(jQuery.validator.messages, {
    required: "To pole jest wymagane.",
    remote: "Proszę o wypełnienie tego pola.",
    email: "Proszę o podanie prawidłowego adresu email.",
    url: "Proszę o podanie prawidłowego URL.",
    date: "Proszę o podanie prawidłowej daty.",
    dateISO: "Proszę o podanie prawidłowej daty (ISO).",
    number: "Proszę o podanie prawidłowej liczby.",
    digits: "Proszę o podanie samych cyfr.",
    creditcard: "Proszę o podanie prawidłowej karty kredytowej.",
    equalTo: "Proszę o podanie tej samej wartości ponownie.",
    accept: "Proszę o podanie wartości z prawidłowym rozszerzeniem.",
    maxlength: jQuery.validator.format("Nie więcej niż {0} znaków."),
    minlength: jQuery.validator.format("Minimalnie {0} znaków."),
    rangelength: jQuery.validator.format("Proszę o podanie wartości o długości od {0} do {1} znaków."),
    range: jQuery.validator.format("Proszę o podanie wartości z przedziału od {0} do {1}."),
    max: jQuery.validator.format("Proszę o podanie wartości mniejszej bądź równej {0}."),
    min: jQuery.validator.format("Proszę o podanie wartości większej bądź równej {0}.")
});
})();
																		
						    

function pokaz_pakiet() {
    $("#smsinfo h2,#smsinfo h3,#smsinfo h4").fadeOut(250,function(){
	var kod=$("select[name=gamep]>option:selected").attr('kod')
        $("#smsinfo h2").html(kod);
	var numer=$("select[name=gamep]>option:selected").attr('numer');
        $("#smsinfo h3").html(numer);
	var koszt=$("select[name=gamep]>option:selected").attr('koszt')+'zł';
        $("#smsinfo h4").html(koszt);
        $("#smsinfo img.qrcode").attr('src','http://chart.apis.google.com/chart?cht=qr&chs=120x120&chl=smsto%3A'+numer+'%3A'+kod)
        	.parent("a").attr('href','smsto:'+numer+':'+kod);
        $(this).fadeIn(250);
    });
    $("#smsinfo input[name=kod]").val('');
    if ($("#vipbuy input[name=nick]").val().length<3) $("#vipbuy").validate().element("input[name=nick]");														    
}
function vipbuy_submit() {
//    if (!$("#vipbuy").validate()) return false;
    $.post('/engine/gamep/index.php',$("form").serializeArray(),function(data) {
        $(data).prependTo("body:first").fadeIn(1000);
	    $("#vipinfo,#vipbuy").fadeOut(500);
	});
    
}
//$("form.validate").validate();

$(function() {
    // progrssbar
    $(".progressbar").each(function(){
	var prc=$(this).text().replace('%','');
	$(this).text('');
        $(this).progressbar({value: 15});
    });	
    $("form.validate").each(function(){
    $(this).validate({
		rules: {
			nick: {
				required: true,
				remote: "checknick.php"
			}
		},

		submitHandler: vipbuy_submit,
        ignore: ":disabled,:hidden",
        focusInvalid: false
        });
});
    
    pokaz_pakiet();
    // vipbuy

});