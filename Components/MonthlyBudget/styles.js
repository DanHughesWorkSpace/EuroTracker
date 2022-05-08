import { StyleSheet } from "react-native";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // display: 'flex',
        flex: 6,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        // width: '100%',
        // height: '100%',
        // resizeMode: 'cover',
        // position: 'absolute'
    },
    monthlyBudgetContainer: {
        width: '98%',
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        marginTop: '5%'
    },
    monthlyHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center'
    },
    monthlyText: {
        
    },
    progressBar: {

    },
    progressBarBorder: {
        borderWidth: 2,
        borderRightWidth: 4,
        borderColor: 'yellow',
        borderRadius: 50,
        marginLeft: '2%',
        marginRight: '2%'

    },
    expensesDistributionGraph: {
        width: '66%',
        height: '49%',
        backgroundColor: 'white',
        borderRadius: 50,
        // padding: 10,
        // justifyContent: 'center',
        // alignItems:'center',
        marginBottom: '25%'
    },
    progressPecentText: {
        alignItems: 'center'
    },
    pieChartHeader: {
        // display: 'flex',
        // justifyContent: 'center',
        // alignContent: 'center'
    }
})

export default styles;