import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      Dashboard
      {session && <div>{session.user.name}</div>}
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
}
