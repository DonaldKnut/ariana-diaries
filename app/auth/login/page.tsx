// LoginPage.tsx
import LoginForm from "../_components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../app/(auth)/api/auth/[...nextauth]/route";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/create");
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
