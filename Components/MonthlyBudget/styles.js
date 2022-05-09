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
        width: '70%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 15,
        // justifyContent: 'space-between',
        // alignItems:'center',
        marginBottom: '25%'
    },
    progressPecentText: {
        alignItems: 'center'
    },
    pieChartHeader: {
        // display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    pieChartLegend: {
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        width: '100%',
        // backgroundColor:'red'
    },
    pieChartContainer: {
        height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        justifyContent: 'space-evenly',
        alignItems:'center',
        // padding: 
    },
    square: {
        height: 20,
        width: 20,
        // alignItems: 'center'
        // backgroundColor:'red'
    },
    legendContainer: {
        display: 'flex',
        alignItems: 'center'    
    }
})

export default styles;