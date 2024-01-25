
Game.rooms.nextRoom = () => {
    
    header('Next Room')
    desc(() => `This is the <<next>> "room".`)


    look(showDesc)


    /*
    topics([
        {
            word: `Hello`,
            preview: `Hello world`,
            action: () => `Yes test complete.`
        },
        {
            word: `Bye`,
            preview: `Bye for now`,
            action: () => `Yes test completed.`
        }
    ])
    */

    use('Next room', () => 'This is a test.')

    talk('Yell', () => 'AAAAHHHHHH! That feels better.')

    help('Hint Please', () => 'No hint for you.')

    north('Leave Room', () => go('nextRoom'))


}
