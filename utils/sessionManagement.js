import { cookies } from "next/headers";
import loadStytch from "./loadStytch";

const SESSION_DURATION_MINUTES = 60;
const INTERMEDIATE_SESSION_DURATION_MINUTES = 10;

const SESSION_COOKIE = "session";
const INTERMEDIATE_SESSION_COOKIE = "intermediate_session";

export function getSession() {
	return cookies().get("session");
}

export function setSession(sessionJWT) {
    cookies().set(SESSION_COOKIE, sessionJWT, {
   	 httpOnly: true,
   	 maxAge: 60 * SESSION_DURATION_MINUTES,
    });
}

export function clearSession() {
    cookies().set(SESSION_COOKIE, "", {
   	 maxAge: 0,
   	 httpOnly: true,
    });
}

export function getIntermediateSession() {
	return cookies().get("intermediate_session");
}

export function setIntermediateSession(intermediateSessionToken) {
    cookies().set(INTERMEDIATE_SESSION_COOKIE, intermediateSessionToken, {
   	 maxAge: 60 * INTERMEDIATE_SESSION_DURATION_MINUTES,
   	 httpOnly: true,
    });
}

export function clearIntermediateSession() {
    cookies().set(INTERMEDIATE_SESSION_COOKIE, "", {
   	 maxAge: 0,
   	 httpOnly: true,
    });
}

export function getDiscoverySessionData() {
    const sessionJWT = cookies().get("session");

    if (sessionJWT) {
   	 return {
   		 sessionJWT,
   		 intermediateSession: undefined,
   		 isDiscovery: false,
   		 error: false,
   	 };
    }

    const intermediateSession = cookies().get("intermediate_session");
    if (intermediateSession) {
   	 return {
   		 sessionJWT: undefined,
   		 intermediateSession,
   		 isDiscovery: true,
   		 error: false,
   	 };
    }
    return { error: true };
}

export function getOrganization() {
	return cookies().get("organization_id");
}

export function setOrganization(organizationId) {
	cookies().set("organization_id", organizationId, {
		httpOnly: true,
		maxAge: 60 * 60,
	});
}

export function revokeSession(sessionJWT) {
    const stytchClient = loadStytch();

    // Delete session cookie
    cookies().set(SESSION_COOKIE, "", {
   	 maxAge: 0,
    });

    // Call Stytch in the background to terminate the session
    // But don't block on it!
    stytchClient.sessions
   	 .revoke({ session_jwt: sessionJWT })
   	 .then(() => {
   		 console.log("Session successfully revoked");
   	 })
   	 .catch((err) => {
   		 console.error("Could not revoke session", err);
   	 });
}
