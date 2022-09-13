import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

const ProfileScreen = () => {
  const { colors } = useTheme();

  return (
    <>
      <Text>Profile</Text>
    </>
  );
};

export default ProfileScreen;
