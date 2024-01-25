window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

addEventListener('keyup', e => {
    const key = e.key.toLocaleLowerCase();
    switch(key) {
        case 'l':
            set_game_action('look');
            return;
        case 'u':
            set_game_action('use');
            return;
        case 't':
            set_game_action('talk');
            return;
        case 'u':
            set_game_action('use');
            return;
        case 'h':
            set_game_action('help');
            return;
        case '1':
            set_game_topic(1);
            return;
        case '2':
            set_game_topic(2);
            return;
        case '3':
            set_game_topic(3);
            return;
        case '4':
            set_game_topic(4);
            return;
        case '5':
            set_game_topic(5);
            return;
        case '6':
            set_game_topic(6);
            return;
        case '7':
            set_game_topic(7);
            return;
        case '8':
            set_game_topic(8);
            return;
        case '9':
            set_game_topic(9);
            return;
        case 'enter':
            execute_action();
            return;
        case 'backspace':
            backspace_action();
            return;
        case 'a':
            set_game_action('west')
            return;
        case 'arrowleft':
            set_game_action('west')
            return;
        case 'd':
            set_game_action('east')
            return;
        case 'arrowright':
            set_game_action('east')
            return;
        case 'w':
            set_game_action('north')
            return;
        case 'arrowup':
            set_game_action('north')
            return;
        case 's':
            set_game_action('south')
            return;
        case 'arrowdown':
            set_game_action('south')
            return;
    }
});