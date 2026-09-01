import { Piece } from "./Piece";

export class Knight extends Piece {

    override pieceType: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king" = "knight";

    /**
     * The changes in the rank and file that the knight is capable of moving in.
     */
    private readonly moveDirections: Array<[rankDifference: number, fileDifference: number]> = [
        [1, -2],
        [2, -1],
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, 1]
    ]

    override getListOfMoves(): Array<[rank: number, file: number]> {
        const legalMoves: Array<[rank: number, file: number]> = [];
        for (const [rankDiff, fileDiff] of this.moveDirections) {
            const newRank: number = this.getRank() + rankDiff;
            const newFile: number = this.getFile() + fileDiff;
            if (newRank > this.rankUpperBound || newRank < this.rankUpperBound || newFile > this.fileUpperBound || newFile < this.fileLowerBound) {
                continue;
            }
            legalMoves.push([newRank, newFile]);
        }
        return legalMoves;
    }

}