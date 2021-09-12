import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Linking } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Div, Text } from 'react-native-magnus';
import { QR_CODE_HISTORY } from '../utils/constants';

const History = () => {
  const { getItem: getBarCodeHistory } = useAsyncStorage(QR_CODE_HISTORY);

  const [barCodeHistoryToDisplay, setBarCodeHistoryToDisplay] = useState([]);

  const initializeBarCodeHistoryToDisplay = useCallback(async () => {
    let barCodeHistory = await getBarCodeHistory();

    try {
      barCodeHistory = barCodeHistory ? JSON.parse(barCodeHistory) : [];
    } catch (e) {
      console.error(
        '[Home.js:initializeBarCodeHistoryToDisplay]: An error occurred while trying to parse data from AsyncStorage',
        { e },
      );
    }

    setBarCodeHistoryToDisplay(barCodeHistory);
  }, [setBarCodeHistoryToDisplay, getBarCodeHistory]);

  useEffect(() => {
    initializeBarCodeHistoryToDisplay();
  }, [initializeBarCodeHistoryToDisplay]);

  const onLinkPressed = link => {
    Linking.openURL(link).catch(e =>
      console.error('An error occurred while trying to open the link', { e }),
    );
  };

  return (
    <Div flex={1}>
      <FlatList
        data={barCodeHistoryToDisplay}
        renderItem={({ item }) => (
          <Div
            h={40}
            p={5}
            mx={10}
            my={5}
            shadow="sm"
            rounded="sm"
            bg="white"
            justifyContent="center">
            <Text onPress={() => onLinkPressed(item)}>{item}</Text>
          </Div>
        )}
      />
    </Div>
  );
};

export default History;
