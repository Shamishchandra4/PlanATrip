import React, { useState } from 'react';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils"; // Ensure this utility function is defined
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { apiClient } from '@/lib/api-client';
const frameworks = [
    { value: "adventure", label: "Adventure" },
    { value: "relaxation", label: "Relaxation" },
    { value: "cultural", label: "Cultural" },
    { value: "wildlife", label: "Wildlife" },
    { value: "nature", label: "Nature" },
    { value: "historical", label: "Historical" },
    { value: "beach", label: "Beach" },
    { value: "cruise", label: "Cruise" },
    { value: "luxury", label: "Luxury" },
    { value: "spiritual", label: "Spiritual" }
];
const travelFrequencies = [
    { value: "frequent", label: "Frequent Traveler" },
    { value: "occasional", label: "Occasional Traveler" },
    { value: "rare", label: "Rare Traveler" },
    { value: "weekend", label: "Weekend Getaway" },
    { value: "once_a_year", label: "Once a Year Traveler" }
];


import { toast, Toaster } from "sonner";
import { SET_PROFILE } from '@/utils/constants';
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        hometown: '',
        currentLocation: '',
        profilePicture: null,
    });
    const [travelTypeOpen, setTravelTypeOpen] = useState(false);
    const [favoriteTravelType, setFavoriteTravelType] = useState("");

    const [frequencyOpen, setFrequencyOpen] = useState(false);
    const [travelFrequency, setTravelFrequency] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            profilePicture: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.fullName);
        formDataToSend.append('username', formData.username);
        formDataToSend.append('hometown', formData.hometown);
        formDataToSend.append('currentTown', formData.currentLocation);
    
        if (favoriteTravelType) {
            formDataToSend.append('nature', favoriteTravelType);
        }
    
        if (travelFrequency) {
            formDataToSend.append('frequency', travelFrequency);
        }
    
        console.log('Form Data Contents:');
        for (let pair of formDataToSend.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    
        try {
            const response = await apiClient.post(SET_PROFILE, formDataToSend, {
                withCredentials: true,
                headers: {
                }
            });
            console.log(response)
            if (response.status === 200) {
                toast.success("Profile setup successful!");
                navigate("/auth");
            }
            if (response.status != 200) {
                toast.success("Profile setup unsuccessful!");
                navigate("/profile");
            }
    
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("Profile setup error!");
        }
    };
    
    


    return (
        <div className="bg-gray-950 poppins-semibold h-screen text-white container mx-auto p-6">
            <h2 className="text-2xl poppins-medium font-bold mb-4">Profile Information</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white placeholder-gray-400"
                        placeholder="Name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white placeholder-gray-400"
                        placeholder="abc@123"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Hometown</label>
                    <input
                        type="text"
                        name="hometown"
                        value={formData.hometown}
                        onChange={handleChange}
                        className="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white placeholder-gray-400"
                        placeholder="Your Hometown"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Current Location</label>
                    <input
                        type="text"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        className="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white placeholder-gray-400"
                        placeholder="Current City"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Profile Picture</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white"
                    />
                </div>

                <div className='flex flex-col gap-5'>
                <Popover open={travelTypeOpen} onOpenChange={setTravelTypeOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={travelTypeOpen}
                            className="w-[200px] justify-between bg-black "
                        >
                            {favoriteTravelType
                                ? frameworks.find((framework) => framework.value === favoriteTravelType)?.label
                                : "Select framework..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] bg-black p-0">
                        <Command>
                            <CommandInput placeholder="Search Tarvel Type..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No type found.</CommandEmpty>
                                <CommandGroup>
                                    {frameworks.map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setFavoriteTravelType(currentValue === favoriteTravelType ? "" : currentValue);
                                                setTravelTypeOpen(false);
                                            }}
                                        >
                                            {framework.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    favoriteTravelType === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <Popover open={frequencyOpen} onOpenChange={setFrequencyOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={frequencyOpen}
                            className="w-[200px] justify-between bg-black"
                        >
                            {travelFrequency
                                ? travelFrequencies.find((frequencie) => frequencie.value === travelFrequency)?.label
                                : "Select Travel Frequency..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] bg-black p-0">
                        <Command>
                            <CommandInput placeholder="Select Travel Frequency..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No frequency found.</CommandEmpty>
                                <CommandGroup>
                                    {travelFrequencies.map((frequencie) => (
                                        <CommandItem
                                            key={frequencie.value}
                                            value={frequencie.value}
                                            onSelect={(currentValue) => {
                                                setTravelFrequency(currentValue === travelFrequency ? "" : currentValue);
                                                setFrequencyOpen(false);
                                            }}
                                        >
                                            {frequencie.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    travelFrequency === frequencie.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>


        
                
                </div>
                <button  className="bg-blue-600 mt-4 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition ease-in-out duration-300">
                    Save Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
