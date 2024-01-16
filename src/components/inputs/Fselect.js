import React, { useContext } from "react";
import {  Modal, View, TouchableOpacity, Text, ScrollView, PanResponder, Animated, FlatList, Dimensions } from 'react-native';
import uuid from 'react-native-uuid';
import PropTypes    from 'prop-types';
import useStyles    from "./styles/Fstyles";
import { AppIcon }  from "../../assets/style/AppIcons";
import { Theme }    from "../../contexts/theme";
import Finput       from "./Finput";


const  Fselect = ({
    containerStyle = {},
    options = [],
    defaultValue = [],
    onSelect = () => null,
    textStyle = {},
    multiple = false,
    validation = {},
    leftIcon = "",
    rightIcon = "",
    name=" Option"
}) => {
const numitems                      = 25;
const { currentTheme }              = useContext(Theme);
const [isOpen, setIsOpen]           = React.useState(false);
const STYLES = useStyles();
const [isValid, setIsValid]         = React.useState(true);
const [selected, setSelected]       = React.useState([...defaultValue]);
const [selectedId, setSelectedId]   = React.useState([]);
const pan                           = React.useRef(new Animated.ValueXY()).current;
const searchRef                     = React.useRef(null);
const [searchList, setSearchList]   = React.useState([]);
const [DATA, setDATA]               = React.useState(options.slice(0,numitems));
const listRef                       = React.useRef(null);
const [refreshing, setRefresing]    = React.useState(false);

// handle dragging
const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) { // Allows only downward movement
          pan.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 150) { // Threshold to trigger close
            setIsOpen(false);
            pan.setValue({x:0, y: 0});
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    })
  ).current;


React.useEffect(() => {
    
    if(!isOpen){pan.setValue({x:0, y: 0});}

}, [isOpen]);


const handleChange = (value) => {
    // check if not value exists
    try {
        if(!multiple) setIsOpen(false);
    } catch (error) {
        
    }
}

const handleSearch = (value) => {
    const items = options.filter(item => (item.title.includes(value) || item.value?.toString()?.toLowerCase()?.includes(value?.toLowerCase())));
    if(items.length){
        setSearchList([...items]);
    }
    if(!value && !items.length){
        setSearchList([...[]]);
    }
}

const removeSearchValue = () => {
    try {
        if(searchRef.current?.getValue()?.length){
            searchRef.current?.removeValue();
        }
    } catch (error) {
        
    }
}

const handleItemSelect = React.useCallback((item) => {
    // console.log("is the click happening at all ?");
    handleChange(item.value);

    if(multiple && selectedId.includes(item.id)){
        // remove clicked item
        const all = selectedId;
        const index = selectedId.indexOf(item.id);
        all.splice(index, 1);
        setSelectedId([...all]);
        const selecteds = selected;
        const indexs    = selecteds.indexOf(item.value);
        selecteds.splice(indexs, 1);
        setSelected([...selecteds]);
        onSelect([...selecteds]);
        return;
    }

    if(!multiple && selectedId.length) {
        if(selectedId.includes(item.id)){
            const hold = selectedId;
            const index = hold.indexOf(item.id);
            hold.splice(index, 1);
            setSelectedId([...hold]);

            const holdSelect = selected;
            const holdIndex = holdSelect.indexOf(item.value);
            holdSelect.splice(holdIndex, 1);
            setSelected([...holdSelect]);
            onSelect([...holdSelect]);
            return;
        }else{
            setSelectedId([...[item.id]]);
            setSelected([...[],item.value]);
            onSelect([...[],item.value]);
            return;
        }
    }
    if(!selectedId.includes(item.id)) {
        setSelectedId([...selectedId, item.id]);
        setSelected([...selected, item.value]);
        onSelect([...selected, item.value]);
    }
}, [selectedId]);

// begin list and items render
const Item = ({itemKey, item, onPress, backgroundColor, textColor, checkColor}) => (
    <TouchableOpacity key={itemKey} onPress={() => onPress(item)} style={[STYLES.item, {backgroundColor}]}>
      <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <View style={{marginEnd: "auto"}}>
        <Text style={[STYLES.itemTextStyle, {color: textColor}]}>{item.title}</Text>
      </View>
      
      <View>
        <View style={{
            width: 20, 
            height: 20, 
            borderRadius: 10, 
            backgroundColor: checkColor, 
            alignContent: "center", 
            justifyContent: "center", 
            alignItems: "center"
            }}><AppIcon name="close" color="#fff" size={14} /></View>
      </View>
    
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const inSelected        = selectedId.find(id => id === item.id);
    const backgroundColor   = inSelected ? currentTheme.values.lightColor : "#fff";
    const color = inSelected ? 
    ((currentTheme.name === "dark"? 
    currentTheme.values.defaultBackground: 
    (currentTheme.values.defaultColor))) : 
    ((currentTheme.name === "dark"? 
    currentTheme.values.defaultBackground: 
    (currentTheme.values.defaultColor)));
    
    const checkColor = inSelected ? ((currentTheme.name === "dark"? currentTheme.values.defaultBackground: (currentTheme.values.mainColor))) : "#fff";

    return (
      <Item
        itemKey={uuid.v4()}
        item={item}
        onPress={handleItemSelect}
        backgroundColor={backgroundColor}
        textColor={color}
        checkColor={checkColor}
      />
    );
  }

