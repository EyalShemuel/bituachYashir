import React, { useState } from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import AccessibleText from './AccessibleText';

/**
 * Props לקומפוננטת קלט טקסט נגישה
 */
interface AccessibleInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;  
  textStyle?: string; // עבור סגנון טקסט מותאם אישית בנייטיבווינד
  containerStyle?: string; // עבור סגנון מיכל מותאם אישית בנייטיבווינד
  required?: boolean; // האם השדה חובה
}

/**
 * קומפוננטת קלט טקסט נגישה עם תמיכה בנייטיבווינד
 */
const AccessibleInput: React.FC<AccessibleInputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  errorMessage,
  accessibilityLabel,
  accessibilityHint,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  multiline = false,
  testID,
  required,
  textStyle = '',
  containerStyle = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  // בניית מחלקות נייטיבווינד בהתאם למצב
  const containerClasses = `mb-4 w-full ${error ? 'mb-6' : ''} ${containerStyle}`;
  
  const labelClasses = `mb-1 text-gray-600 text-sm text-right ${error ? 'text-error-500' : ''}`;
  
  const inputClasses = `
    h-12 border border-gray-300 rounded px-4 text-text-primary text-base text-right
    ${error ? 'border-error-500' : ''}
    ${isFocused ? 'border-primary-500 border-2' : ''}
    ${multiline ? 'h-24 py-2' : ''}
    ${textStyle}
  `;
  
  const errorTextClasses = 'text-error-500 text-xs mt-1 text-right';
  
  // רכיב תווית עבור שדה הקלט - חשוב לנגישות
  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <AccessibleText
        className={labelClasses}
        testID={`${testID}-label`}
        accessibilityRole="text"
      >
        {label}
      </AccessibleText>
    );
  };
  
  // רכיב הודעת שגיאה
  const renderError = () => {
    if (!error || !errorMessage) return null;
    
    return (
      <AccessibleText
        className={errorTextClasses}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        testID={`${testID}-error`}
      >
        {errorMessage}
      </AccessibleText>
    );
  };

  // יצירת מזהה ייחודי לחיבור התווית לשדה הקלט
  const inputId = testID || `input-${label?.replace(/\s+/g, '-').toLowerCase() || Math.random().toString(36).substring(2, 9)}`;

  return (
    <View className={containerClasses}>
      {renderLabel()}
      
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className={inputClasses}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af" // טקסט מקום שמור (gray-400)
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accessible={true}
        accessibilityLabel={`${accessibilityLabel || label || placeholder}${required ? ', שדה חובה' : ''}`}
        accessibilityHint={`${accessibilityHint || ''}${required ? ' שדה זה הוא שדה חובה.' : ''}`}
        accessibilityRole="text"
        nativeID={inputId}
        accessibilityLabelledBy={label ? `${inputId}-label` : undefined}
        accessibilityState={{
          disabled: props.editable === false,
         
        }}
        testID={testID}
        {...props}
      />
      
      {renderError()}
    </View>
  );
};

export default AccessibleInput;