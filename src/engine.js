
function create_button(clss, icn, func) {
    const b = document.createElement('button');
    b.className = clss;
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
    return b;
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
    const div = document.createElement('div');
    div.append(Game.header)
    const score = document.createElement('div');
    score.append(Game.score)
    h.append(div)
    h.append(score)
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
    const b1 = create_button('action', 'search', () => console.log('look'))
    const b2 = create_button('action', 'back_hand', () => console.log('use'))
    const b3 = create_button('action', 'chat', () => console.log('talk'))
    const b4 = create_button('action', 'help', () => console.log('help'))
    div.append(b1);
    div.append(b2);
    div.append(b3);
    div.append(b4);
    return div;
}


function direction_row() {
    const div = document.createElement('div');
    div.className = 'directions';
    const b1 = create_button('direction', 'north', () => console.log('north'))
    const b2 = create_button('direction', 'south', () => console.log('south'))
    const b3 = create_button('direction', 'west', () => console.log('west'))
    const b4 = create_button('direction', 'east', () => console.log('east'))
    div.append(b1);
    div.append(b2);
    div.append(b3);
    div.append(b4);
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
        const b1 = create_console_icons('backspace', () => {
            Game.input = '';
        })
        const b2 = create_console_icons('keyboard_return', () => {
            Game.input = '';
        })
        right.append(b1);
        right.append(b2);
    }
    div.append(left);
    div.append(right);
    return div;
}


function add_control_box() {
    remove_control_box();
    const c = document.querySelector('#console');
    const div = document.createElement('div');
    div.className = 'control-box';
    div.id = 'control-box';
    const l = command_line();
    const a = action_row();
    const d = direction_row();
    div.append(l);
    div.append(a);
    div.append(d);
    c.append(div);
}


function m$(content) {
    const c = document.querySelector('#console');
    c.append(content);
}


function start() {
    update_header()
    m$('Hello world')
    add_control_box();
}


start();
