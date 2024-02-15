import * as stytch from "stytch";
import undici from "undici";

const loadStytch = () => {
    const dispatcher = new undici.Agent({
   	 keepAliveTimeout: 6e6, // 10 minutes in MS
   	 keepAliveMaxTimeout: 6e6, // 10 minutes in MS
   	 autoSelectFamily: true, // Avoid UND_ERR_CONNECT_TIMEOUT error
    });

    // Create a new client instance
    let client = new stytch.B2BClient({
   	 project_id: process.env.STYTCH_PROJECT_ID,
   	 secret: process.env.STYTCH_SECRET,
   	 env: stytch.envs.test,
   	 dispatcher,
    });

    return client;
};

export default loadStytch;
