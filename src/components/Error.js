import React, { useContext }  from "react";
import { Modal, Dimensions, TouchableOpacity, StatusBar, Platform }    from "react-native";
import { General }  from "../contexts/general";
import { ErrorView } from "../assets/style/ErrorView";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";


export const ErrorModal = () => {
    const { errorShown, showError, error }      = useContext(General);
    return (
        <Modal
            transparent={true}
            animationType="fade"
            style={{
                width: Dimensions.get("screen").width, 
                height: Dimensions.get("screen").height
            }} visible={errorShown}>
            <SafeAreaInsetsContext.Consumer>
                {insets => (
                    <TouchableOpacity style={{
                        marginTop: 0,
                        minWidth: "100%",
                        position: "relative",
                        zIndex: 9999
                    }} onPress={() => showError(false, "")}>
                    <ErrorView 
                        animate={errorShown}
                        error={error} 
                        topPadding={( Platform.OS === "android"? StatusBar.currentHeight: insets.top)} 
                    />
                    </TouchableOpacity>
                )}
            </SafeAreaInsetsContext.Consumer>
        </Modal>
    )
}
