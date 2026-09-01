import { Piece } from "./piece_classes/Piece";

/**
 * Class that contains all the pieces that are on the board.
 */
export class BoardState {

    public pieces: Piece[];

    constructor(defaultPosition: boolean = true) {
        if (defaultPosition) {
            // ONCE OTHER CLASSES are implemented, change this to be the default position.
            this.pieces = [];
        }
        this.pieces = [];
    }

}