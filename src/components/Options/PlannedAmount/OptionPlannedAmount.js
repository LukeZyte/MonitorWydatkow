import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Appearance } from "react-native";
import { PlannedAmountContext } from "../../../../store/plannedAmountContext";
import OptionCard from "../OptionCard";
import PlannedAmountModal from "./PlannedAmountModal";

const OptionPlannedExpenses = () => {
  const { colors } = useTheme();
  const { plannedAmount } = useContext(PlannedAmountContext);
  const iconSize = 24;
  const systemTheme = Appearance.getColorScheme();

  const [showNewAmountModal, setShowNewAmountModal] = useState(false);

  const pressHandler = () => {
    setShowNewAmountModal(true);
  };

  return (
    <>
      {showNewAmountModal && (
        <PlannedAmountModal
          onModalVisible={showNewAmountModal}
          onSetModalVisible={setShowNewAmountModal}
        />
      )}

      <OptionCard
        iconName={"wallet"}
        iconSize={iconSize}
        color={colors.accent}
        title="Kwota miesięcznego budżetu"
        optionText={plannedAmount ? `${plannedAmount} zł` : "Brak"}
        onPress={pressHandler}
      />
    </>
  );
};

export default OptionPlannedExpenses;
