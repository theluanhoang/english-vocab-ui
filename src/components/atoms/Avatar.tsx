import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  email: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ email, size = 40, className = '' }) => {
  const seed = email.split('@')[0];
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <Image
        src={avatarUrl}
        alt={`Avatar of ${email}`}
        fill
        unoptimized
        className="object-cover"
      />
    </div>
  );
};

export default Avatar; 