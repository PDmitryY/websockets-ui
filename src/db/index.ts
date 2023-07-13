import { Db, DbGame } from './../types/index.js'

export const db: DbGame = {
    game: {
        users: [],
        rooms: [],
        sessions: []
    }
}

export const setDb = (updatedDb: Db) => {
    db.game = updatedDb;
    return db.game;
}

export const getDb = () => {
    return JSON.parse(JSON.stringify((db.game)));
}