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
import { toast, Toaster } from "sonner";
import { SET_PROFILE } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';

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

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        hometown: '',
        currentLocation: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Construct the JSON payload based on the formData
        const payload = {
            name: formData.fullName,
            username: formData.username,
            homeTown: formData.hometown,
            currentTown: formData.currentLocation,
            nature: favoriteTravelType || undefined, // only include if value is selected
            frequency: travelFrequency || undefined // only include if value is selected
        };

        try {
            const response = await apiClient.post(SET_PROFILE, payload);
            if (response.status === 200) {
                toast.success("Profile setup successful!");
                navigate("/auth");
            } else {
                toast.error("Profile setup unsuccessful!");
                navigate("/profile");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("Profile setup error!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-2xl border border-gray-300">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Profile Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-800">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-800">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500"
                            placeholder="abc@123"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-800">Hometown</label>
                        <input
                            type="text"
                            name="hometown"
                            value={formData.hometown}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500"
                            placeholder="Your Hometown"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-800">Current Location</label>
                        <input
                            type="text"
                            name="currentLocation"
                            value={formData.currentLocation}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500"
                            placeholder="Current City"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-800">Favorite Travel Type</label>
                        <Popover open={travelTypeOpen} onOpenChange={setTravelTypeOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={travelTypeOpen}
                                    className="w-full justify-between border border-gray-300 bg-white text-gray-800 hover:border-gray-600 focus:ring-2 focus:ring-gray-500"
                                >
                                    {favoriteTravelType
                                        ? frameworks.find((fw) => fw.value === favoriteTravelType)?.label
                                        : "Select Travel Type"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full bg-white shadow-lg rounded-md">
                                <Command>
                                    <CommandInput placeholder="Search Travel Type..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No travel type found.</CommandEmpty>
                                        <CommandGroup>
                                            {frameworks.map((fw) => (
                                                <CommandItem
                                                    key={fw.value}
                                                    value={fw.value}
                                                    onSelect={(value) => {
                                                        setFavoriteTravelType(value === favoriteTravelType ? "" : value);
                                                        setTravelTypeOpen(false);
                                                    }}
                                                >
                                                    {fw.label}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            favoriteTravelType === fw.value ? "opacity-100" : "opacity-0"
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

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-800">Travel Frequency</label>
                        <Popover open={frequencyOpen} onOpenChange={setFrequencyOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={frequencyOpen}
                                    className="w-full justify-between border border-gray-300 bg-white text-gray-800 hover:border-gray-600 focus:ring-2 focus:ring-gray-500"
                                >
                                    {travelFrequency
                                        ? travelFrequencies.find((tf) => tf.value === travelFrequency)?.label
                                        : "Select Travel Frequency"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full bg-white shadow-lg rounded-md">
                                <Command>
                                    <CommandInput placeholder="Search Travel Frequency..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No travel frequency found.</CommandEmpty>
                                        <CommandGroup>
                                            {travelFrequencies.map((tf) => (
                                                <CommandItem
                                                    key={tf.value}
                                                    value={tf.value}
                                                    onSelect={(value) => {
                                                        setTravelFrequency(value === travelFrequency ? "" : value);
                                                        setFrequencyOpen(false);
                                                    }}
                                                >
                                                    {tf.label}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            travelFrequency === tf.value ? "opacity-100" : "opacity-0"
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

                    <button
                        type="submit"
                        className="w-full py-3 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
                    >
                        Set Up Profile
                    </button>
                </form>
                <Toaster position="top-center" />
            </div>
        </div>
    );
};

export default Profile;
