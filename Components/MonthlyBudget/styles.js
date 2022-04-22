import { StyleSheet } from "react-native";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'yellow',
        flex: 5,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute'
    },
    monthlyBudgetContainer: {
        height: '12%',
        width: '98%',
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
    },
    monthlyHeader: {
        display: 'flex',
        flexDirection: 'row',

    },
    monthlyText: {
        backgroundColor:'green',
        width: '95%'
    },
    progressBar: {
        // height: '70%',
        width: '100%',
        backgroundColor: 'red',

    },
    progressBarBorder: {
        borderWidth: 2,
        borderRightWidth: 4,
        borderColor: 'yellow'
    }
})

export default styles;