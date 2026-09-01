import { Piece } from "./piece_classes/Piece";

/**
 * Class that contains all the pieces that are on the board.
 */
export class BoardState {

    /**
     * The current pieces on the board.
     */
    public pieces: Piece[];

    /**
     * Who currently controls the right to move the next piece.
     */
    public currentTurn: "white" | "black";

    /**
     * TODO: return whether or not the white player is checked.
     * 
     * @returns whether or not the white player is checked. 
     */
    public isWhiteChecked(): boolean {
        return false;
    }
    
    /**
     * TODO: return whether or not the black player is checked
     * 
     * @returns whether or not the black player is checked
     */
    public isBlackChecked(): boolean {
        return false;
    }

    constructor(currentTurn: "white" | "black" = "white") {
        this.currentTurn = currentTurn;
        this.pieces = [];
    }

    /**
     * Attempts to move a piece from a given square to a new one, returns whether or not it is able to.
     * 
     * @param oldRank The rank the piece is currently on
     * @param oldFile The file that the piece is currently on
     * @param newRank The rank that you want to move the piece to.
     * @param newFile The file that you want to move the piece to.
     * @returns whether or not the piece was able to successfully be able to moved to that square.
     */
    public movePiece(oldRank: number, oldFile: number, newRank: number, newFile: number): boolean {
        const possibleMoves: Array<[rank: number, file: number]> = this.getLegalMovesByRankAndFile(oldRank, oldFile);
        let isImpossible: boolean = true;
        for (const [legalRank, legalFile] of possibleMoves) {
            if (legalRank == newRank && legalFile == newFile) {
                isImpossible = false;
            }
        }
        if (!isImpossible) {
            // need to write in castling and en passant edge cases i think
            const wasPieceCaptured: boolean = this.removePieceByRankAndFile(newRank, newFile);
            const indexOfOriginalPiece: number | null = this.identifyPieceByRankAndFile(oldRank, oldFile);
            if (indexOfOriginalPiece == null) {
                return false;
            }
            this.pieces[indexOfOriginalPiece].setRank(newRank);
            this.pieces[indexOfOriginalPiece].setFile(newFile);
            this.checkConditions(wasPieceCaptured);
        }
        return isImpossible;
    }

    public getLegalMovesByRankAndFile(rank: number, file: number): Array<[rank: number, file: number]> {
        const pieceIndex: number | null = this.identifyPieceByRankAndFile(rank, file);
        if (pieceIndex == null) {
            return [];
        }
        const legalMoves: Array<[rank: number, file: number]> = [];
        const piece: Piece = this.pieces[pieceIndex];
        const potentialMoves: Array<[rank: number, file: number]> = piece.getListOfMoves();
        for (const move of potentialMoves) {
            const isValidMove: boolean = this.isValidMove(piece, move[0], move[1]);
            if (isValidMove) {
                legalMoves.push(move);
            }

        }
        return legalMoves;
    }

    /**
     * TODO: play sound when captured and check the various game states.
     */
    private checkConditions(wasPieceCaptured: boolean): void {

    }

    // == ------------------------------------- HELPER -------------------------------------- == //

    /**
     * Checks to see if the attempted move for the piece is valid.
     * 
     * @param piece the piece you want to move
     * @param rank The rank that you want to move the piece to
     * @param file the file that you want to move the piece to
     */
    private isValidMove(piece: Piece, rank: number, file: number): boolean {
        // TODO: write in en passant / castling exceptions.
        const movingColor: "white" | "black" = piece.color;
        const boardCopy: BoardState = structuredClone(this);
        boardCopy.removePieceByRankAndFile(rank, file);
        const indexOfOriginalPiece: number | null = boardCopy.identifyPieceByRankAndFile(rank, file);
        if (indexOfOriginalPiece == null) {
            return false;
        }
        boardCopy.pieces[indexOfOriginalPiece].setRank(rank);
        boardCopy.pieces[indexOfOriginalPiece].setFile(file);
        if (!this.checksAreValid(boardCopy, movingColor)) {
            return false;
        }
        if (this.attackingOwnPiece(movingColor, rank, file)) {
            return false;
        }
        if (this.pieceIsBlocked(piece, rank, file)) {
            return false;
        }

        return true;
    }

    /**
     * Checks to see if a piece is blocked when it is trying to go a square.
     * TODO: get other types to correctly check blocked logic.
     * 
     * @param piece the piece that is moving
     * @param rank the rank it is moving to
     * @param file the file it is moving to
     * @returns Whether or not it is blocked when it is trying to go to that square
     */
    private pieceIsBlocked(piece: Piece, rank: number, file: number): boolean {
        if (piece.pieceType == "knight") {
            return false;
        }
        if (piece.pieceType == "king") {
            return false;
        }
        if (piece.pieceType == "bishop") {
            return true;
        }
        if (piece.pieceType == "pawn") {
            return true;
        }
        if (piece.pieceType == "queen") {
            return true;
        }
        if (piece.pieceType == "rook") {
            return true;
        }
        return false;
    }

    /**
     * You can not capture your own pieces, so a check is performed to see if you are trying
     * to move on top of one of your own pieces.
     * 
     * @param movingColor the color that is moving
     * @param rank the rank they want to move to.
     * @param file the file they want to move to.
     * @returns whether or not they are legally allowed to make that move.
     */
    private attackingOwnPiece(movingColor: "white" | "black", rank: number, file: number): boolean {
        const pieceIndex: number | null = this.identifyPieceByRankAndFile(rank, file);
        if (!pieceIndex) {
            return false;
        }
        return this.pieces[pieceIndex].color == movingColor;
    }

    /**
     * A move cannot put your own king into check and if you are checked, you must block the check
     * or move out of it in order to have a valid move.
     * 
     * @param boardCopy The copy of the board with the move made.
     * @param movingColor The color that is moving
     * @returns Whether or not the move meets the criteria for the checks
     */
    private checksAreValid(boardCopy: BoardState, movingColor: "white" | "black"): boolean {
        if (movingColor == "white") {
            const whiteCheckedAfter: boolean = boardCopy.isWhiteChecked();
            if (whiteCheckedAfter) {
                return false;
            }
        } else {
            const blackCheckedAfter: boolean = boardCopy.isBlackChecked();
            if (blackCheckedAfter) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns the index of the piece that is on the given coordinates
     * 
     * @param rank The rank of the piece that you want to identify
     * @param file The file of the piece that you want to identify
     * @returns the index of the given piece in the pieces array if it exists, null otherwise.
     */
    private identifyPieceByRankAndFile(rank: number, file: number): number | null {
        for (let i = 0; i < this.pieces.length; i++) {
            const piece: Piece = this.pieces[i];
            if (piece.getRank() !== rank || piece.getFile() !== file) {
                continue;
            }
            return i;
        }
        return null;
    }

    /**
     * Removes the piece on a given square if it exists.
     * 
     * @param rank The rank of the piece that you want to remove
     * @param file The file of the piece that you want to remove
     * @returns Whether or not there was a piece on that square in the first place.
     */
    private removePieceByRankAndFile(rank: number, file: number): boolean {
        const indexOfGivenPieceInPiecesArray: number | null = this.identifyPieceByRankAndFile(rank, file);
        if (indexOfGivenPieceInPiecesArray == null) {
            return false;
        }
        this.pieces.splice(indexOfGivenPieceInPiecesArray, 1);
        return true;
    }

}