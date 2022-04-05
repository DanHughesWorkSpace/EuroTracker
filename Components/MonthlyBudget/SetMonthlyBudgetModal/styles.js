import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // flex:1
    },
    btn: {
        height: 'auto',
        // width: '30%',
        backgroundColor: 'yellow',
        // flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // height:'100%'
        // marginTop: 22
    },
    modalView: {
        // flex: 'grow',
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    confirmButton: {
        alignItems: 'center'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
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