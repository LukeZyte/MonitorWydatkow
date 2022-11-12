import {
  DarkTheme,
  NavigationContainer,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import AllExpensesScreen from "./src/screens/AllExpensesScreen";
import { useContext } from "react";
import { ThemeContext } from "./store/themeContext";
import { StatusBar } from "expo-status-bar";
import { AppStyle } from "./src/constants/style";
import LogoBarImage from "./LogoBarImage";
import WhatsNewButton from "./WhatsNewButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyApp = () => {
  const { currentTheme, isDarkTheme } = useContext(ThemeContext);

  const ExpensesScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            // backgroundColor: "black",
            // borderBottomColor: "red",
            // borderBottomWidth: 0,
            elevation: 0,
          },
          headerTitleAlign: "center",
          headerTintColor: currentTheme.colors.header,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: isDarkTheme
            ? currentTheme.colors.primary
            : currentTheme.colors.primary,
          tabBarStyle: {
            height: 60,
            paddingVertical: 10,
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "Wydatki",
            tabBarLabelStyle: {
              fontSize: AppStyle.fontSize.medium,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="wallet" size={24} color={color} />
            ),
            headerTitle: "",
            headerBackground: () => <LogoBarImage />,
            // headerTitle: "Monitor Wydatków",
            headerRight: () => <WhatsNewButton />,
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profil",
            tabBarLabelStyle: {
              fontSize: AppStyle.fontSize.medium,
            },
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
    <NavigationContainer theme={currentTheme}>
      <StatusBar
        style={currentTheme.colors.text === "#FFFFFF" ? "light" : "dark"}
      />

      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            // backgroundColor: "black",
          },
          // headerTintColor: MyTheme.colors.accent,
          headerTitleAlign: "center",
          headerTintColor: currentTheme.colors.header,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: isDarkTheme
            ? currentTheme.colors.primary
            : currentTheme.colors.background,
          tabBarStyle: {
            height: 60,
            paddingVertical: 10,
            borderTopWidth: 0,
          },
        }}
      >
        <Stack.Screen
          name="ExpensesScreen"
          component={ExpensesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllExpensesScreen"
          component={AllExpensesScreen}
          options={{
            headerTitle: "Wszystkie wydatki",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;
