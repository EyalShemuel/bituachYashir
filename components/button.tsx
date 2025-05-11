import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { cssInterop } from "nativewind";

const StyledView = cssInterop(TouchableOpacity, {});
const StyledText = cssInterop(Text, {});

/**
 * קומפוננטת כפתור נגישה
 * כוללת תכונות נגישות מתקדמות
 */
interface AccessibleButtonProps {
  onPress: () => void;
  title: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  testID?: string;
  variant?: 'primary' | 'secondary' | 'text';
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  onPress,
  title,
  accessibilityLabel,
  accessibilityHint,
  disabled = false,
  className = '',
  textClassName = '',
  testID,
  variant = 'primary', // primary, secondary, text
}) => {
  // קביעת מחלקות עבור הכפתור לפי הוריאנט
  const buttonClasses = `
    min-h-12 justify-center items-center p-3 rounded
    ${variant === 'primary' ? 'bg-primary' : ''}
    ${variant === 'secondary' ? 'bg-transparent border border-primary' : ''}
    ${variant === 'text' ? 'bg-transparent p-2 min-h-10' : ''}
    ${disabled ? 'bg-border border-border' : ''}
    ${className}
  `;
  
  // קביעת מחלקות עבור הטקסט לפי הוריאנט
  const textClasses = `
    text-base font-bold text-center
    ${variant === 'primary' ? 'text-white' : ''}
    ${variant === 'secondary' ? 'text-primary' : ''}
    ${variant === 'text' ? 'text-primary underline' : ''}
    ${disabled ? 'text-textDisabled' : ''}
    ${textClassName}
  `;
  
  return (
    <StyledView
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      className={buttonClasses}
      disabled={disabled}
      testID={testID}
    >
      <StyledText className={textClasses}>
        {title}
      </StyledText>
    </StyledView>
  );
};

export default AccessibleButton;