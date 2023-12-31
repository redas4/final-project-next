import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./utils/authOptions";


export default async function Home() {
  const session = await getServerSession(authOptions);
  if(session){
    redirect('user-home');
  }
  return (
    <main>
      <LoginForm />
    </main>
  );
}