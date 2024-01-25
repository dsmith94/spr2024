
Game.rooms.startRoom = () => {
    
    header('Start Room')
    desc(() => `This is the <<first>> "room".`)


    look(showDesc)

    use('Next room', () => 'This is a test.')

    talk('Yell', () => 'AAAAHHHHHH! That feels better.')

    help('Hint Please', () => 'No hint for you.')


}
