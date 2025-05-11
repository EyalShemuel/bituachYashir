import React from 'react';
import { Text, TextProps } from 'react-native';

/**
 * Props לקומפוננטת טקסט נגישה
 */
interface AccessibleTextProps extends Omit<TextProps, 'style'> {
  children: React.ReactNode;
  isHeading?: boolean;
  isBold?: boolean;
  accessibilityLabel?: string;
  testID?: string;
  className?: string; // מחלקות nativewind
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'; // גדלי טקסט
  align?: 'left' | 'center' | 'right' | 'justify'; // יישור טקסט
}

/**
 * קומפוננטת טקסט נגישה
 * מוסיפה תכונות נגישות לכל טקסט באפליקציה
 */
const AccessibleText: React.FC<AccessibleTextProps> = ({ 
  children, 
  isHeading = false, 
  isBold = false,
  accessibilityLabel,
  testID,
  className = '',
  size,
  align = 'right', // ברירת מחדל לעברית
  ...props 
}) => {
  // קביעת תפקיד הנגישות - כותרת או טקסט רגיל
  const accessibilityRole = isHeading ? 'header' : 'text';
  
  // הגדרת מחלקות בסיסיות
  const baseClasses = 'text-text-primary'; // צבע טקסט ברירת מחדל
  
  // הגדרת גודל הטקסט
  const sizeClass = size 
    ? `text-${size}` 
    : isHeading 
      ? 'text-xl' 
      : 'text-base';
  
  // הגדרת משקל הגופן
  const weightClass = (isHeading || isBold) ? 'font-bold' : 'font-normal';
  
  // הגדרת יישור הטקסט
  const alignClass = `text-${align}`;
  
  // שילוב כל המחלקות
  const textClasses = `${baseClasses} ${sizeClass} ${weightClass} ${alignClass} ${className}`;
  
  return (
    <Text
      className={textClasses}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessible={true}
      testID={testID}
      {...props}
    >
      {children}
    </Text>
  );
};

export default AccessibleText;