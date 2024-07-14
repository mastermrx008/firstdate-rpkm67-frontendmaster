import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import trashIcon from '@public/select/icon/trash.svg';

interface BaanCardProps {
  number: number;
  imageSrc?: string;
  title?: string;
  isEmpty?: boolean;
  mode?: 'select' | 'edit';
}

const BaanCard: React.FC<BaanCardProps> = ({
  number,
  imageSrc,
  title,
  isEmpty = false,
  mode = 'select',
}) => {
  return (
    <div className="flex items-center justify-center flex-col space-y-2">
      <div
        className={cn(
          'relative flex flex-col justify-center items-center px-1 bg-white w-20 h-28',
          isEmpty && 'border-2 border-dashed border-rpkm-green bg-opacity-0'
        )}
      >
        <div className="absolute -top-3 flex items-center justify-center w-8 h-8">
          <Image
            src={`/select/star/${number}.svg`}
            alt={title ?? `Empty ${number}`}
            width={32}
            height={32}
          />
        </div>
        {!isEmpty && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-1">
            <Image
              src={imageSrc ?? '/placeholder.png'}
              alt={title ?? `Empty ${number}`}
              width={80}
              height={80}
              className="max-h-20"
            />
            <span className="text-sm font-normal">{title}</span>
          </div>
        )}
        {isEmpty && mode === 'edit' && (
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-rpkm-green text-white">
            +
          </div>
        )}
      </div>
      {mode === 'edit' && (
        <Image
          src={trashIcon}
          alt="ลบ"
          width={15}
          height={15}
        />
      )}
    </div>
  );
};

export default BaanCard;
