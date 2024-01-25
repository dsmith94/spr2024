
const titleMsg = `

Welcome to

<h1>This Cave is Trying to Kill You</h1>

<h2>A game by spaceflounder</h2>

Hey, if this is your first time playing, you may want to hit the Help button.
It's a bit different here than other text-games!

`


const helpMsg = `

<<This Cave is Trying to Kill You>> is an interactive short story where you are
the star! Your goal is to enter and explore the nearby cave full of treasures.
Terrible traps and monsters lurk within, so be careful!

If you do perish, don't worry--I can mostly bring you back in one piece. You can
manipulate the story narrative by hitting the buttons below. If the button has
and uppercase description--Look, for example--you can press the L key on the keyboard
instead of tapping the screen or using the mouse.

`

Game.rooms.title = () => {

    header('')
    check(() => go('startRoom'))
    help('About this Game', () => helpMsg)
    desc(() => titleMsg)


}
