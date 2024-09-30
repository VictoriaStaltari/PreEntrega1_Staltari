const socket = io()
console.log(socket)

let user;
const inputbox = document.getElementById('inputbox')
const conversation = document.getElementById('conversation')

Swal.fire({
    title:"Identifícate",
    icon:"question",
    input:"text",
    inputValidator: (value) =>{
        if(!value) {
            return "¡Necesitas identificarte para participar!";
        }
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then((response)=>{
    user = response.value;
    socket.emit('authenticated',user);
})

inputbox.addEventListener('keyup',(evt)=>{
    if(evt.key=='Enter'){
        socket.emit('message', {user:user,message:inputbox.value})
        inputbox.value = ''
    }
})

socket.on('newuser',data=>{
    if(data && user){
        Swal.fire({
            text:`${data} se ha unido al chat`,
            toast:true,
            position:'top-right'
        })
    }
})

socket.on('logs',data=>{
    let message=``
    if(user){
        data.forEach(msg => {
            message += `${msg.user}: ${msg.message} </br>`
        });
        console.log(data)
        conversation.innerHTML = message
    }
})