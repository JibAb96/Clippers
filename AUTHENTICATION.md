# Google OAuth Authentication & Onboarding System

This document describes the new Google OAuth authentication and step-by-step onboarding system implemented for the Clippers platform.

## Overview

The authentication system has been completely revamped to use Google OAuth as the primary authentication method, with a seamless onboarding flow for new users.

### Key Features

- **Google OAuth Integration**: Users can sign in with their Google accounts
- **Automatic User Detection**: System detects existing vs new users automatically
- **Step-by-Step Onboarding**: New users go through a guided onboarding process
- **Role-Based Flow**: Different onboarding steps for creators vs clippers
- **Modern UI**: Beautiful, card-based interface using Shadcn components
- **Same Visual Design**: Onboarding uses the same background as sign-in page

## User Flow

### For Existing Users
1. User clicks "Sign in with Google" on the sign-in page
2. Google OAuth authentication
3. System recognizes existing user
4. User is redirected to their role-specific dashboard

### For New Users
1. User clicks "Sign in with Google" on the sign-in page
2. Google OAuth authentication
3. System detects new user and starts onboarding
4. User goes through step-by-step onboarding:
   - **Step 1**: Role selection (Creator or Clipper)
   - **Step 2**: Brand name input
   - **Step 3**: Social media details (handle + platform)
   - **Step 4**: Niche and location
   - **Step 5**: Clipper-specific details (only for clippers)
   - **Final Step**: Password creation
5. Account creation and redirect to dashboard

## Implementation Details

### File Structure

```
src/
├── lib/
│   └── google-oauth.ts          # Google OAuth API utilities
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── page.tsx         # OAuth callback handler
│   ├── onboarding/
│   │   ├── page.tsx            # Main onboarding page
│   │   └── components/
│   │       ├── OnboardingFlow.tsx
│   │       └── steps/
│   │           ├── RoleSelectionStep.tsx
│   │           ├── BrandNameStep.tsx
│   │           ├── SocialMediaStep.tsx
│   │           ├── NicheLocationStep.tsx
│   │           ├── ClipperDetailsStep.tsx
│   │           └── PasswordStep.tsx
│   └── signin/
│       └── components/
│           └── Form.tsx         # Updated with Google OAuth button
```

### API Integration

The system integrates with the backend APIs as specified in the documentation:

- `GET /auth/google/url` - Get Google OAuth URL
- `POST /auth/google/callback` - Handle OAuth callback
- `POST /auth/google/token` - Direct token authentication
- `POST /auth/onboarding/step-1` through `step-4-clipper` - Onboarding steps
- `POST /auth/onboarding/complete` - Complete registration

### Environment Variables

Required environment variables (see `.env.example`):

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

## UI/UX Features

### Design Consistency
- Uses the same animated background as the sign-in page
- Card-based interface for each onboarding step
- Progress indicator showing current step
- Smooth transitions between steps

### Form Validation
- Real-time validation for all inputs
- Clear error messages
- Disabled states during submission
- Type-safe form handling with TypeScript

### Responsive Design
- Mobile-first approach
- Consistent with existing design system
- Uses Shadcn UI components for consistency

## Security Features

- **Secure Token Handling**: Uses backend-provided tokens
- **Input Validation**: Both client and server-side validation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **State Management**: Secure state management throughout the flow

## Navigation Updates

- Removed traditional registration link from navigation
- Added helpful text on sign-in page directing users to Google OAuth for registration
- Maintains existing sign-in functionality for users with email/password accounts

## Testing

To test the implementation:

1. Set up Google OAuth credentials in your Google Cloud Console
2. Add the credentials to your `.env` file
3. Start the development server
4. Navigate to `/signin`
5. Click "Sign in with Google"
6. Follow the onboarding flow for new users

## Future Enhancements

Possible future improvements:

1. **Social Login Options**: Add Facebook, Apple, or other OAuth providers
2. **Profile Pictures**: Integration with Google profile pictures
3. **Email Verification**: Additional email verification for security
4. **Two-Factor Authentication**: Optional 2FA for enhanced security
5. **Remember Device**: Device-based authentication preferences

## Troubleshooting

### Common Issues

1. **OAuth Redirect Error**: Ensure `GOOGLE_REDIRECT_URI` matches your Google Cloud Console settings
2. **API Connection**: Verify `NEXT_PUBLIC_API_URL` points to your backend
3. **Missing Credentials**: Check that all Google OAuth environment variables are set
4. **CORS Issues**: Ensure your backend allows the frontend domain

### Debug Mode

Enable debug logging by adding to your environment:
```bash
NODE_ENV=development
```

This will log OAuth flow details to the browser console.