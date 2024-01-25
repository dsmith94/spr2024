
function look(action) {
    const a = {
        preview: 'Look Around',
        action
    }
    Game['actions']['look'] = a;
}


function check(action) {
    const a = {
        preview: "Continue",
        action
    }
    Game['actions']['continue'] = a;
}


function use(preview, action) {
    const a = {
        preview,
        action
    }
    Game['actions']['use'] = a;
}


function talk(preview, action) {
    const a = {
        preview,
        action
    }
    Game['actions']['talk'] = a;
}


function help(preview, action) {
    const a = {
        preview,
        action
    }
    Game['actions']['help'] = a;
}


function north(preview, action) {
    const a = {
        preview,
        action
    }
    Game['actions']['north'] = a;
}


function west(preview, action) {
    const a = {
        preview,
        action
    }
    Game['actions']['west'] = a;
}


function east(preview, action) {
    const a = {
        preview,
        action
    }
    Game['actions']['east'] = a;
}


function south(preview, action) {
    const a = {
        preview,
        action
    }
    Game['actions']['south'] = a;
}


function header(content) {
    Game.header = content;
}


function desc(content) {
    Game.desc = content;
}


function showDesc() {
    msg(Game.desc());
}



function set_game_action(a) {
    if (Game['actions'][a]) {
        try {
            const input = Game['actions'][a]['preview'];
            if (input) {
                Game.input = input;
                Game.command = a;
                refresh();
            }    
        } catch {
            console.log(`Action ${a} not implemented`)
        }    
    }
}


function set_game_topic(t) {

    if (Game.topics[t]) {

        const input = Game['topics'][t]['preview'];
        if (input) {
            Game.input = input;
            Game.command = t;
            refresh();
        }    
    }

}


function topics(t) {
    Game.topics = t;
}


function backspace_action() {
    Game.input = '';
    Game.command = '';
    refresh();
}



function execute_action() {
    const c = document.querySelector('#console');
    const i = Game.input;
    let a = Game.command;
    if (Game.input) {
        c.append(previous_command_line(i));
        let content = '';
        if (Number.isInteger(a)) {
            content = Game['topics'][a]['action']();
        } else {
            content = Game['actions'][a]['action']();
        }
        Game.input = '';
        Game.command = '';
        msg(content);
        refresh();    
    }
}



function create_button(cls, icn, func) {
    const div = document.createElement('div');
    div.className = 'button-group';
    const b = document.createElement('button');
    b.className = cls;
    b.onclick = () => {
        func();
    }
    const s1 = document.createElement('span');
    s1.className = "material-icons-round";
    const s2 = document.createElement('span');
    s2.className = "icon";
    s2.append(icn);
    s1.append(s2);
    b.append(s1);
    div.append(b);
    if (icn === 'search') {
        div.append('Look');
    }
    if (icn === 'back_hand') {
        div.append('Use');
    }
    if (icn === 'chat') {
        div.append('Talk');
    }
    if (icn === 'help') {
        div.append('Help');
    }
    if (icn === 'check') {
        div.append('Continue');
    }
    return div;
}



function create_topic_button(topic, index, func) {
    const div = document.createElement('div');
    div.className = 'button-group';
    const b = document.createElement('button');
    b.className = 'topic';
    b.onclick = () => {
        console.log(index)
        func();
    }
    b.append(topic.word);
    div.append(b);
    div.append(`${index + 1}`);
    return div;
}



function create_console_icons(icn, func) {
    const b = document.createElement('button');
    b.className = 'console';
    b.onclick = () => {
        func();
    }
    const s1 = document.createElement('span');
    s1.className = "material-icons-round";
    const s2 = document.createElement('span');
    s2.className = "console-icon";
    s2.append(icn);
    s1.append(s2);
    b.append(s1);
    return b;
}


function update_header() {
    const h = document.getElementById("header")
    h.innerHTML = '';
    if (Game.header) {
        const div = document.createElement('div');
        div.append(Game.header)
        const score = document.createElement('div');
        score.append(Game.score)
        h.append(div)
        h.append(score)    
    }
}


function remove_control_box() {
    const c = document.getElementById("control-box")
    if (c) {
        c.remove();
    }
}


