console.log('ejecutando script');



let socket = io();


socket.on('status', (data) => {

    let [id, status] = data.split(',')
    if (status == 1) {
        $('#' + id).removeClass('btn-danger');
        $('#' + id).addClass('btn-success');
        $('#' + id).text('On');
    }
    else {
        $('#' + id).removeClass('btn-success');
        $('#' + id).addClass('btn-danger');
        $('#' + id).text('Off');
    }
});


socket.emit('handshake');
socket.on('getSlaves', data => {

    data.forEach(element => {

        let btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('switch');
        btn.id = element.id;
        $('.main').append(btn);
    });

    $('.switch').click( (e) => {
        socket.emit('toggle', e.target.id);
    });
});