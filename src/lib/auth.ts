import axios from "axios";
import { type User } from "next-auth";

interface JWTResponse {
  refresh: string;
  access: string;
}

export async function createJWT(
  email: string,
  password: string
): Promise<JWTResponse> {
  const url = "http://127.0.0.1:8000/auth/jwt/create";
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post<JWTResponse>(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error: `, error);
    throw error;
  }
}

// TODO: Should probably modify the JWT serialiser to return the JWT, refresh token and the user details
export async function getUser(jwtResponse: JWTResponse) {
  const url = "http://127.0.0.1:8000/api/users/me/";

  const config = {
    headers: { Authorization: `Bearer ${jwtResponse.access}` },
  };

  try {
    const response = await axios.get<User>(url, config);
    const user = response.data;

    user.accessToken = jwtResponse.access;
    user.refreshToken = jwtResponse.refresh;

    return user;
  } catch (error) {
    console.error(`Error: `, error);
    throw error; // Propagate the error so it can be caught by the caller.
  }
}
