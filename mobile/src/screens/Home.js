import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "../components/Slider";
import ProductList from "./ProductList";
import CategorySlider from "../components/CategorySlider";
import { products, categories } from "../database/DataBase";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Feather";
import { IconButton } from "@react-native-material/core";


function BottomNav() {
    const navigation = useNavigation();
    return (
        <View
            style={{
                maxHeight: 50,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'baseline',
            }}>
            <IconButton style={{ flex: 1 }} icon={(props) => <Icon name='home' {...props} />} color='primary' onPress={() => navigation.navigate('Home')} />
            <IconButton style={{ flex: 1 }} icon={(props) => <Icon name='search' {...props} />} color='primary' onPress={() => navigation.navigate('Home')} />
            <IconButton
                style={{ flex: 1 }}
                icon={(props) => <Icon name='heart' {...props} />}
                color='primary'
                onPress={() => navigation.navigate('Favorite')}
            />
            <IconButton style={{ flex: 1 }} icon={(props) => <Icon name='user' {...props} />} color='primary' onPress={() => navigation.navigate('Account')} />
        </View>
    );
}

const Home = () => {
    const [product, setProduct] = React.useState([]);

    const sliderImages = [
        require('../assets/images/banner/bannerImgOne.webp'),
        require('../assets/images/banner/bannerImgTwo.webp'),
        require('../assets/images/banner/bannerImgThree.webp'),
    ];

    React.useEffect(() => {
        setProduct(products);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Slider sliderImage={sliderImages} />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <CategorySlider list={categories} />
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginVertical: 10,
                            }}>
                            <Text
                                style={{
                                    marginHorizontal: 20,
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                }}>
                                New Arrival
                            </Text>
                            <Text style={{ marginHorizontal: 20 }}>See All</Text>
                        </View>
                        <ProductList products={product} />
                    </View>
                </ScrollView>
            </View>
            <BottomNav />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 16,
  },
});
export default Home;
