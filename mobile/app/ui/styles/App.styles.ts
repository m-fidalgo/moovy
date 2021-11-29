import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const { colors, fonts } = useTheme();

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    fontFamily: fonts.regular,
  },
});
