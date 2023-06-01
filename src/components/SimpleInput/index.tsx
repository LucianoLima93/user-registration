import Image from 'next/image';
import React, { ChangeEventHandler, useState } from 'react';

interface Props {
  value: any,
  errorName: string | undefined,
  name: string,
  type: string,
  label: string,
  isPassword?: boolean,
  placeholder?: string,
  handleChange: ChangeEventHandler<HTMLInputElement>,
}

const SimpleInput: React.FC<Props> = ({value, errorName, name, type, label, handleChange, placeholder, isPassword = false}) => {
  const [_type, _setType] = useState(type);
  return (
    <div className={`flex flex-col items-start mb-2`}>
      <label htmlFor={name}>{label}</label>
      <div className='w-full relative'>
        <input
          className={_type !== 'checkbox' ? `
          focus:ring-2 focus:ring-blue-500 focus:outline-none
          appearance-none
          w-full
          text-sm
          text-slate-900
          placeholder-slate-400
          rounded-md py-2 pl-2
          ring-1 ring-slate-200 shadow-sm`
          : 
          `
          `}
          defaultChecked
          id={name}
          placeholder={placeholder}
          name={name}
          type={_type}
          maxLength={50}
          onChange={handleChange}
          value={value}
        />
        {
          isPassword &&
            (_type === 'password' ? 
            <Image src="/Icons/visibility_24x24.png"
            className='absolute top-3 right-1'
            onClick={() => _setType('text')}
            alt="done"
            width={16}
            height={16} />
            :
            <Image src="/Icons/visibilityoff_24x24.png"
            alt="done"
            className='absolute top-3 right-1'
            onClick={() => _setType('password')}
            width={16}
            height={16} />)
        }
      </div>
      {errorName 
        && <span className={`text-red-600 text-sm mt-1`}>{errorName}</span>}
    </div>
  )
}

export default SimpleInput;