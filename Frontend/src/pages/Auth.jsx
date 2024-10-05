import Background from "../assets/bg.jpg";
import { useState } from "react";   
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE} from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateSignup = () => {
        if (!email.length) {
            toast.error("Email is required")
            return false
        }
        if (!password.length) {
            toast.error("Password is required")
            return false
        }
        if (password != confirmPassword) {
            toast.error("Password and Confirm Password should be same")
            return false
        }
        return true
    }
    const validatelogin = () => {
        if (!email.length) {
            toast.error("Email is required")
            return false
        }
        if (!password.length) {
            toast.error("Password is required")
            return false
        }
        return true
    }
    const handleLogin = async () => {
        if (validatelogin()) {
            try {
                const response = await apiClient.post(LOGIN_ROUTE, { username:email, password });
                console.log(response);
                toast.success("login successful!");
                
                if(response.status===200){
                    toast.success("Login successful!");
                    localStorage.setItem('username',response.data.username)
                    localStorage.setItem('jwt',response.data.jwt)
                    localStorage.setItem('name',response.data.name)
                    localStorage.setItem('homeTown',response.data.homeTown)
                    localStorage.setItem('currentTown',response.data.currentTown)
                    localStorage.setItem('likes',response.data.likes)
                    localStorage.setItem('nature',response.data.nature)
                    localStorage.setItem('frequency',response.data.frequency)
                    navigate("/dashboard")
                }
                if(response.status!=200){
                    toast.success("Login Unsuccessful!");
                    navigate("/auth")

                }
            } catch (error) {
                console.log("Error during signup:", error);
                toast.error("login failed!");  
            }
        }
    };

    const handleSignup = async () => {
        if (validateSignup()) {
            try {

                const response = await apiClient.post(SIGNUP_ROUTE, { username:email, password });
                console.log(response);

                if(response.status===200){
                    toast.success("Signup successful!");
                    navigate("/profile")
                }
            } catch (error) {
                console.log("Error during signup:", error);
                toast.error("Signup failed!");  
            }
        }
    };


    return (
        <div
            className="h-[100vh] w-[100vw] flex items-center justify-center relative"
            style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            <div className="relative z-10 h-[80vh] bg-white bg-opacity-80 border-2 border-transparent text-opacity-90 shadow-2xl w-[60vw] md:w-[90vw] lg:w-[70vw] rounded-3xl overflow-hidden">

                <div className="h-full w-full flex items-center justify-center">
                    <div className="flex flex-col gap-6 items-center justify-center p-8">
                        <div className="flex flex-col justify-center items-center gap-10">
                            <div className="flex items-center justify-center gap-5">
                                <h1 className="text-4xl md:text-5xl xl:text-6xl poppins-semibold text-center font-extrabold text-gray-800">Welcome To TravelEazy</h1>
                            </div>
                            <div className="font-bold text-xl text-center text-gray-600">
                                Join us today by entering your details! Sign up now and travel with eaze.
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <Tabs className="w-3/4" defaultValue="login">
                                <TabsList className="bg-transparent rounded-none w-full">
                                    <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-b-blue-500 p-3 transition-all text-lg duration-300" value="login">Login</TabsTrigger>
                                    <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-b-blue-500 p-3 transition-all duration-300 text-lg" value="signup">Sign Up</TabsTrigger>
                                </TabsList>
                                <TabsContent className="flex flex-col gap-5 mt-5" value="login">
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        className="rounded-lg p-6 text-lg text-black"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        className="rounded-lg p-6 text-lg text-black"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <Button className="rounded-lg font-bold text-lg p-2" onClick={handleLogin}>Log In</Button>
                                </TabsContent>
                                <TabsContent className="flex flex-col gap-5" value="signup">
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        className="rounded-lg p-6 text-lg text-black"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        className="rounded-lg p-6 text-lg text-black"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Confirm Password"
                                        type="password"
                                        className="rounded-lg p-6 text-lg text-black"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                    <Button className="rounded-lg font-bold text-lg p-2" onClick={handleSignup}>Sign Up</Button>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
