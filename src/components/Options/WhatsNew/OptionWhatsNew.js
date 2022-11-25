import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import OptionCard from "../OptionCard";
import WhatsNewModal from "./WhatsNewModal";

const OptionWhatsNew = () => {
  const { colors } = useTheme();
  const iconSize = 24;

  const [showWhatsNewModal, setShowWhatsNewModal] = useState(false);

  const pressHandler = () => {
    setShowWhatsNewModal(true);
  };

  return (
    <>
      <OptionCard
        iconName="bulb"
        iconSize={iconSize}
        color={colors.accent}
        title="Co nowego"
        optionText={"Ostatnia aktualizacja: 25.11.2022"}
        onPress={pressHandler}
      />

      {showWhatsNewModal && (
        <WhatsNewModal
          onModalVisible={showWhatsNewModal}
          onSetModalVisible={setShowWhatsNewModal}
        />
      )}
    </>
  );
};

export default OptionWhatsNew;