// make sure that when data changes, the list updates
React.useEffect(() => {}, [DATA, refreshing]);
React.useEffect(() => {
    if(options.length && DATA.length === 0){
        setDATA([...options.slice(0,25)]);
    }
}, [options]);

const handleNextBatch = () => {

    if(!DATA?.length) return;
    // take last element 
    const lastElem = DATA[DATA.length - 1];
    // find it index in optons
    const leIndex = options.indexOf(lastElem);
    // define a method that adds 25 to the current index
    const stop = (leIndex + numitems);
    const nb = options.slice((leIndex + 1), (stop + 1));
    if(nb.length){
       if(nb.length === numitems) setDATA([...nb]);
       if(nb.length < numitems) setDATA([...DATA, ...nb]);
        listRef.current.scrollToOffset({
            animated: true,
            offset: 0.5
        });
    }
}

const toggleRefresh = (force = false) => {
    setRefresing(force ? false: !refreshing);
}

const handleRefresh = () => {
    if(refreshing) toggleRefresh(true);
    if(!DATA.length) return;
    toggleRefresh();
    // take the first element
    const first = DATA[0];
    // get the index of the last
    const indexFirst = options.indexOf(first);
    
    if(indexFirst === 0) {toggleRefresh(true); return;}
    // staing point
    const startat = (indexFirst - numitems);

    if(startat < 0) {toggleRefresh(true); return;}

    const elist = options.slice(startat, indexFirst);
    console.log(elist.length, " list length");
    toggleRefresh(true);
    setDATA([...elist]);
}



return (
    <>
        <TouchableOpacity style={{width: "100%"}} onPress={() => setIsOpen(true)}>
            <View style={[STYLES.container, !isValid && STYLES.errorBorder, containerStyle]}>
            {leftIcon && (
                <AppIcon name={leftIcon} size={24} style={{...STYLES.icon}} />
            )}

            <View style={{...STYLES.selectedContainer}}> 
                <Text 
                    numberOfLines={1} 
                    style={[
                        STYLES.selectedText, 
                        textStyle, 
                        {...(selected.length? {}: {color: currentTheme.values.placeholders})}
                    ]}>{`${selected.length? selected[0] + (selected.length > 1 ? '+('+(selected.length - 1)+' more)': ''): " "+name}`}</Text>
            </View>

            {rightIcon && (
                <AppIcon name={rightIcon} size={24} style={{...STYLES.iconr}} />
            )}
            </View>
        </TouchableOpacity>
        <Modal 
                animationType="slide"
                transparent={true}
                visible={isOpen}
        >
            <Animated.View 
                style={[STYLES.animatedView, { 
                    transform: [{ translateY: pan.y }], 
                }]}
                {...panResponder.panHandlers}>
                    {/*Add a view that signifies closure*/}
                <View style={{
                    position: "absolute",
                    width: 60,
                    height: 8,
                    top: 5,
                    backgroundColor: "#e3e3e3",
                    borderRadius: 10,
                    alignSelf: "center"
                }} ></View>

                <View style={{
                    position: "absolute",
                    width: 100,
                    height: 25,
                    right: 1,
                    top: 5,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    alignSelf: "flex-end"
                }} >
                    <TouchableOpacity onPress={()=>setIsOpen(false)}>
                        <Text style={{
                            fontSize: currentTheme.values.fonts.large, 
                            color: currentTheme.values.mainColor,
                            textAlign: "center",
                            fontWeight: "bold"
                            }}> Done </Text></TouchableOpacity>
                    </View>

                <FlatList
                    ref={listRef}
                    ListHeaderComponent={
                        <Finput
                        style={{borderRightWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, paddingVertical: 7}}
                        inputLabel={"Search list"}
                        ref={searchRef}
                        type="text"
                        rightIcon="card-search"
                        validation={{ maxLength: 50 }}
                        onValueChange={(value) => handleSearch(value)}
                        rightIconSize={35}
                        />
                    }
                    data={(searchList.length && (searchRef.current?.getValue()?.length >= 1))? searchList: DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                    numColumns={1}
                    extraData={selectedId}
                    onEndReached={handleNextBatch}
                    style={{
                        marginTop: 30,
                        paddingBottom: 60
                    }}
                />
            </Animated.View>
            
        </Modal>
    </>
)
}


Fselect.propTypes = {
    containerStyle: PropTypes.object,
    defaultValue: PropTypes.string,
    textStyle: PropTypes.object,
    multiple: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    validation: PropTypes.object.isRequired,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    name: PropTypes.string.isRequired
}


export default Fselect;