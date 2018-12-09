const SCORING_INTERVAL = 23;

export class MarbleGame {
	public playerScores: number[];
	public finalMarbleValue: number;
	private numPlayers: number;
	private state: { currentMarbleIndex: number, currentPlayer: number, nextMarbleValue: number, marbles: number[] };

	constructor(numPlayers: number, finalMarbleValue: number) {
		this.numPlayers = numPlayers;
		this.finalMarbleValue = finalMarbleValue;
		this.playerScores = new Array(this.numPlayers).fill(0);
		this.state = {
			currentMarbleIndex: 0,
			currentPlayer: 0,
			nextMarbleValue: 1,
			marbles: [0]
		};
	}

	public PerformNextTurn(): boolean {
		if (this.state.nextMarbleValue <= this.finalMarbleValue) {
			if (this.state.nextMarbleValue % SCORING_INTERVAL !== 0) {
				const insertIndex = (this.state.currentMarbleIndex + 2) % this.state.marbles.length;
				this.state.marbles.splice(insertIndex, 0, this.state.nextMarbleValue);
				this.state.currentMarbleIndex = insertIndex;
			} else {
				this.playerScores[this.state.currentPlayer] += this.state.nextMarbleValue;
				let removeIndex = this.state.currentMarbleIndex - 7;
				if (removeIndex < 0) {
					removeIndex = this.state.marbles.length + removeIndex;
				}
				this.playerScores[this.state.currentPlayer] += this.state.marbles.splice(removeIndex, 1)[0];
				this.state.currentMarbleIndex = removeIndex % this.state.marbles.length;
			}

			this.state.currentPlayer = (this.state.currentPlayer + 1) % this.numPlayers;
			this.state.nextMarbleValue++;
		}

		return this.state.nextMarbleValue <= this.finalMarbleValue;
	}

	public RunFullGame(): void {
		let hasMoreTurns = this.PerformNextTurn();
		while (hasMoreTurns) {
			hasMoreTurns = this.PerformNextTurn();
		}
	}
}
