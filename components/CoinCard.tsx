import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { formatPriceWithCommas } from '../utils/numbersWithCommas';

interface CoinCardProps {
  coinData: {
    image: string;
    name: string;
    price: number;
    quantity: number;
  };
}

const CoinCard: React.FC<CoinCardProps> = ({ coinData }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: coinData.image }} style={styles.coinImage} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{coinData.name}</Text>
      </View>
      <Text style={styles.price}>${formatPriceWithCommas(coinData.price)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
  },
  coinImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#000',
  },
  quantity: {
    fontSize: 14,
    color: '#3498db',
  },
});

export default CoinCard;
