import Phaser from "phaser";

export default class preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }

    preload()
    {
        this.load.image('tiles', ('tiles/DungeonTileset.png'))
        this.load.tilemapTiledJSON('map', 'tiles/map01.json')
        
        this.load.atlas('player', 'character/player.png', 'character/player.json')
    }

    create()
    {
        this.scene.start('game')
    }
}