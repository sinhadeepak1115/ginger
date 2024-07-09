import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserWithNoConnection } from "./neo4j.action";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback",
    );
  }
  const user = await getUser();

  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback",
    );
  }
  const usersWithNoConnection = await getUserWithNoConnection(user.id);

  return (
    <main>
      hi {user.given_name}
      <pre>
        <code>{JSON.stringify(usersWithNoConnection, null, 32)}</code>
      </pre>
    </main>
  );
}
