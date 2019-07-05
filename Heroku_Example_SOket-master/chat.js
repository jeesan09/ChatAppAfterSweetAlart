var socket =io.connect('http://localhost:3000');


//Dom Traavrsel
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback = document.getElementById('feedback');

//speech recognization

 




  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.maxAlternatives = 2;
  recognition.lang = 'en-US';
  
  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);
  








  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
     
    
      if (e.results[0].isFinal) {
       

   socket.emit('chat', {

      message:transcript,
      handle: handle.value
  });


 }



  });
  recognition.addEventListener('end', recognition.start);
  recognition.start();

// Emit events


btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

//listening for typing keypress event
message.addEventListener('keypress', function(){

	if(message.value!=''){

		socket.emit('typing', handle.value);
	}
    else{
    	feedback.innerHTML = '';
    }
});

/*
//listening for typing keyup event
message.addEventListener('keydown',typing_quit );


*/
// Listen for events
socket.on('chat', function(data){

	feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});      


//typing on other tabs
socket.on('typing', function(data){

	
  
                   
   feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'; 
	
   
});
