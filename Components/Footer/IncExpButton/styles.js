
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#ffffff',
        // height: 100,
        // width: 100,
        borderRadius: 50,
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputForm: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        // width: '100%'
        // padding: 10,
        
    },
    firstrow: {
        // width: '100%'
    },
    dropdown: {
        // borderColor: 'black',
        // borderWidth: 1,
        width: 150,
        // padding: 20
        // height: '100%'

    },
    secondrow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: '100%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

})

export default styles;