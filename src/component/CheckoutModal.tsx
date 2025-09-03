import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

const CheckoutModal = ({
  onClose,
  modalVisible,
  productList,
}: {
  onClose: () => void;
  modalVisible: boolean;
  productList: Product[];
}) => {
  const [cartList, setCartList] = useState(productList);
  const [total, setTotal] = useState({ salePrice: 0, totalPrice: 0 });

  useEffect(() => {
    const updatedProducts = productList.map(product => {
      if (product.salePrice) {
        const saleprice =
          parseInt(product.quantity / product.salePrice?.quantity) *
          product.salePrice?.price;
        const extraPrice =
          parseInt(product.quantity % product.salePrice?.quantity) *
          product.unitPrice;
        console.log(extraPrice + saleprice);
        return { ...product, cartPrice: extraPrice + saleprice };
      }

      return product;
    });
    setCartList(updatedProducts);
  }, [productList]);

  useEffect(() => {
    setTotal({ salePrice: 0, totalPrice: 0 });
  }, [modalVisible]);

  const calcuateTotal = () => {
    const totalSalePrice = cartList.reduce((sum, product) => {
      return sum + (product?.cartPrice || 0);
    }, 0);

    const totalPrice = cartList.reduce((sum, product) => {
      return sum + product.unitPrice * product.quantity;
    }, 0);

    setTotal({ salePrice: totalSalePrice, totalPrice: totalPrice });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.modalText, { flex: 1 }]}>Checkout</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>X</Text>
            </Pressable>
          </View>
          <View style={{ width: '100%' }}>
            {cartList.map(item => (
              <View key={item.id} style={styles.containerStyle}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.qty}>Qty : {item.quantity}</Text>
                </View>
                {item?.salePrice ? (
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>
                      ${item?.unitPrice * item.quantity}
                    </Text>

                    <Text style={styles.discountedPrice}>
                      ${item?.cartPrice}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.priceContainer}>
                    <Text style={styles.discountedPrice}>
                      ${item?.unitPrice * item.quantity}
                    </Text>
                  </View>
                )}
              </View>
            ))}

            {total.salePrice !== 0 ? (
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>
                  Original Price : ${total?.salePrice}
                </Text>

                <Text style={styles.discountedPrice}>
                  Discounted Price :${total?.totalPrice}
                </Text>
              </View>
            ) : (
              <Pressable
                style={styles.checkoutButton}
                onPress={() => calcuateTotal()}
              >
                <Text style={styles.buttonText}>Calculate Total</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CheckoutModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end', // Align content to the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent backdrop
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%', // Occupy full width
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20, // Rounded top corners
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
  },
  border: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontWeight: 'medium', fontSize: 12 },
  qty: { fontSize: 10, color: 'grey' },
  originalPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
    fontSize: 8,
  },
  discountedPrice: {
    color: 'red',
    fontSize: 10,
    fontWeight: 'bold',
  },
  containerStyle: { flexDirection: 'row', marginVertical: 10 },
  closeButton: {
    backgroundColor: 'black',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeText: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
  },
  checkoutButton: {
    backgroundColor: 'blue',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  priceContainer: { alignSelf: 'flex-end', alignItems: 'flex-end' },
});