function action_row() {
    const div = document.createElement('div');
    div.className = 'actions';
    const b1 = create_button('action', 'search', () => set_game_action('look'))
    const b2 = create_button('action', 'back_hand', () => set_game_action('use'))
    const b3 = create_button('action', 'chat', () => set_game_action('talk'))
    const b4 = create_button('action', 'help', () => set_game_action('help'))
    div.append(b1);
    div.append(b2);
    div.append(b3);
    div.append(b4);
    return div;
}


function direction_row() {
    const div = document.createElement('div');
    div.className = 'directions';
    const b1 = create_button('direction', 'north', () => set_game_action('north'))
    const b2 = create_button('direction', 'south', () => set_game_action('south'))
    const b3 = create_button('direction', 'west', () => set_game_action('west'))
    const b4 = create_button('direction', 'east', () => set_game_action('east'))
    div.append(b1);
    div.append(b2);
    div.append(b3);
    div.append(b4);
    return div;
}


function topic_row() {
    const div = document.createElement('div');
    div.className = 'topics';
    for (let i = 0; i < Game.topics.length; i += 1) {
        const t = Game.topics[i];
        const b = create_topic_button(t, i, () => set_game_topic(i));
        div.append(b);
    }
    return div;
}


function check_row() {
    const div = document.createElement('div');
    div.className = 'directions';
    const b1 = create_button('direction', 'check', () => {
        Game.input = '';
        Game.command = '';
        const content = Game['actions']['continue'].action();
        msg(content);
        refresh();
    })
    div.append(b1);
    if (Game['actions']['help']) {
        const b4 = create_button('action', 'help', () => set_game_action('help'));
        div.append(b4);
    }
    return div;
}


function command_line() {
    const s1 = document.createElement('span');
    s1.className = 'material-icons-round';
    const s2 = document.createElement('span');
    s2.className = 'parser';
    s2.innerText = 'chevron_right';
    s1.append(s2);
    const left = document.createElement('div');
    left.className = 'command-inner'
    const right = document.createElement('div');
    right.className = 'command-inner'
    const div = document.createElement('div');
    div.className = 'command-line'
    left.append(s1);
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.innerHTML = '&block;';
    left.append(Game.input);
    left.append(cursor);
    if (Game.input !== '') {
        const b1 = create_console_icons('backspace', () => backspace_action())
        const b2 = create_console_icons('keyboard_return', () => execute_action())
        right.append(b1);
        right.append(b2);
    }
    div.append(left);
    div.append(right);
    return div;
}


function previous_command_line(command) {
    const s1 = document.createElement('span');
    s1.className = 'material-icons-round';
    const s2 = document.createElement('span');
    s2.className = 'parser';
    s2.innerText = 'chevron_right';
    s1.append(s2);
    const left = document.createElement('div');
    left.className = 'command-inner'
    const div = document.createElement('div');
    div.className = 'previous-command-line';
    left.append(s1);
    left.append(command);
    div.append(left);
    return div;
}


function add_control_box() {
    remove_control_box();
    const c = document.querySelector('#console');
    const div = document.createElement('div');
    div.className = 'control-box';
    div.id = 'control-box';
    const l = command_line();
    div.append(l);
    if (Game.actions['continue']) {
        const a = check_row();
        div.append(a);
    } else if (Game.topics.length > 0) {
        const a = topic_row();
        div.append(a);
    } else {
        const a = action_row();
        const d = direction_row();
        div.append(a);
        div.append(d);    
    }
    c.append(div);
}


function msg(content) {
    const c = document.querySelector('#console');
    const p = document.createElement('div');
    p.className = 'msg';
    content = SmartyPants(content);
    content = content.split('\n\n');
    content = `<p>${content.join('</p><p>')}</p>`;
    content = content.replaceAll('<<', '<i>');
    content = content.replaceAll('>>', '</i>');
    p.innerHTML = content;
    c.append(p);
}


function go(location) {
    Game.location = location;
    Game.actions = {};
    Game.rooms[location]();
    if (Game.header !== '') {
        msg(`<div class="room-header"><h3>${Game.header}</h3></div>`);
    }
    showDesc();
    refresh();
}


function refresh() {
    update_header()
    add_control_box();
    window.scrollTo(0, document.body.scrollHeight);
}


function start() {
    go('title');
    refresh();
}


addEventListener('DOMContentLoaded', () => {
    start();
})
