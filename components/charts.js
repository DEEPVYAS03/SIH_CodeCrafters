import {View,Text, SafeAreaView,StyleSheet,Dimensions} from 'react-native';
import {LineChart,ProgressChart} from 'react-native-chart-kit';
import { BarChart } from "react-native-gifted-charts";


const MyBezierLineChart=()=>{
    return(
        <View>
        
        <Text>Bezier Line Chart</Text>
        <LineChart 
        data={{
            labels:["Jan","Feb","Mar","Apr"],
            datasets:[{
                data:[20,45,28,80],
            },],
        }}
        width={Dimensions.get("window").width-16}  
        // width={width}
        height={220}
        yAxisLabel={'Rs'}

        chartConfig={{
            backgroundGradientFrom:'lightgray',
            backgroundGradientTo:'white',
            decimalPlaces:1,
            color:(opacity=1)=>`rgba(0,0,0,${opacity})`,
        }}
        bezier
        style={{
            borderRadius:16,
        }}
        
        />
        </View>
    )
}

const MyBarGraph=()=>{
    const barData = [
        {value: 250, label: 'M'},
        {value: 500, label: 'T', frontColor: '#177AD5'},
        {value: 745, label: 'W', frontColor: '#177AD5'},
        {value: 320, label: 'T'},
        {value: 600, label: 'F', frontColor: '#177AD5'},
        {value: 256, label: 'S'},
        {value: 300, label: 'S'},
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



const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        padding:10
    }
})

export {MyBezierLineChart,MyBarGraph}