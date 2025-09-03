import { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CheckoutModal from '../component/CheckoutModal';

const PRICING_EXAMPLES: Product[] = [
  {
    name: 'Milk',
    quantity: 0,
    unitPrice: 3.97,
    salePrice: { quantity: 2, price: 5.0 },
    id: 1,
  },
  {
    name: 'Bread',
    quantity: 0,
    unitPrice: 2.17,
    salePrice: { quantity: 3, price: 6.0 },
    id: 2,
  },
  {
    name: 'Banana',
    quantity: 0,
    unitPrice: 0.99,
    id: 3,
  },
  {
    name: 'Apple',
    quantity: 0,
    unitPrice: 0.89,
    id: 4,
  },
];

function HomeScreen() {
  const [productList, setProductList] = useState(PRICING_EXAMPLES);
  const [modalVisible, setModalVisible] = useState(false);

  const addItem = (item: Product) => {
    const updatedProducts = productList.map(product => {
      console.log(product.id, item.id);
      if (product.id === item.id) {
        return { ...product, quantity: 1 };
      }
      return product;
    });
    setProductList(updatedProducts);
  };

  const increaseQty = (item: Product) => {
    const updatedProducts = productList.map(product => {
      console.log(product.id, item.id);
      if (product.id === item.id) {
        return { ...product, quantity: item.quantity + 1 };
      }
      return product;
    });
    console.log('increaseQty', updatedProducts);
    setProductList(updatedProducts);
  };

  const decreaseQty = (item: Product) => {
    const updatedProducts = productList.map(product => {
      console.log(product.id, item.id);
      if (product.id === item.id) {
        return { ...product, quantity: item.quantity - 1 };
      }
      return product;
    });
    console.log('decreaseQty', updatedProducts);
    setProductList(updatedProducts);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.border}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>${item.unitPrice}</Text>
          {item?.salePrice && (
            <Text style={styles.salePrice}>
              Sale: {item.salePrice.quantity} for $
              {item.salePrice.price.toFixed(2)}
            </Text>
          )}
        </View>
        <Pressable style={styles.borderButton} onPress={() => addItem(item)}>
          {item.quantity == 0 ? (
            <Text style={styles.title}>Add To Cart</Text>
          ) : (
            <View style={styles.buttonLayout}>
              <Pressable onPress={() => decreaseQty(item)}>
                <Text style={styles.addButton}>-</Text>
              </Pressable>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Pressable onPress={() => increaseQty(item)}>
                <Text style={styles.addButton}>+</Text>
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
  const changeModalVisibility = () => setModalVisible(!modalVisible);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={productList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProductItem}
      />
      <Pressable
        style={styles.checkoutButton}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
      <CheckoutModal
        onClose={changeModalVisibility}
        modalVisible={modalVisible}
        productList={productList.filter(item => item.quantity > 0)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  border: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontWeight: 'medium', fontSize: 12 },
  price: { fontSize: 10 },
  salePrice: { fontSize: 10, color: 'grey', fontStyle: 'italic' },
  borderButton: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 120,
  },
  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    fontWeight: 'medium',
    fontSize: 14,
    width: 20,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  quantity: { flex: 1, textAlign: 'center', alignSelf: 'center', fontSize: 12 },
  checkoutButton: {
    position: 'absolute',
    backgroundColor: 'blue',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
export default HomeScreen;
