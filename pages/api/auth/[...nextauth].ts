import { User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(
        credentials) {
        //we need to connect mongodb
        //Then get emails and check validation with credentials
        const { email, password, id } = credentials;
        console.log("cred",credentials.id, typeof id);
        

        if (email && password) {
          //Check authentication
          //return success Responsewith cookie
          console.log("redirect to home page");
          
          return {
            email,
            password,
            id
          };

          //setErrorMessage("Password is Incorrect")
          //throw new Error("Password Is Not Correct");
        } else {
          return null;
        }
      },
      credentials: undefined
    }),
  ],
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },
});
