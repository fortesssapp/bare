import React, { useContext }  from "react";
import { Modal, Dimensions, TouchableOpacity, Text, View }    from "react-native";
import { General }              from "../contexts/general";
import { Theme }                from "../contexts/theme";
import useStyle                 from "../assets/style/style";
import Fbutton                  from "./inputs/Fbutton";


export const MessagingModal = () => {
    
    const { message } = useContext(General);
    const { currentTheme }         = useContext(Theme);
    const STYLES                   = useStyle();

    return (
        <Modal
            transparent={true}
            animationType="fade"
            style={{
                width: Dimensions.get("screen").width, 
                height: Dimensions.get("screen").height
            }} visible={message.show}>
            <TouchableOpacity onPress={() => null}>
                <View 
                style={{
                    width: Dimensions.get("window").width, 
                    height: Dimensions.get("screen").height,
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    paddingHorizontal: 15
                }}>
                <View style={{
                    width: "100%", 
                    paddingTop: 30,
                    paddingBottom: 30,
                    paddingHorizontal: 15,
                    backgroundColor: "#ffffff",
                    flexDirection: "column",
                    borderRadius: 10,
                    shadowColor: '#444',
                    shadowOffset: {
                    width: 0,
                    height: 3,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 8,
                    }}>
                    <Text 
                        textBreakStrategy={"balanced"}
                        style={{ 
                        color: currentTheme.values.defaultColor, 
                        fontSize: currentTheme.values.fonts.large,
                        lineHeight: 30,
                        fontWeight: "600",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        marginBottom: 50
                    }}> {message.message} </Text>

                    <View style={[STYLES.actionsContainer, { minWidth: "100%" }]}>
                        <View style={[STYLES.actionButtonContainer, {paddingRight: 5}]}>
                            <Fbutton
                                text={message.negative}
                                color={currentTheme.values.danger}
                                onPress={() => {
                                    message.reject(false);
                                    message.close();
                                }}
                                onLongPress={() => null}
                                fluid
                                buttonStyle={{width: "100%"}}
                            />
                        </View>
                        <View style={[STYLES.actionButtonContainer, {paddingLeft: 5}]}>
                            <Fbutton
                                text={message.positive}
                                color={currentTheme.values.mainColor}
                                onPress={() => {
                                    message.accept(true);
                                    message.close();
                                }}
                                onLongPress={() => null}
                                fluid
                                buttonStyle={{width: "100%"}}
                            />
                        </View>
                    </View>
                </View>

                </View>
            </TouchableOpacity>

        </Modal>
    )
}
