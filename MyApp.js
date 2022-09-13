import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyApp = () => {
  const MyTheme = {
    colors: {
      primary: "#2d6fff",
      darkPrimary: "#0c0e22",
      accent: "#03A9F4",
      background: "#000000",
      card: "#1d1d1d",
      text: "#FFFFFF",
      border: "#243ac9",
    },
  };

  const ExpensesScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            // backgroundColor: "black",
          },
          // headerTintColor: MyTheme.colors.accent,
          headerTitleAlign: "center",
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "Wydatki",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="wallet" size={24} color={color} />
            ),
            headerTitle: "Moje wydatki",
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            ),
            headerTitle: "Profil",
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            // backgroundColor: "black",
          },
          headerTintColor: MyTheme.colors.accent,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="ExpensesScreen"
          component={ExpensesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;
