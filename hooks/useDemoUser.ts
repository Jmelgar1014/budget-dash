import { useUser } from "@clerk/nextjs";

export const useDemoUser = () => {
  const { user } = useUser();

  const isDemoUser =
    user?.primaryEmailAddress?.emailAddress ===
    process.env.NEXT_PUBLIC_DEMO_USER;

  return { isDemoUser };
};
