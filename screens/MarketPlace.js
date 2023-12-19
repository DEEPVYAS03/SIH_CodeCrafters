import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import NotificationModal from '../components/NotificationModal';
import Message from '../components/Message';
import { ScrollView } from 'react-native';
import { COLORS } from '../constants/index'
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native";
import NotifyCard from "../components/NotifyCard";
import {
    BottomSheetModalProvider,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {Image} from 'react-native'
import { usePhone } from '../context/allContext';



const filters = [
    { id: 1, name: "All", icon: "list" },
    { id: 2, name: "Business", icon: "briefcase" },
    { id: 3, name: "Personal", icon: "user" },
    { id: 4, name: "Home", icon: "home" },
    { id: 5, name: "Loan against Property", icon: "money" },
    { id: 6, name: "Auto", icon: "car" },
];



const MarketPlace = () => {

    const bottomSheetModalRef = useRef(null);
    const {fname} = usePhone()
    const navigation = useNavigation();
    const [iconClicked, setIconClicked] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filters[0].name);
    const [selectedCardData, setSelectedCardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isdata, setisdata] = useState(false);
    const [data, setData] = useState([])
    const [displayInAppOffers, setDisplayInAppOffers] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelect = (item) => {
        setSelectedCardData(item); // Set the selected card data
        bottomSheetModalRef.current?.present();
    };

    const toggleDisplayInAppOffers = () => {
        setDisplayInAppOffers(!displayInAppOffers);
    };

    const handleIconClick = () => {
        setIconClicked(true);
    };

    const handleModalClose = () => {
        setIconClicked(false);
    };

    const handleSheetChanges = (index) => {
        // console.log("handleSheetChanges", index);
        setIsModalOpen(index >= 0); // Check if sheet is open
      };

    const handleFilterSelection = (filterName) => {
        setSelectedFilter(filterName);
    };

    const getFormmatedDate = (validity_period) => {
        const dateObj = new Date(validity_period);

        // Use the Date methods to get the month, date, and year
        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const month = monthNames[dateObj.getMonth()]; // getMonth() returns a zero-based index
        const date = dateObj.getDate();
        const year = dateObj.getFullYear();

        // Concatenate the month, date, and year
        return month + " " + date + ", " + year;
    };

    useEffect(() => {
        setIsLoading(true);

        // Replace the API call with dummy data
        const dummyData = [
            {
                Id: 1,
                Name: "Dummy Bank",
                Offer_Title: "Dummy Offer",
                Validity_Period: getFormmatedDate(new Date()), // Use the current date as dummy validity period
                Offer_Details: "This is a dummy offer for testing purposes.",
                Link_to_Offer: "https://example.com",
                Type_of_Loan: "Business",
                Display_in_App: true,
                Display_Order: 1,
                Bank_Logo_URL: "https://dummylogo.com",
            },
            {
                Id: 2,
                Name: "Dummy Bank",
                Offer_Title: "Dummy Offer",
                Validity_Period: getFormmatedDate(new Date()), // Use the current date as dummy validity period
                Offer_Details: "This is a dummy offer for testing purposes.",
                Link_to_Offer: "https://example.com",
                Type_of_Loan: "Personal",
                Display_in_App: true,
                Display_Order: 1,
                Bank_Logo_URL: "https://dummylogo.com",
            },
            // Add more dummy data as needed
        ];

        const extractedData = dummyData.map((item) => ({
            Id: item.Id,
            Name: item.Name,
            Offer_Title: item.Offer_Title,
            Validity_Period: item.Validity_Period,
            Offer_Details: item.Offer_Details,
            Link_to_Offer: item.Link_to_Offer,
            Type_of_Loan: item.Type_of_Loan,
            Display_in_App: item.Display_in_App,
            Display_Order: item.Display_Order,
            Bank_Logo_URL: item.Bank_Logo_URL,
        }));

        // Filter offers based on 'Display_in_App' field
        const filteredData = displayInAppOffers
            ? extractedData.filter((item) => item.Display_in_App === true)
            : extractedData;

        setData(filteredData);
        setIsLoading(false);

        if (filteredData.length === 0) {
            setisdata(false);
        } else {
            setisdata(true);
        }
    }, []);

    return (
        <View >
            <View style={tw`flex mt-7 flex-row mt-10 h-18`}>
                <View style={tw`flex-1 flex-row `}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons
                            style={tw`mt-2 ml-2 mr-2`}
                            name="menu"
                            size={35}
                            color="black"
                        />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require("../assets/user-profile.jpg")}
              style={tw`w-15 h-15 rounded-full ml-1`}
            />
          </TouchableOpacity> */}
                    <View style={tw`ml-3 mt-2`}>
                        <Text style={tw`font-bold`}>Hi {fname}</Text>
                        <Text>Aug 12,2021</Text>
                    </View>
                </View>
                <View style={tw`mt-2 mr-3`}>
                    <TouchableOpacity onPress={handleIconClick}>
                        <Ionicons name="notifications" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <NotificationModal
                    isVisible={iconClicked}
                    message=<Message />
                    onClose={handleModalClose}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                    style={tw`flex-row h-20 items-center justify-between  pl-2 pb-2`}
                >
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter.id}
                            onPress={() => handleFilterSelection(filter.name)}
                            style={[
                                tw`px-4 py-2 flex-row mr-2 border border-[${COLORS.darkBlue}] rounded-full`,
                                selectedFilter === filter.name
                                    ? tw`bg-blue-500 text-white`
                                    : tw`bg-white`,
                            ]}
                        >
                            <Icon
                                name={filter.icon}
                                size={20}
                                color={
                                    selectedFilter === filter.name
                                        ? COLORS.white
                                        : COLORS.darkBlue
                                }
                            />
                            <Text
                                style={[
                                    tw`pl-2`,
                                    selectedFilter === filter.name
                                        ? tw` text-white`
                                        : tw`text-[${COLORS.darkBlue}]`,
                                ]}
                            >
                                {filter.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>


            {/* cards */}


            {
                isLoading ? (
                    <View style={tw`flex-1 mt-10 justify-center items-center`}>
                        <ActivityIndicator size="large" color={COLORS.blue} />
                    </View>
                ) : (
                    <ScrollView
                        style={tw`pb-20 bg-zinc-100 px-4`}
                        showsVerticalScrollIndicator={false}
                    >
                        {data
                            .filter(
                                (item) =>
                                    item.Type_of_Loan === selectedFilter ||
                                    selectedFilter === "All"
                            )
                            .map((item) => (
                                <TouchableOpacity
                                    key={item.Id}
                                    onPress={() => handleSelect(item)} // Open modal when a card is clicked
                                >
                                    <NotifyCard
                                        logo={item.Bank_Logo_URL}
                                        bank={item.Name}
                                        title={item.Offer_Title}
                                        validity_period={item.Validity_Period}
                                    />
                                </TouchableOpacity>
                            ))}
                        <View style={tw`h-50`}></View>
                    </ScrollView>
                )}


            {/* cards */}

            {/* Bottom card */}


            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={["70%", "100%"]}
                    onChange={handleSheetChanges}
                >
                    <View style={tw`flex-row p-3 justify-between`}>
                        <View style={tw` flex-row items-center justify-center`}>
                            <Image
                                source={{ uri: selectedCardData?.Bank_Logo_URL }}
                                style={tw`w-16  h-16`}
                                resizeMode="contain"
                            />

                            <Text style={tw`text-lg pl-6 text-gray-500`}>
                                {selectedCardData?.Name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => bottomSheetModalRef.current?.dismiss()}
                            style={tw`justify-center p-3`}
                        >
                            {/* <Icon name="close" size={40} color="black" /> */}
                            <Text style={tw`text-xl `}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`px-4`}>
                        <View style={tw`mb-4`}>
                            {/* <Text style={tw.style`text-black mr-2 font-bold`}>
                  {step.stepNumber}.
                </Text> */}
                            <Text style={tw.style`text-black font-bold text-lg mb-4`}>
                                {selectedCardData?.Offer_Title}
                            </Text>
                            <Text style={tw.style`text-black`}>
                                {selectedCardData?.Offer_Details}
                            </Text>
                        </View>
                        <View style={tw`flex-row mb-4`}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL(selectedCardData?.Link_to_Offer)}
                            >
                                <Text style={tw.style`text-blue-500 border-b border-blue-500`}>
                                    Learn More
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={tw`flex-row pt-3`}>
                            <Icon name="clock-o" size={20} color="#456EFE" />
                            <Text style={tw`pl-2 text-gray-500`}>Valid until</Text>
                            <Text style={tw`pl-2 text-gray-500`}>
                                {selectedCardData?.Validity_Period}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => bottomSheetModalRef.current?.dismiss()}
                        style={tw.style(
                            `bg-blue-500 h-12 m-4 rounded-lg mb-20  justify-center items-center`,
                            {
                                // position: "absolute",
                                // bottom: 0,
                                // left: 0,
                                // right: 0,
                            }
                        )}
                    >
                        <Text style={tw.style(`text-white font-bold text-lg`)}>Got it</Text>
                    </TouchableOpacity>
                </BottomSheetModal>
            </BottomSheetModalProvider>
            {/* Bottom Card */}

        </View>
    );
};

export default MarketPlace;
