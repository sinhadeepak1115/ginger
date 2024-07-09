import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createUser, getUserById } from "../neo4j.action";

export default async function CallBack() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=https://localhost:3000/callback",
    );
  }
  const user = await getUser();

  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback",
    );
  }
  //TODO:check if user is already ther in neo4j

  const dbUser = await getUserById(user.id);

  //TODO:if not create the user db
  if (!dbUser) {
    await createUser({
      applicationId: user.id,
      email: user.email!,
      firstname: user.given_name!,
      lastname: user.family_name ?? undefined,
    });
  }
}
