import SignIn from "@/components/features/auth/SignIn";
import Profile from "@/components/features/auth/Profile";
import SignOut from "@/components/features/auth/SignOut";


export function Container() {
  return (
    <div className="w-full p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col gap-4">
        <Profile />
        <div className="flex flex-row gap-4">
          <SignIn />
          <SignOut />
        </div>
      </div>
      
    </div>
  );
}
