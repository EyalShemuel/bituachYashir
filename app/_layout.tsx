import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// מסכי האפליקציה
import EmptyAuthScreen from './screens/EmptyAuthScreen';
import OTPInputScreen from './screens/OTPInputScreen';
import OTPErrorScreen from './screens/OTPInputScreen';
import OTPCallbackScreen from './screens/OTPCallbackScreen';

// הגדרת טיפוסי NavigationParams עבור כל המסכים
export type RootStackParamList = {
  EmptyAuth: undefined;
  OTPInput: { phoneNumber?: string };
  OTPError: { phoneNumber?: string; errorMessage?: string };
  OTPCallback: { phoneNumber?: string };
};

// יצירת סטאק עם הטיפוסים המוגדרים
const Stack = createStackNavigator<RootStackParamList>();

/**
 * רכיב הניווט הראשי של האפליקציה
 * מגדיר את כל המסכים וזרימת הניווט ביניהם
 */

  export default function RootLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="EmptyAuth"
        screenOptions={{
          headerShown: false, // מסתיר את כותרת הניווט ברירת המחדל
          cardStyle: { backgroundColor: '#FFFFFF' }, // בקרוב נחליף ל-NativeWind
          // הגדרות נגישות לכל המסכים
          screenReaderAnnouncement: false, // לא להכריז על מעברי מסך אוטומטית
        }}
      >
        <Stack.Screen 
          name="EmptyAuth" 
          component={EmptyAuthScreen}
          options={{
            // הגדרות נגישות ספציפיות למסך
            title: 'התחברות',
            accessibilityLabel: 'מסך התחברות',
          }}
        />
        
        <Stack.Screen 
          name="OTPInput" 
          component={OTPInputScreen}
          options={{
            title: 'הזנת קוד אימות',
            // הגדרות נגישות למסך הזנת קוד אימות
            accessibilityLabel: 'מסך הזנת קוד אימות',
          }}
        />
        
        <Stack.Screen 
          name="OTPError" 
          component={OTPErrorScreen}
          options={{
            title: 'שגיאה בהזנת קוד',
            // הגדרות נגישות למסך שגיאה בהזנת קוד
            accessibilityLabel: 'מסך שגיאה בהזנת קוד אימות',
          }}
        />
        
        <Stack.Screen 
          name="OTPCallback" 
          component={OTPCallbackScreen}
          options={{
            title: 'שיחה חוזרת',
            // הגדרות נגישות למסך שיחה חוזרת
            accessibilityLabel: 'מסך בקשת שיחה חוזרת לקבלת קוד אימות',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// הוספת מידע נגישות לכל סוגי המסכים
// ניתן להשתמש בזה בקבצי המסכים עצמם
export interface ScreenNavigationProps<T extends keyof RootStackParamList> {
  navigation: {
    navigate: (screen: keyof RootStackParamList, params?: RootStackParamList[T]) => void;
    goBack: () => void;
  };
  route: {
    params: RootStackParamList[T];
    name: string;
  };
}

