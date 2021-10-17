import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from "../../constants";

const Home = ({ navigation }) => {
  const categoryData = [
    {
      id: 1,
      name: "Rice",
      icon: icons.rice_bowl,
    },
    {
      id: 2,
      name: "Noodles",
      icon: icons.noodle,
    },

    {
      id: 3,
      name: "Pizza",
      icon: icons.pizza,
    },

    {
      id: 4,
      name: "Desserts",
      icon: icons.donut,
    },
    {
      id: 5,
      name: "Burgers",
      icon: icons.hamburger,
    },
    {
      id: 6,
      name: "Drinks",
      icon: icons.drink,
    },
  ];

  // price rating
  const affordable = 1;
  const fairPrice = 2;
  const expensive = 3;

  const restaurantData = [
    {
      id: 1,
      name: "Burger",
      categories: [5],
      photo: images.burger_restaurant_1,
      menu: [
        {
          menuId: 1,
          name: "Crispy Chicken Burger",
          photo: images.crispy_chicken_burger,
          description: "Burger with crispy chicken, cheese and lettuce",
          price: 1000,
        },
        {
          menuId: 2,
          name: "Crispy Chicken Burger with Honey Mustard",
          photo: images.honey_mustard_chicken_burger,
          description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
          price: 1500,
        },
        {
          menuId: 3,
          name: "Crispy Baked French Fries",
          photo: images.baked_fries,
          description: "Crispy Baked French Fries",
          price: 1940,
        },
      ],
    },
    {
      id: 2,
      name: "Pizza",
      categories: [2, 3, 4],
      photo: images.pizza_restaurant,

      menu: [
        {
          menuId: 4,
          name: "Hawaiian Pizza",
          photo: images.hawaiian_pizza,
          description: "Canadian bacon, homemade pizza crust, pizza sauce",
          price: 750,
        },
        {
          menuId: 5,
          name: "Tomato & Basil Pizza",
          photo: images.pizza,
          description:
            "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
          price: 250,
        },
        {
          menuId: 6,
          name: "Tomato Pasta",
          photo: images.tomato_pasta,
          description: "Pasta with fresh tomatoes",
          price: 1000,
        },
      ],
    },

    {
      id: 3,
      name: "Noodles",
      categories: [1, 2],
      photo: images.noodle_shop,

      menu: [
        {
          menuId: 10,
          name: "Kolo Mee",
          photo: images.kolo_mee,
          description: "Noodles with char siu",
          calories: 200,
          price: 5,
        },
        {
          menuId: 11,
          name: "Sarawak Laksa",
          photo: images.sarawak_laksa,
          description: "Vermicelli noodles, cooked prawns",
          calories: 300,
          price: 8,
        },
        {
          menuId: 12,
          name: "Nasi Lemak",
          photo: images.nasi_lemak,
          description: "A traditional Malay rice dish",
          calories: 300,
          price: 8,
        },
        {
          menuId: 13,
          name: "Nasi Briyani with Mutton",
          photo: images.nasi_briyani_mutton,
          description: "A traditional Indian rice dish with mutton",
          calories: 300,
          price: 8,
        },
      ],
    },
    {
      id: 4,
      name: "Dessets",
      categories: [4, 6],
      photo: images.kek_lapis_shop,

      menu: [
        {
          menuId: 12,
          name: "Teh C Peng",
          photo: images.teh_c_peng,
          description: "Three Layer Teh C Peng",
          calories: 100,
          price: 2,
        },
        {
          menuId: 13,
          name: "ABC Ice Kacang",
          photo: images.ice_kacang,
          description: "Shaved Ice with red beans",
          calories: 100,
          price: 3,
        },
        {
          menuId: 14,
          name: "Kek Lapis",
          photo: images.kek_lapis,
          description: "Layer cakes",
          calories: 300,
          price: 20,
        },
      ],
    },
  ];

  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation
  );

  function onSelectCategory(category) {
    //filter restaurant
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(category.id)
    );

    setRestaurants(restaurantList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) return category[0].name;

    return "";
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginBottom: SIZES.padding * 2 }}
        onPress={() =>
          navigation.navigate("Restaurant", {
            item,
          })
        }
      >
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        {/* Restaurant Info */}
        <Text>{item.name}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
          }}
        >
          {/* Categories */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          >
            {item.categories.map((categoryId) => {
              return (
                <View style={{ flexDirection: "row" }} key={categoryId}>
                  <Text>{getCategoryNameById(categoryId)}</Text>
                  <Text style={{ color: COLORS.darkgray }}> . </Text>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
