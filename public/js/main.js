const nameInput = document.getElementById('name'),
      emailInput = document.getElementById('email'),
      phoneInput = document.getElementById('phone'),
      chkinInput = document.getElementById('chkin'),
      chkoutInput = document.getElementById('chkout'),
      button = document.getElementById('button'),
     response = document.querySelector('.response');

button.addEventListener('click', send, false);

/*const socket = io();
socket.on('smsStatus', function(data){
  if(data.error){
    response.innerHTML = '<h5>Text message sent to ' + data.error + '</h5>';
  }else{
    response.innerHTML = '<h5>Text message sent to ' + data.number + '</h5>';
  }
});

let timeOut;
const getTimeSchedule = ({ time, number, text }) => {
  if(timeOut) clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    fetchServer({ number, text });
  }, time * 60 * 1000);
};

const fetchServer = ({ number, text }) => {
  console.log('send');
  fetch('/', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ number, text })
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
};*/

function send() {
  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const chkin =chkinInput.value;
  const chkout=chkoutInput.value;

  fetch('/',{
    method: 'post',
    headers: {
        'Content-type':'application/json'
    },
    body:JSON.stringify({name:name,email: email,phone : phone,chkin : chkin,chkout : chkout}) 
  })
  .then(function(res){
      console.log(res);
  })
  .catch(function(err){
    console.log(err);
  });
  
}