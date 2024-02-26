# Stytch Multitenancy Auth Demo

To run this application locally, you need to have the following:

-   A [Stytch account](https://stytch.com/start-now)
-   A [Google account](https://myaccount.google.com/)
-   [Node.js and npm](https://nodejs.org/en/download) installed on your local machine
-   A code editor and a web browser.
-   Familiarity with [multi-tenancy in Stytch's data model](https://stytch.com/docs/b2b/guides/multi-tenancy) and [discovery and organization login flows](https://stytch.com/docs/b2b/guides/organizations/login-flows)

Once you have met all the prerequisites, follow the steps below.

1. Open the [Stytch dashboard](https://stytch.com/dashboard) and create a new project. Make sure you select "B2B SAAS AUTHENTICATION" as the type of authentication:

    ![Creating a Stytch project](https://i.imgur.com/le0gTWO.png)

2. Once the project is created, select **API keys** from the sidebar and take note of the test environment's **Project ID**, **Secret**, and **Public token**:

    ![Obtaining API keys](https://i.imgur.com/yBTQKyH.png)

3. Clone this repository and open it in a code editor.

    ```bash
    git clone https://github.com/kimanikevin254/stytch-multitenancy-auth-demo.git
    ```

    If you're using VS Code as the code editor.

    ```bash
    code stytch-multitenancy-auth-demo
    ```

4. Open the `.env.local` file and replace the placeholders with the credentials you obtained in the step 2.

5. On your Stytch dashboard, select **Redirect URLs** on the sidebar and click the **Create new redirect URL** button on the resulting page. In the **Create redirect URL** modal, provide `http://localhost:3000/api/callback` as the URL, select all the types, toggle the **Set as default** checkbox, and click **Ok**:

    ![Creating a new redirect URL](https://i.imgur.com/0CVZylI.png)

6. To allow users to sign in via Google, select **OAuth** from the sidebar and click the **Configure** button on the Google provider:

    ![Configuring Google provider](https://i.imgur.com/W6WyVyJ.png)

    On the resulting page, select **Visit guide** and complete all the steps listed:

    ![Visit guide](https://i.imgur.com/G9oa4rW.png)

7. To run the development server, execute the command `npm run dev` in your terminal and navigate to `http://localhost:3000/login` in your web browser. You should see the sign-in page:

    ![Sign in page](https://i.imgur.com/IW8CXuX.png)

8. Log in using a magic link or Google and navigate to the discovery dashboard:

    ![Discovery dashboard](https://i.imgur.com/24mfGZE.png)

9. Currently, you don't have any existing organization. Create one by filling out the organization name and selecting any of the settings. Once the organization is created, you'll be redirected to its dashboard:

    ![Organization dashboard](https://i.imgur.com/I3eJLA7.png)

    Take note of the organization slug and log out of the dashboard.

10. Navigate to `http://localhost:3000/<your-organization-slug>/login`. Replace the placeholder value with the correct organization slug. The organization name should be displayed along with the log in options.

    Log in using any method and you should be able to access the dashboard:

    ![Org-specific login](https://i.imgur.com/a0KW8MO.png)
