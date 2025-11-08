import { redirect } from 'next/navigation';

export default function SignupPage() {
  // Redirect to the new unified auth page, defaulting to signup mode
  redirect('/auth?mode=signup');
}