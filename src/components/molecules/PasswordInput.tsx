import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Input from '../atoms/Input';

type Props = InputHTMLAttributes<HTMLInputElement>

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='relative'>
            <Input
                type={showPassword ? 'text' : 'password'}
                ref={ref}
                {...rest}
            />
            <button
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-2 top-[50%] translate-y-[-50%]'
            >
                {showPassword ? (
                    <BsEyeSlash className="h-5 w-5 text-gray-400 cursor-pointer" />
                ) : (
                    <BsEye className="h-5 w-5 text-gray-400 cursor-pointer" />
                )}
            </button>
        </div>
    )
  }
);

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;