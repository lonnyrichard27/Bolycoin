import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CoinCard from '../components/CoinCard';
import axios from 'axios';
import { signOut } from 'firebase/auth'
import { FIREBASE_AUTH } from '../utils/firebase';
import CoinDetailsModal from '../components/CoinDetailsModal';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const { user } = route.params;
  console.log(user)
  const auth = FIREBASE_AUTH;
  const [coinData, setCoinData] = useState([]);
  const [filteredCoinData, setFilteredCoinData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null); 

  const handleLogout = async() => {
    try {
      await signOut(auth);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const handleCoinPress = (coin:any) => {
    setSelectedCoin(coin);
  };

  const handleCloseModal = () => {
    setSelectedCoin(null);
  };

  const handleSearch = (text: string) => {
    const filteredData = coinData.filter((coin: any) =>
      coin.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCoinData(filteredData.length > 0 ? filteredData : coinData);
  };
  
  const fetchCoinData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }
      );
      const formattedCoinData = response.data.map((coin: any) => ({
        id: coin.id,
        image: coin.image,
        name: coin.name,
        price: coin.current_price,
      }));
      setCoinData(formattedCoinData);
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };


  useEffect(() => {
    fetchCoinData();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {user.displayName} 👋</Text>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.filterButton} onPress={handleLogout}>
            <Feather name="power" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text); 
          }}
        />
      </View>

        {searchQuery.length === 0 ? (
        <FlatList
          data={coinData}
          keyExtractor={(item:any) => item.id}
          renderItem={({ item }) => 
          <TouchableOpacity onPress={() => handleCoinPress(item)}> 
            <CoinCard coinData={item} />
          </TouchableOpacity>
        }
        />) : (
          <FlatList
          data={filteredCoinData}
          keyExtractor={(item:any) => item.id}
          renderItem={({ item }) => 
          <TouchableOpacity onPress={() => handleCoinPress(item)}>
            <CoinCard coinData={item} />
          </TouchableOpacity>
        }
        />
        )
        }

      <CoinDetailsModal
        visible={selectedCoin !== null}
        coinData={selectedCoin}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#d2ccccdd',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
  },
  filterButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
