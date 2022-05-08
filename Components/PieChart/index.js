// import React from 'react';
// import {
//   Text,
//   View,
//   Dimensions
// } from 'react-native';
// // import { PieChart } from 'react-native-svg-charts'
// import { PieChart } from 'react-native-chart-kit'

//  class PieChartWithDynamicSlices extends React.PureComponent {

//   constructor(props) {

//     super(props);
//     const { keysDataArray, valuesDataArray } = props;
//     this.state = {
//       selectedSlice: {
//         label: '',
//         value: 0
//       },
//       labelWidth: 0,
//       keysDataArray: keysDataArray,
//       valuesDataArray: valuesDataArray
//     }
//     // console.log("yeahhhhhhhh babby", keysDataArray);
//   }
//   render() {

//     const { labelWidth, selectedSlice, keysDataArray, valuesDataArray } = this.state;
//     const { label, value } = selectedSlice;
//     const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter'];
//     const values = [15, 25, 35, 45, 55];
//     const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff']
//     // const data = keysDataArray.map((key, index) => {
//     //     return {
//     //       key,
//     //       value: valuesDataArray[index],
//     //       svg: { fill: colors[index] },
//     //       arc: { outerRadius: (70 + valuesDataArray[index]) + '%', padAngle: label === key ? 0.1 : 0 },
//     //       onPress: () => this.setState({ selectedSlice: { label: key, value: valuesDataArray[index] } })
//     //     }
//     //   })
//     //   console.log("yeahhhhhhhh babby", data);

//     const deviceWidth = Dimensions.get('window').width

//     const data = [
//         { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//         { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//         { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//         { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//         { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
//       ]

//     return (
//     //   <View style={{ justifyContent: 'center', flex: 1 }}>
//     //     <PieChart
//     //       style={{ height: 200 }}
//     //       outerRadius={'80%'}
//     //       innerRadius={'45%'}
//     //       data={data}
//     //     />
//     //     <Text
//     //     //   onLayout={({ nativeEvent: { layout: { width } } }) => {
//     //     //     this.setState({ labelWidth: width });
//     //     //   }}
//     //       style={{
//     //         position: 'absolute',
//     //         left: deviceWidth / 2 - labelWidth / 2,
//     //         textAlign: 'center'
//     //       }}>
//     //       {`${label} \n ${value}`}
//     //     </Text>
//     //   </View>
//     <PieChart
//     data={data}
//     width={200}
//     height={220}
//     chartConfig={{
//         backgroundColor: '#e26a00',
//         backgroundGradientFrom: '#fb8c00',
//         backgroundGradientTo: '#ffa726',
//         decimalPlaces: 2, // optional, defaults to 2dp
//         color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//         style: {
//           borderRadius: 16
//         }
//       }}
//     accessor="population"
//     backgroundColor="transparent"
//     paddingLeft="15"
//   />
//     )
//   }
// }

// export default PieChartWithDynamicSlices;

import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-native-svg-charts'

const PieChartWithDifferentArcs = (props) => {

    const { array1 } = props;

    const colors = ['#600080','#9900cc','#ecb3ff','#c61aff','#d966ff' ]

    // const [data, setData] = useState();
    useEffect(() => {
       console.log("howdy", array1);
    //    test()
    }, [])

    const data = [
        {
            key: "Food",
            value: 90,
            svg: { fill: '#600080' },
            // arc: { outerRadius: '130%', cornerRadius: 10, }
            
        },
        {
            key: "B",
            value: 50,
            svg: { fill: '#9900cc' }
        },
        {
            key: "C",
            value: 40,
            svg: { fill: '#c61aff' }
        },
        {
            key: "D",
            value: 95,
            svg: { fill: '#d966ff' }
        },
        {
            key: "E",
            value: 35,
            svg: { fill: '#ecb3ff' }
        }
    ]

    return (
        <PieChart
            style={{ height: 200 }}
            outerRadius={'70%'}
            innerRadius={10}
            data={array1}
        />
    )


}

export default PieChartWithDifferentArcs