import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthFormLayout() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md border shadow-md rounded-md p-4">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">Welcome to LifeEasy</h1>
          <p className="text-zinc-500">Manage your money with ease</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          {/* Tabs Switcher */}
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Content */}
          <TabsContent value="login">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <LoginForm />
            </div>
          </TabsContent>

          {/* Register Content */}
          <TabsContent value="register">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <RegisterForm />
            </div>
          </TabsContent>
        </Tabs>
        
      </div>
    </div>
  )
}
