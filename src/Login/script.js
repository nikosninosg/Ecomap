let state = 0;
let btn1 = $('#login-button'); 
let btn2 = $('#register-button');
btn2.click(function(){
	if(state == 0){
		$('#register').collapse('toggle');
		btn2.html("<i class=\"fa fas fa-long-arrow-alt-left\"></i>");
		btn1.text("Register");
		state = 1;
	}else{
		$('#register').collapse('toggle');
		btn2.text("Register");
		btn1.text("Login");
		state = 0;
		
	}
});
