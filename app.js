class Dado {
    constructor() {}

    roll() {
        let numero = Math.round(Math.random() *(6 - 1) + 1)

        return numero
    }
}


class Jugador {
    constructor(id) {
        this._id = id
        this._posicion = 0;
        this._avance = new Dado()
    }

    get avance() {
        return this._avance;
    }

    get id() {
        return this._id;
    }

    get posicion() {
        return this._posicion;
    }

    jugar(numero) {
        this._posicion += numero;
    };
}

class tablero {
    constructor() {
        this._casillas = [];
        this._jugadores = []
        this.app();
    }

    get jugadores() {
        return this._jugadores;
    }

    get tablero() {
        return this._casillas
    }

    app() {
        this.crearTablero();
    }
    

    crearTablero() {
        for(let i = 0; i < 100; i++) {
            this._casillas[i] = 0;
        }

        this.serpientes();
        this.escaleras();
    };


    serpientes() {

        for(let i = 0; i <9; i++ ) {
            let serpiente = Math.round(Math.random() *(99 - 1));
            this._casillas[serpiente] = 1;
        }
    };

    escaleras() {
        for(let i = 0; i < 9; i++) {
            let escalera = Math.round(Math.random() *(99 - 1));

            if(this._casillas[escalera] === 1) {
                i--
            } else {
                this._casillas[escalera] = 2;
            }
        }
    };

    addPlayer(player) {
        this._jugadores.push(player)
    }

    start() {
        if(this.jugadores.length < 2) {
            console.log('No hay suficientes jugadores!')
        } else {

            while(this.jugadores[0].posicion < 100 && this.jugadores[1].posicion < 100) {

                this.jugadores.forEach(jugador => {

                    jugador.jugar(jugador.avance.roll());
                    if(this.tablero[jugador.posicion] === 1) {
                        console.log(`El jugador ${jugador.id} ha llegado a una serpiente y de estar en la posicion ${jugador.posicion} ahora esta en ${jugador.posicion -5}`);
                        jugador._posicion -= 5
                    } else if(this.tablero[jugador.posicion] === 2) {
                        console.log(`El jugador ${jugador.id} ha llegado a una escalera y de estar en la posicion ${jugador.posicion} ahora esta en ${jugador.posicion +5}`);
                        jugador._posicion += 5
                    }
                });
            }

            if(this.jugadores[0].posicion >= 100) {
                console.log(`El ganador es el jugador ${this.jugadores[0].id}`)
            } else {
                console.log(`El ganador es el jugador ${this.jugadores[1].id}`)
            }
        }
    }

}



let app = new tablero();
let jugador1 = new Jugador(1);
let jugador2 = new Jugador(2);
app.addPlayer(jugador1);
app.addPlayer(jugador2);
console.log(app.jugadores)
app.start()