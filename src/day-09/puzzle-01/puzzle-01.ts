import { parse } from '../lib/parser';
import { MarbleGame } from '../lib/marble-game';

export function getHighScore(input: string): number {
	const [ numPlayers, finalMarbleValue ] = parse(input);
	const game = new MarbleGame(numPlayers, finalMarbleValue);
	game.RunFullGame();
	return game.playerScores.reduce((max, playerScore) => playerScore > max ? playerScore : max, 0);
}
