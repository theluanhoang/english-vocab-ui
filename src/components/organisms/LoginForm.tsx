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

function LoginForm() {
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
    console.log("DATA:::", data);
  }

  const onSubmitForm: SubmitHandler<LoginFormSchema> = async (data) => {
    await submitForm(data)
  }

  return (
    <div className="card w-full max-w-md p-8">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="text-center">
          <Heading weight='bold' className="text-2xl mb-2">Welcome Back!</Heading>
          <p className="text-text-secondary">Sign in to continue your learning journey</p>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 p-2 border border-border rounded-md hover:bg-background transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 p-2 border border-border rounded-md hover:bg-background transition-colors"
          >
            <FaGithub className="w-5 h-5" />
            <span className="text-sm">GitHub</span>
          </button>
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
              <p className="mt-1 text-sm text-error">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-text-secondary">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-primary hover:text-hover-primary">
              Forgot password?
            </a>
          </div>
        </div>

        <Button
          className="w-full btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>

        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <a href="#" className="text-primary hover:text-hover-primary">
            Sign up
          </a>
        </p>
      </form>
    </div>
  )
}

export default LoginForm