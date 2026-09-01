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
    private rank: number;

    /**
     * The file (column) of the chess board that the piece is on.
     */
    private file: number;

    /**
     * The color of the piece.
     */
    public color: "white" | "black";

    /**
     * The type of the piece
     */
    public abstract pieceType: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";

    /**
     * The value (inclusive) for the bounds in which the piece can move on this rank,
     * see other bound for other limit (inclusive) of range.
     */
    public rankUpperBound: number = 8;

    /**
     * The value (inclusive) for the bounds in which the piece can move on this rank,
     * see other bound for other limit (inclusive) of range.
     */
    public rankLowerBound: number = 1;

    /**
     * The value (inclusive) for the bounds in which the piece can move on this file,
     * see other bound for other limit (inclusive) of range.
     */
    public fileUpperBound: number = 8;

    /**
     * The value (inclusive) for the bounds in which the piece can move on this file,
     * see other bound for other limit (inclusive) of range.
     */
    public fileLowerBound: number = 1;

    /**
     * gets the rank of the piece
     * 
     * @returns the rank of the piece
     */
    public getRank(): number {
        return this.rank;
    }

    /**
     * gets the file of the piece
     * 
     * @returns the file of the piece
     */
    public getFile(): number {
        return this.file;
    }

    /**
     * sets the file of this piece to the supplied value
     * 
     * @param file The value to set the file of the piece to
     */
    public setFile(file: number): void {
        this.file = file;
    }

    /**
     * sets the rank of the piece to the supplied value
     * 
     * @param rank the value to set the rank to
     */
    public setRank(rank: number): void {
        this.rank = rank;
    }

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

    // == ------------------------------- SETTERS ---------------------------------- == //

    /**
     * Changes the limits for how many files are usable on the chess board.
     * 
     * @param lower The new lower bound (inclusive) for what files the pieces
     * should be able to travel to.
     * @param upper The new upper bound (inclusive) for what files the pieces
     * should be able to travel to.
     */
    public setFileLimits(lower: number, upper: number): void {
        this.fileLowerBound = lower;
        this.fileUpperBound = upper;
    }

    /**
     * Changes the limits for how many ranks are usable on the chess board.
     * 
     * @param lower The new lower bound (inclusive) for what ranks the pieces
     * should be able to travel to.
     * @param upper The new upper bound (inclusive) for what ranks the pieces
     * should be able to travel to.
     */
    public setRankLimits(lower: number, upper: number): void {
        this.rankLowerBound = lower;
        this.rankLowerBound = upper;
    }

    // == ---------------------------- FUNCTIONALITY ------------------------------- == //

    /**
     * Gets a list of moves that may or may not be legal in this position, solely
     * based on whether or not the piece would be able to move there in the absense
     * of any other pieces on the board.
     * 
     * @param boardState The current state of all the pieces on the board.
     * @returns A list of all the potentially moves in the position for this piece.
     */
    abstract getListOfMoves(): Array<[rank: number, file: number]>;

}