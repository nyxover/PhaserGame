import Phaser from 'phaser'
import preloader from './scenes/preloader'

import game from './scenes/game'



export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 800,
	height: 400,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		}
	},
	scene: [preloader, game],
	scale: {
		zoom: 2
	}
})
