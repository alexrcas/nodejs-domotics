console.log('ejecutando script');

let socket = io();

$('.switch').on('click', () => {
    socket.emit('toggle');
})

socket.on('status', (data) => {
    console.log('status', data)
    if (data == 1) {
        $('.switch').removeClass('btn-danger');
        $('.switch').addClass('btn-success');
        $('.switch').text('On');
    }
    else {
        $('.switch').removeClass('btn-success');
        $('.switch').addClass('btn-danger');
        $('.switch').text('Off');

    }
});

socket.on('toggleResponse', (data) => {
    console.log(data)
});