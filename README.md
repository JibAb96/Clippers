# Clippers

![GitHub contributors](https://img.shields.io/github/contributors/your-username/clippers-frontend)
![GitHub last commit](https://img.shields.io/github/last-commit/your-username/clippers-frontend)
![GitHub language count](https://img.shields.io/github/languages/count/your-username/clippers-frontend)

[Here is a link to the final project](https://your-live-site-link.com/)

Clippers is a platform that connects content creators with "clippers"—social media accounts with a following—to distribute short-form content (clips). Content creators can submit their clips for distribution, and clippers can offer their services to post these clips on their social media accounts, reaching a broader audience.

The platform facilitates seamless interaction between creators and clippers, ensuring a smooth process for negotiating, reviewing, and approving clip submissions. It also ensures that all payments between creators and clippers are secure and efficient, streamlining the financial transactions for both parties.

The platform aims to provide an easy-to-use interface where content creators can browse and contact clippers, while clippers can manage their profile, track submissions, and maintain a high level of interaction with the creators. The creators' experience is centered around maximizing their reach and visibility, while clippers benefit by providing services to a broad range of creators.

---

## Icon key

&#128272; <-- Admin only access

&#128100; <-- Logged In Only

&#128683; <-- Logged Out only

&#9989; <-- Yes / Visible

&#10060; <-- No / Not visible

[Back to the top](#clippers)

---

## Key Features

1. **Creator Dashboard:** Manage profile, interact with clippers, and submit clips for distribution.
2. **Clipper Profile:** Displays key details about clippers, such as niche, platform, follower count, and price per post.
3. **Clipper Search & Filtering:** Search page where creators can filter through available clippers based on categories, niches, or keywords.
4. **Clip Submission:** Streamlined process for creators to submit their clips directly to clippers for posting.
5. **Payment System:** Secure payment integration for creators to pay clippers for distribution services.
6. **Reviews & Ratings:** Feedback system for both creators and clippers to rate and review each other, building trust in the platform.
7. **Security Features:** Protection of both creators' and clippers' sensitive information, ensuring a safe transaction environment.

[Back to the top](#clippers)

---

## User Flows

### Content Creator User Flows

1. **Sign-Up and Profile Setup**

   - Sign up
   - Fill in profile details (name, niche, portfolio links, etc.)
   - Verify email to activate account

2. **Search for Clippers**

   - Navigate to the "Search Clippers" page
   - Use filters (e.g., niche, platform, follower count)
   - View clipper profiles and select a suitable clipper

3. **Submit a Clip to Clipper**

   - Navigate to selected clipper's profile
   - Click "Submit Clip" button
   - Upload clip and provide description (e.g., caption ideas, hashtags)
   - Confirm submission
   - Receive notification when clipper reviews or accepts the submission

4. **Track Clip Progress**

   - Access "My Submissions" on Creator Dashboard
   - View the status of submitted clips (e.g., "Awaiting Review," "Accepted," "Posted")
   - Receive notification when clip is posted

5. **Leave a Review**
   - After clip is posted, navigate to the submission record
   - Leave a review for the clipper based on service quality

---

### Clipper User Flows

1. **Sign-Up and Profile Setup**

   - Sign up
   - Fill in profile details (niche, platforms, follower count, price per post)
   - Wait for registration to be reviewed by admin
   - Verify email to activate account

2. **Receive and Review Submissions**

   - Navigate to "New Submissions" on Dashboard
   - Review clip details and creator's notes
   - Accept or reject the submission
     - If rejected: Provide feedback
     - If accepted: Proceed to schedule/post the clip

3. **Post the Clip**

   - Once clip is accepted, schedule it for posting
   - Post the clip on the selected social media platform
   - Mark the task as "Posted" on Dashboard

4. **Respond to Reviews**
   - View reviews from creators on the dashboard
   - Respond to feedback (optional)

---

### Platform Admin User Flows

1. **Monitor User Activity**

   - Track sign-ups for creators and clippers
   - Review flagged submissions or disputes between users

2. **Verify Clippers**
   - Review clipper profile details (e.g., follower count, niche)
   - Approve or reject clipper accounts

---

### General Platform Flows

1. **Search and Filter Clippers**

   - Use the search bar to find clippers by keyword
   - Apply filters for niche, follower count, platform, etc.
   - View results and navigate to clipper profiles

2. **Notifications**

   - Trigger notifications for key events:
     - Creator: When a clip is reviewed, accepted, or posted
     - Clipper: When a new clip is submitted or when feedback is left
   - Display notifications on respective dashboards

3. **Account Settings**
   - Allow users to update email, password, and profile details
   - Enable account deactivation or deletion

[Kanban Board](https://www.notion.so/Kanban-Board-15ca0cefe3ac80c198fffc4e6f20a497?pvs=21)

[Notion Project Link](https://www.notion.so/163a0cefe3ac80dbba72d0798c2cb47f?pvs=21)

[Back to the top](#clippers)

---

## Technologies Used

### Tech Stack

This project uses the **PERN (PostgreSQL(Supabase), Express.js, React, Node.js)** stack:

- **PostgreSQL (Supabase):** A powerful relational database system to store user data, clip submissions, transactions, and reviews.
- **Nest.js:** A lightweight and flexible Node.js framework for building the back-end API that will handle HTTP requests and server-side logic.
- **Next.js:** A React framework for building the user interface of the platform, ensuring a dynamic and responsive experience for creators and clippers.
- **React:** For building interactive user interfaces.

Other tools and libraries:

- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Zod](https://zod.dev/) for schema validation
- [Font Awesome](https://fontawesome.com/) and [Google Fonts](https://fonts.google.com/) for UI
- [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [PostCSS](https://postcss.org/) for tooling
- [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) for hosting

[Back to the top](#clippers)

---

## Features (Summary)

- Responsive, modern UI for creators and clippers
- Secure authentication and profile management
- Search and filtering for clippers
- Clip submission and review workflow
- Secure payment integration
- Ratings and reviews
- Admin dashboard for user and content moderation
- Notification system
- Account management and security features

[Back to the top](#clippers)

---

## Deployment

<details id="prerequisites">
<summary style="font-size: 1.2em; font-weight: bold;">Prerequisites</summary>

- Node.js and npm installed
- Clone the repository: `git clone https://github.com/your-username/clippers-frontend.git`
- Install dependencies: `npm install`
- Set up environment variables (see `.env.example`)

</details>

<details id="vercel-deployment">
<summary style="font-size: 1.2em; font-weight: bold;">Vercel/Netlify Deployment</summary>

- Connect your GitHub repository to Vercel or Netlify
- Set environment variables in the dashboard
- Deploy the main branch
- For custom domains, follow the host's instructions

</details>

<details id="local-deployment">
<summary style="font-size: 1.2em; font-weight: bold;">Local Deployment</summary>

- Clone the repo and install dependencies as above
- Create a `.env.local` file with your environment variables
- Run `npm run dev` to start the development server
- Visit `http://localhost:3000`

</details>

[Back to the top](#clippers)

---

## Testing

- Manual and automated testing performed on Chrome, Firefox, Edge, and mobile browsers
- Unit and integration tests for components and state management (see `/src`)
- Accessibility tested with Lighthouse and axe
- [Click here to view the full testing steps](/TESTING.md)

### Solved Bugs

- All bugs and their solutions are tracked in the [GitHub Project Board](https://github.com/users/your-username/projects/1)

### Known Bugs

- If you discover any bugs, please open an issue on GitHub.

[Back to the top](#clippers)

---

## Credits

### Code

- Inspired by modern SaaS platforms and open-source Next.js projects
- [Next.js documentation](https://nextjs.org/docs)
- [Redux Toolkit documentation](https://redux-toolkit.js.org/introduction/getting-started)
- [Supabase documentation](https://supabase.com/docs)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)

### Content

- Icons from [Font Awesome](https://fontawesome.com/)
- Images from [Unsplash](https://unsplash.com/) and [Pexels](https://pexels.com/)
- Text content generated and refined with ChatGPT

### Acknowledgments

- Thanks to the open-source community for tools and inspiration
- Special thanks to mentors, contributors, and early testers

[Back to the top](#clippers)
