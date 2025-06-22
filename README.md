# Clippers

![GitHub contributors](https://img.shields.io/github/contributors/your-username/clippers-frontend)
![GitHub last commit](https://img.shields.io/github/last-commit/your-username/clippers-frontend)
![GitHub language count](https://img.shields.io/github/languages/count/your-username/clippers-frontend)

[Here is a link to the final project](https://your-live-site-link.com/)

Clippers is a modern platform designed to connect video editors ("clippers") with content creators. The platform streamlines the process of finding, hiring, and collaborating with skilled video editors, making it easy for creators to get high-quality video content and for clippers to showcase their portfolios and find new opportunities.

This site is fully responsive, allowing users to register, manage profiles, submit and review video clips, and interact through a seamless dashboard experience. Built with Next.js, React, TypeScript, and Tailwind CSS, Clippers leverages modern web technologies for performance and scalability.

---

## Icon key

&#128272; <-- Admin only access

&#128100; <-- Logged In Only

&#128683; <-- Logged Out only

&#9989; <-- Yes / Visible

&#10060; <-- No / Not visible

[Back to the top](#clippers)

---

## User Experience

### Initial Discussion

- Clippers was created to address the growing need for streamlined collaboration between video editors and content creators.
- The platform enables creators to easily find, evaluate, and hire clippers, while providing clippers with a space to showcase their work and manage client interactions.
- Both creators and clippers can manage their profiles, portfolios, and submissions through intuitive dashboards.

### User Stories

#### Epics

- The project is divided into epics such as User Management, Clip Submission, Dashboard Experience, and Search/Discovery.
- Each epic is broken down into user stories from the perspectives of both creators and clippers.

#### User Stories

- User stories are tracked as GitHub issues, each with value statements, acceptance criteria, and tasks.
- See all User Stories in the [Github Project Board](https://github.com/users/your-username/projects/1)

### Project Goals

- Create a user-friendly platform for connecting creators and clippers.
- Provide full CRUD functionality for profiles, portfolios, and clip submissions.
- Ensure a responsive, accessible, and visually appealing interface.
- Showcase modern web development skills using Next.js, React, and TypeScript.

[Back to the top](#clippers)

---

## Design

### Color Scheme

- The main colors are deep blue, vibrant teal, and soft gray, reflecting creativity and professionalism.
- Accent colors are used for call-to-action buttons and notifications.
- Colors are chosen for accessibility and visual clarity.

![Color scheme](./docs/images/color-palette.png)

### Typography

- The platform uses Inter and Roboto for clean, modern, and accessible text.
- Font sizes and weights are chosen for readability and hierarchy.
- All text is scalable and meets accessibility guidelines.

![Typography example](./docs/images/typography.png)

### Imagery

- User-uploaded profile images and video thumbnails are featured throughout the app.
- Icons from [Font Awesome](https://fontawesome.com/) and custom SVGs are used for navigation and actions.
- All images are optimized for performance.

### Wireframes

- Initial wireframes were created to outline the user flows for registration, dashboard, and clip submission.
- [Wireframes for desktop and mobile](./docs/wireframes)

[Back to the top](#clippers)

---

## Features

### Home page

- Engaging hero section introducing the platform.
- Overview of how Clippers works for both creators and clippers.
- Testimonials and value propositions.

### Registration & Authentication

- Users can register as a creator or clipper.
- Secure authentication with password reset functionality.
- Profile creation and management.

### Dashboard

- Separate dashboards for creators and clippers.
- Creators: View and manage submitted clips, search for clippers, post new projects.
- Clippers: Manage portfolio, submit clips, track project status.

### Profile Management

- Edit personal information, profile image, and portfolio links.
- Update password and account settings.

### Clip Submission & Review

- Clippers can submit video clips for review.
- Creators can approve, request changes, or reject submissions.
- Status tracking for all submissions.

### Search & Discovery

- Creators can search for clippers by category, skill, or rating.
- Filter and sort results for easy discovery.

### Navigation bar

| Nav Link        | &#128683; | &#128100; | &#128272; |
| --------------- | --------- | --------- | --------- |
| Logo (Homepage) | &#9989;   | &#9989;   | &#9989;   |
| Home            | &#9989;   | &#9989;   | &#9989;   |
| Find Clippers   | &#9989;   | &#9989;   | &#9989;   |
| Dashboard       | &#10060;  | &#9989;   | &#9989;   |
| Profile         | &#10060;  | &#9989;   | &#9989;   |
| Log Out         | &#10060;  | &#9989;   | &#9989;   |
| Log In          | &#9989;   | &#10060;  | &#10060;  |

- Responsive navigation bar adapts to user status and device size.

### Future Features

- Real-time chat between creators and clippers.
- In-app payments and invoicing.
- Advanced analytics for clip performance.
- Public portfolios and reviews.
- Admin dashboard for platform management.

### Defensive Design

- Success and error messages for all user actions.
- Form validation and helpful feedback.
- Graceful handling of network or server errors.
- Accessibility features for keyboard and screen reader users.

[Back to the top](#clippers)

---

## Technologies Used

### Languages & Frameworks

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) for schema validation

### State Management

- [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend & Services

- [Supabase](https://supabase.com/) for authentication and database
- [REST API](./src/services/api.ts)

### UI & Icons

- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

### Tooling

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [PostCSS](https://postcss.org/)

### Hosting

- [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) (replace with your actual host)

### Documentation & Design

- [Figma](https://figma.com/) for design mockups
- [Shields.io](https://shields.io/) for badges

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
