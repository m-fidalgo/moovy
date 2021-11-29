import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const { colors, fonts } = useTheme();

export const movieCardStyle = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginTop: 100,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
