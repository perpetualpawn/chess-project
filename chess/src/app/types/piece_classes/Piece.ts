import { BoardState } from "../BoardState";

/**
 * Abstract piece class used to simplify the generation of the individual
 * piece types.
 */
export abstract class Piece {

    // == ------------------------- CLASS INFORMATION ------------------------------- == //

    /**
     * The rank (row) off the chess board that the piece is on.
     */
    public rank: number;

    /**
     * The file (column) of the chess board that the piece is on.
     */
    public file: number;

    /**
     * The color of the piece.
     */
    public color: "white" | "black";

    /**
     * Sets up the basic structure that all pieces will follow,
     * every one requires a location to be placed and a color.
     * 
     * @param rank the row the piece is on
     * @param file the column the piece is on
     * @param color the color of the piece
     */
    constructor(rank: number, file: number, color: "white" | "black") {
        this.rank = rank;
        this.file = file;
        this.color = color;
    }

    // == ---------------------------- FUNCTIONALITY ------------------------------- == //

    /**
     * Gets a list of all the squares this piece can move to in the current position.
     * Things that influence this are the type of the piece, whether or not it would place
     * the king in check, and its move history (depending on the piece)
     * 
     * @param boardState The current state of all the pieces on the board.
     * @returns A list of all the legal moves in the position for this piece.
     */
    abstract getListOfLegalMoves(boardState: BoardState): Array<[rank: number, file: number]>;

    public isMoveLegal(rank: number, file: number, boardState: BoardState): boolean {
        const legalMoves: Array<[rank: number, file: number]> = this.getListOfLegalMoves(boardState);
        for (const [legalRank, legalFile] of legalMoves) {
            if (legalRank == rank && legalFile == file) {
                return true;
            }
        }
        return false;
    }



}