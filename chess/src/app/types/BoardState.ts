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
     * TODO: return whether or not the current player is checked.
     * 
     * @returns whether or not the current player is checked. 
     */
    public isCurrentPlayerChecked(): boolean {
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
            if (wasPieceCaptured) {
                this.pieceCaptured();
            }
        }
        return isImpossible;
    }

    public getLegalMovesByRankAndFile(rank: number, file: number): Array<[rank: number, file: number]> {

    }

    private pieceCaptured(): {

    }

    // == ------------------------------------- HELPER -------------------------------------- == //

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