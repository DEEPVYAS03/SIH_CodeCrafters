import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { BarChart } from "react-native-gifted-charts";

import { PieChart } from "react-native-gifted-charts";
import tw from 'twrnc'



const Box1 = () => {
    const pieData = [
        { value: 54, color: '#177AD5' },
        { value: 40, color: '#79D2DE' },
        { value: 20, color: '#ED6665' },
    ];

    return (
        <PieChart
            data={pieData}
            showText
            textColor="black"
            radius={75}
            textSize={12}
            focusOnPress
            showValuesAsLabels
            showTextBackground
            textBackgroundRadius={14}
        />
    );
};

const Box2 = () => {

    const pieData = [
        {
            value: 47,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
    ];
    return (

        <View style={{ padding: 5, alignItems: 'center' }}>
            <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={75}
                innerRadius={55}
                innerCircleColor={'#232B5D'}
                centerLabelComponent={() => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                                style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>
                                47%
                            </Text>
                            <Text style={{ fontSize: 12, color: 'white' }}>Excellent</Text>
                        </View>
                    );
                }}
            />
        </View>
    )

}


const ProgressRing=()=>{
    return(
        <View >
        <Text style={tw`ml-8 text-white`}>Progress Chart</Text>

        <ProgressChart
        data={[0.7]}
        width={190}  
        height={100}
        yAxisLabel={'Rs'}

        chartConfig={{
            backgroundGradientFrom:'#2E335A',
            backgroundGradientTo:'#2E335A',
            decimalPlaces:1,
            color:(opacity=1)=>`rgba(255,255,255,${opacity})`,
        }}
        bezier
        style={{
            borderRadius:16,
        }}
        
        />
        </View>
    )
}


const MyBezierLineChart = () => {
    return (
        <View>

            <Text>Bezier Line Chart</Text>
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr"],
                    datasets: [{
                        data: [20, 45, 28, 80],
                    },],
                }}
                width={Dimensions.get("window").width - 16}
                // width={width}
                height={220}
                yAxisLabel={'Rs'}

                chartConfig={{
                    backgroundGradientFrom: 'white',
                    backgroundGradientTo: 'white',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0,0,128,${opacity})`,
                }}
                bezier
                style={{
                    borderRadius: 16,
                }}

            />
        </View>
    )
}

const MyBarGraph = () => {
    const barData = [
        { value: 250, label: 'M' },
        { value: 500, label: 'T', frontColor: '#177AD5' },
        { value: 745, label: 'W', frontColor: '#177AD5' },
        { value: 320, label: 'T' },
        { value: 600, label: 'F', frontColor: '#177AD5' },
        { value: 256, label: 'S' },
        { value: 300, label: 'S' },
    ];
    return (
        <View >
            <BarChart
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="lightgray"
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10
    }
})

export { MyBezierLineChart, MyBarGraph, Box1, Box2 , ProgressRing }