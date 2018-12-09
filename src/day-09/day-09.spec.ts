import { assert } from 'chai';
import { parse } from './lib/parser';
import { getHighScore } from './puzzle-01';
import { MarbleGame } from './lib/marble-game';

describe('day-09', () => {
	describe('lib', () => {
		describe('parse', () => {
			it('should return number of players and final marble value', () => {
				// Arrange
				const input = '7 players; last marble is worth 100 points';

				// Act
				const result = parse(input);

				// Assert
				assert.equal(result.length, 2);
				assert.equal(result[0], 7);
				assert.equal(result[1], 100);
			});

			it('should throw an error if the input is not in a valid format', () => {
				// Arrange
				const input = '7 players, last marble is worth 100 points';

				// Act & Assert
				assert.throws(() => parse(input));
			});
		});

		describe('MarbleGame', () => {
			describe('constructor', () => {
				it('should assign the playerScores and finalMarbleValue properties from constructor parameters', () => {
					// Arrange
					const inputNumPlayers = 7;
					const inputFinalMarbleValue = 100;

					// Act
					const game = new MarbleGame(inputNumPlayers, inputFinalMarbleValue);

					// Assert
					assert.equal(game.playerScores.length, inputNumPlayers);
					assert.equal(game.finalMarbleValue, inputFinalMarbleValue);
				});
			});

			describe('PerformNextTurn', () => {
				it('should perform next turn', () => {
					// Arrange
					const game = new MarbleGame(9, 25);

					// Act
					for (let turn = 1; turn <= 23; turn++) {
						game.PerformNextTurn();
					}

					// Assert
					assert.equal(game.playerScores[4], 32);
				});

				it('should return true if there are more turns to perform', () => {
					// Arrange
					const game = new MarbleGame(9, 25);

					// Act
					const result = game.PerformNextTurn();

					// Assert
					assert.isTrue(result);
				});

				it('should return false if there are no more turns to perform', () => {
					// Arrange
					const game = new MarbleGame(9, 25);

					// Act
					for (let turn = 1; turn <= 25; turn++) {
						game.PerformNextTurn();
					}
					const result = game.PerformNextTurn();

					// Assert
					assert.isFalse(result);
				});

				it('should not perform any actions if there are no more turns', () => {
					// Arrange
					const game = new MarbleGame(9, 25);

					// Act
					for (let turn = 1; turn <= 23 * 3; turn++) {
						game.PerformNextTurn();
					}

					// Assert
					assert.equal(game.playerScores[4], 32);
					assert.equal(game.playerScores.filter((score) => score === 0).length, 8);
				});
			});

			describe('RunFullGame', () => {
				it('should run all turns', () => {
					// Arrange
					const game = new MarbleGame(9, 25);

					// Act
					game.RunFullGame();
					const result = game.PerformNextTurn();

					// Assert
					assert.isFalse(result);
				});
			});
		});
	});

	describe('puzzle-01', () => {
		it('should return 32 for example problem input', () => {
			// Arrange
			const input = '9 players; last marble is worth 25 points';

			// Act
			const result = getHighScore(input);

			// Assert
			assert.equal(result, 32);
		});

		[
			{ expected: 8317, input: '10 players; last marble is worth 1618 points' },
			{ expected: 146373, input: '13 players; last marble is worth 7999 points' },
			{ expected: 2764, input: '17 players; last marble is worth 1104 points' },
			{ expected: 54718, input: '21 players; last marble is worth 6111 points' },
			{ expected: 37305, input: '30 players; last marble is worth 5807 points' },
		].forEach((testCase) => {
			it(`should return ${testCase.expected} for input "${testCase.input}"`, () => {
				// Act
				const result = getHighScore(testCase.input);

				// Assert
				assert.equal(result, testCase.expected);
			});
		});
	});
});
