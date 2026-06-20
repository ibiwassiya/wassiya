import SignupForm from './SignupForm'

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function SignupPage({ searchParams }: Props) {
  const { error } = await searchParams
  return <SignupForm error={error} />
}
