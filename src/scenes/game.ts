import Phaser from 'phaser'

import { debugDraw } from './utils/debug'

export default class Game extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private player!: Phaser.Physics.Arcade.Sprite
    
	constructor()
	{
		super('game')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
       const map = this.make.tilemap({ key: 'map' })
       const tileset = map.addTilesetImage('map', 'tiles', 16, 16)

       map.createLayer('ground', tileset)
       const wallsLayer = map.createLayer('walls', tileset)

       wallsLayer.setCollisionByProperty({ coliders: true})

       debugDraw(wallsLayer, this)


        this.player = this.physics.add.sprite(128, 128, 'player', 'walk-down-3.png'),
        this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.65)

        this.anims.create({
            key: 'player-idle-down',
            frames: [{ key: 'player', frame: 'walk-down-3.png' }]
        })

        this.anims.create({
            key: 'player-idle-up',
            frames: [{ key: 'player', frame: 'walk-up-3.png' }]
        })

        this.anims.create({
            key: 'player-idle-side',
            frames: [{ key: 'player', frame: 'walk-side-3.png' }]
        })

        this.anims.create({
            key: 'player-run-down',
            frames: this.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'player-run-up',
            frames: this.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'player-run-side',
            frames: this.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.player.anims.play('player-idle-down')

        this.physics.add.collider(this.player, wallsLayer)

        this.cameras.main.startFollow(this.player, true)

    }

    update(t: number, dt: number)
    {
        if(!this.cursors || !this.player)
        {
            return
        }
        const speed = 100

        if(this.cursors.left?.isDown)
        {
            this.player.anims.play('player-run-side', true)
            this.player.setVelocity(-speed, 0)

            this.player.scaleX = -1
            this.player.body.offset.x = 24
        }
        else if (this.cursors.right?.isDown)
        {
            this.player.anims.play('player-run-side', true)
            this.player.setVelocity(speed, 0)

            this.player.scaleX = 1
            this.player.body.offset.x = 8


        }
        else if (this.cursors.up?.isDown)
        {
            this.player.anims.play('player-run-up', true)
            this.player.setVelocity(0, -speed)


        }

        else if (this.cursors.down?.isDown)
        {
            this.player.anims.play('player-run-down',true)
            this.player.setVelocity(0, speed)
        }

        else
        {
            const parts = this.player.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.player.play(parts.join('-'))
            this.player.setVelocity(0, 0)
        }

    }

}
