import { parse } from '../lib/parser';
import { MarbleGame } from '../lib/marble-game';

export function getHighScoreOn100xGame(input: string): number {
	const [ numPlayers, finalMarbleScore ] = parse(input);
	const game = new MarbleGame(numPlayers, finalMarbleScore * 100);
	game.RunFullGame();
	return game.playerScores.reduce((max, score) => score > max ? score : max, 0);
}
