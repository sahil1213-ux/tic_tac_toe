
// use below for removing error
// # Navigate to the project directory
// cd 'C:\Users\sahil\React Native\Testing Apps\tic_tac_toe'

// # Delete the .gradle folder in the project directory
// Remove-Item -Recurse -Force .\android\.gradle

// # Optionally, delete the global .gradle cache (be cautious, as this will affect all projects)
// # Remove-Item -Recurse -Force C:\Users\sahil\.gradle

// # Try running the clean command again
// cd android
// .\gradlew clean

// # If the clean command succeeds, try building the project again
// .\gradlew assembleDebug


// use below to remove package
// npx react-native unlink <react-native-linear-gradient>

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Iconn from './Components/Icon';
import Toast from 'react-native-toast-message';

export default function App() {
  const [isCross, setIsCross] = useState(false);
  const [gameWinner, setgameWinner] = useState('');
  const [gameState, setgameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setgameWinner('');
    setgameState(new Array(9).fill('empty', 0, 9));
  };
  const testToast = text =>
    Toast.show({
      type: 'success', // or 'error', 'info', depending on the library
      backgroundColor: 'black',
      text1Style: {
        color: '#ffffff',
        fontWeight: 'bold',
      },
      borderRadius: 10,
      text1: text,
    });
  const checkForWinner = () => {
    // first 3 for rows
    if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[1] &&
      gameState[1] === gameState[2]
    ) {
      setgameWinner(gameState[0] + ' is the game winner');
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setgameWinner(gameState[3] + ' is the game winner');
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setgameWinner(gameState[6] + ' is the game winner');
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setgameWinner(gameState[0] + ' is the game winner');
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setgameWinner(gameState[1] + ' is the game winner');
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setgameWinner(gameState[2] + ' is the game winner');
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setgameWinner(gameState[0] + ' is the game winner');
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setgameWinner(gameState[2] + ' is the game winner');
    } else if (!gameState.includes('empty', 0)) {
      setgameWinner('Draw game... ⌛️');
    }
  };

  const nextTurnFinder = iconTappedIndex => {
    if (gameWinner) {
      {
        testToast(gameWinner);
      }
    }
    if (gameState[iconTappedIndex] === 'empty') {
      gameState[iconTappedIndex] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      {
        testToast('this is Already Selected');
      }
    }
    checkForWinner();
  };
  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'} turn now
          </Text>
        </View>
      )}

      <FlatList
        data={gameState}
        numColumns={3}
        style={styles.grid}
        renderItem={({item, index}) => {
          return (
            <Pressable
              key={index}
              style={styles.card}
              onPress={() => nextTurnFinder(index)}>
              <Iconn IconName={item} />
            </Pressable>
          );
        }}
      />
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Restart the game ' : 'Reload the game '}
        </Text>
      </Pressable>
      <FlatList
        data={gameState}
        numColumns={3}
        renderItem={({Item, Index}) => {
          <Pressable
            key={Index}
            style={styles.card}
            onPress={() => nextTurnFinder(Index)}>
            <Iconn IconName={Item} />
          </Pressable>;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
