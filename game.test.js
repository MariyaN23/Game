const {Game} = require ('./game')

describe('game test', ()=> {
    it ('settings test', ()=> {
        const game = new Game()
        game.settings = {
            gridSize: {
                columnCount: 5,
                rowsCount: 4
            }
        }
        const settings = game.settings
        expect(settings.gridSize.columnCount).toBe(5)
        expect(settings.gridSize.rowsCount).toBe(4)
    })

    it ('start game test', async ()=> {
        const game = new Game()
        expect(game.status).toBe('pending')
        await game.start()
        expect(game.status).toBe('in-progress')
    })

    it ('check player init position', async ()=> {
        for (let i=0; i<10; i++) {
            const game = new Game()
            game.settings = {
                gridSize: {
                    columnCount: 1,
                    rowsCount: 3
                }
            }
            await game.start()
            expect([0]).toContain(game.players[0].position.x)
            expect([0, 1, 2]).toContain(game.players[0].position.y)

            expect([0]).toContain(game.players[1].position.x)
            expect([0, 1, 2]).toContain(game.players[1].position.y)

            expect(game.players[0].position.x !== game.players[1].position.x
                || game.players[0].position.y !== game.players[1].position.y).toBe(true)
        }
    })

    it ('check google init position', async ()=> {
        for (let i=0; i<10; i++) {
            const game = new Game()
            game.settings = {
                gridSize: {
                    columnCount: 1,
                    rowsCount: 3
                }
            }
            await game.start()
            expect([0]).toContain(game.google.position.x)
            expect([0, 1, 2]).toContain(game.google.position.y)

            expect(
                (game.google.position.x !== game.players[0].position.x || game.google.position.y !== game.players[0].position.y)
                && (game.google.position.x !== game.players[1].position.x || game.google.position.y !== game.players[1].position.y))
                .toBe(true)
        }
    })

    it ('check google position after jump', async ()=> {
        for (let i=0; i<10; i++) {
            const game = new Game()
            game.settings = {
                gridSize: {
                    columnCount: 1,
                    rowsCount: 4
                },
                googleJumpInterval: 100,
            }
            await game.start()
            const prevPosition = game.google.position.clone()
            await sleep(150)
            expect(game.google.position.equal(prevPosition)).toBe(false)
        }
    })
});

const sleep = ms => new Promise(res => setTimeout(res, ms))