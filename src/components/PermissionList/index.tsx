import { PermisionList } from '@/data/formData';
import Image from 'next/image';
import React, { ChangeEventHandler } from 'react';

interface Props {
  list: PermisionList[],
  formik: any,
  DEFAULTPERMISIONCODE: number,
  handleEditDescription: (code: number) => void,
  isEditable: (permision: PermisionList) => void,
  handleChange: ChangeEventHandler<HTMLInputElement>,
}

const PermissionList: React.FC<Props> = ({ list, formik, DEFAULTPERMISIONCODE, handleEditDescription, isEditable }) => {
  return (
    <div className={`flex flex-col mt-2`}>
      <div className='flex flex-col'>
        {
          list.map((item) => {
            return (
              <div key={item.code} className='flex gap-3 border-2 p-1 mb-1 rounded'>
                <input
                  type='checkbox'
                  defaultChecked={item.code.toString() === '0'}
                  disabled={item.code.toString() === '0'}
                  className={`bg-slate-300 cursor-default`}
                  onChange={(event) => {
                    const { value } = event.target;
                    if (formik.values.permissionsList.includes(value)) {
                      formik.setFieldValue('permissionsList', [...formik.values.permissionsList.filter((el: string) => el !== value)], false);
                    } else {
                      formik.setFieldValue('permissionsList', [...formik.values.permissionsList, value], false);
                    }
                  }}
                  value={item.code} readOnly />
                <div className='flex gap-3 w-full'>
                  <div className='flex flex-col'>
                    <span className='font-semibold'>Código</span>
                    <span>{item.code}</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-semibold'>Descrição</span>
                    {item.editable && item.code !== DEFAULTPERMISIONCODE ?
                      <input id={`code${item.code}`}
                        className={`
                      focus:ring-2 focus:ring-blue-500 focus:outline-none
                      appearance-none
                      w-full
                      text-sm
                      text-slate-900
                      placeholder-slate-400
                      rounded-md py-2 pl-2
                      ring-1 ring-slate-200 shadow-sm`}
                        type="text" defaultValue={item.description} />
                      : <span>{item.description}</span>
                    }
                  </div>
                </div>
                <div className='cursor-pointer flex items-center'>
                  {item.code !== DEFAULTPERMISIONCODE ?
                    item.editable ?
                      <Image src="/Icons/done_24x24.png"
                        onClick={() => handleEditDescription(item.code)}
                        alt="done"
                        width={24}
                        height={24} />
                      :
                      <Image src="/Icons/edit_24x24.png"
                        onClick={() => isEditable(item)}
                        alt="edit"
                        width={24}
                        height={24} />
                    :
                    null
                  }
                </div>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default PermissionList;