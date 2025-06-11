import { loginFormSchema, LoginFormSchema } from '@/schemas/zod-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../atoms/Button'
import Heading from '../atoms/Heading'
import Input from '../atoms/Input'
import Label from '../atoms/Label'
import PasswordInput from '../molecules/PasswordInput'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'lucide-react'
import Text from '../atoms/Text'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = form;

  const submitForm = async (data: LoginFormSchema) => {
    try {
      console.log('Attempting to sign in with:', { email: data.email });
      
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      console.log('Sign in result:', result);

      if (result?.error) {
        console.error('Authentication error:', result.error);
        return;
      }

      if (result?.ok) {
        console.log('Authentication successful, redirecting...');
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  const onSubmitForm: SubmitHandler<LoginFormSchema> = async (data) => {
    await submitForm(data)
  }

  const handleSocialLogin = (provider: string) => {
    console.log('Attempting social login with:', provider);
    signIn(provider, { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center">
      <div className="card w-full max-w-md p-8">
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="text-center">
            <Heading weight='bold' className="text-2xl mb-2">Welcome Back!</Heading>
            <Text as='p' className="text-text-secondary">Sign in to continue your learning journey</Text>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center gap-2 p-2 border border-border rounded-md hover:bg-background transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-sm">Google</span>
            </Button>
            <Button
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="flex items-center justify-center gap-2 p-2 border border-border rounded-md hover:bg-background transition-colors"
            >
              <FaGithub className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-bg-card px-2 text-text-secondary">Or continue with</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-2">Email</Label>
              <Input
                {...register("email")}
                type="text"
                placeholder="Enter your email"
                className="w-full"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label className="block text-sm font-medium mb-2">Password</Label>
              <PasswordInput
                {...register("password")}
                placeholder="Enter your password"
                className="w-full"
              />
              {errors.password && (
                <Text as='p' className="mt-1 text-sm text-error">{errors.password.message}</Text>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <Label htmlFor="remember" className="ml-2 block text-sm text-text-secondary">
                  Remember me
                </Label>
              </div>
              <Link href="#" className="text-sm text-primary hover:text-hover-primary">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>

          <Text as='p' className="text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link href="#" className="text-primary hover:text-hover-primary">
              Sign up
            </Link>
          </Text>
        </form>
      </div>
    </div>
  )
}

export default LoginForm