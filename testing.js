import React from 'react';
import { View, ScrollView, findNodeHandle, TouchableOpacity, Dimensions, Text, FlatList } from 'react-native';
const { width, height } = Dimensions.get('window')






class DemoApp extends React.Component {
    state = {
        index: 0,
        list: [],
    }
    render() {
        const { index } = this.state
        console.log(this.state.index)
        return (
            <View style={{ flex: 1, marginVertical: 150, justifyContent: 'center', alignItems: 'center' }}>

                <View style={{}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ index: index - 1 }, () => {
                                this.scroll.scrollToIndex({ index: this.state.index, animated: true })
                            })
                        }}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ index: index + 1 }, () => {
                                this.scroll.scrollToIndex({ index: this.state.index, animated: true })
                            })
                        }}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ index: 5 }, () => {
                                this.scroll.scrollToIndex({ index: 5, animated: true })
                            })
                        }}>
                        <Text>snap to 5</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    scrollEnabled={false}
                    data={[1, 2, 3, 4, 5, 6, 7]}
                    style={{ flex: 1 }}
                    horizontal
                    ref={(node) => this.scroll = node}
                    renderItem={({ item, index: i }) => {
                        return (
                            <View style={{ width: width, height: 200, justifyContent: 'center', alignItems: 'center' }} >
                                {i >= index - 1 && i <= index + 2 ? <View >
                                    {console.log('is Component load')}
                                    <Text style={{ fontSize: 30 }}>{item}</Text>
                                </View> : null}
                            </View>
                        )
                    }}
                />
                {/* {[1, 2, 3, 4, 5, 6, 7].map((x, i) => {
                        console.log(i >= index - 1 && i <= index + 1)
                        return (
                            <View style={{ width: width, height: 200, backgroundColor: 'yellow', borderColor: 'black', borderWidth: 2 }} >
                                <Text style={{ fontSize: 30 }}>{i}</Text>ire
                        )
                    })} */}

                {/* </ScrollView> */}
            </View>
        )
    }
}


export default DemoApp
