import { Modal, View, Text, Button, StyleSheet, Image } from 'react-native';

const CoinDetailsModal = ({ visible, coinData, onClose }:any) => {
  if (!visible || !coinData) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: coinData.image }}
            style={styles.coinImage}
            resizeMode="contain"
            />
          <Text style={styles.title}>{coinData?.name}</Text>
          <Text>Market Capitalization: {coinData?.market_cap}</Text>
          <Text>Total Volume: {coinData?.total_volume}</Text>
          <Text>Fully Diluted Valuation: {coinData?.fully_diluted_valuation}</Text>
          <Text>ROI: {coinData.roi ? `${coinData?.roi?.percentage} %` : '0 %'}</Text>
          <Button title="Close" onPress={() => onClose()} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 50,
    backgroundColor: "purple"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  coinImage: {
    width: '100%',
    height: 100, 
    marginBottom: 10,
  },
});

export default CoinDetailsModal;
