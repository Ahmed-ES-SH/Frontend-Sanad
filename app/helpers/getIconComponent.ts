import * as FaIcons from "react-icons/fa";

export const getIconComponent = (iconName: string) => {
  return FaIcons[iconName as keyof typeof FaIcons] || FaIcons.FaQuestionCircle;
};