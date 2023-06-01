import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { userSchema } from '@/validations/validationSchema';
import { cpfMask } from '@/validations/validationMasks';
import { UserData, userData, permisionList, PermisionList, DEFAULTPERMISIONCODE, CURRENTUSER } from '@/data/formData';
import usePersistedState from '@/hooks/usePersistedState';
import SimpleInput from '@/components/SimpleInput';
import PermissionList from '@/components/PermissionList';

export interface UserFormValues extends yup.InferType<typeof userSchema> {
  name: string;
  email: string;
  password: string;
  confirmPasword: string;
  document: string;
  status: boolean;
  responsibleUser: number;
  permissionsList: [string];
}

const UserRegistration = () => {
  // reset initial values for mockup data
  if (typeof window !== "undefined") window.localStorage.removeItem('permisionList');

  const [list, setList] = usePersistedState<PermisionList[]>('permisionList', permisionList);
  const isEditable = (permision: PermisionList) => {
    setList(list.map((item) => {
      if (item.code === +permision.code) {
        return { ...item, editable: !item.editable };
      }
      return item;
    }));
  }

  const handleEditDescription = (code: number) => {
    const description = (document.getElementById(`code${code}`) as HTMLInputElement).value
    setList(list.map((item) => {
      if (item.code === code) {
        return { ...item, description, editable: !item.editable };
      }
      return item;
    }));
  }

  const defaultUser: UserData = {
    id: 0,
    name: 'Nenhum'
  }
  const initialValues: UserFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPasword: '',
    document: '',
    status: true,
    responsibleUser: 0,
    permissionsList: ['0']
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className='flex flex-col w-96 m-auto p-4 lg:p-8'>
      <h1 className='text-xl mb-3 font-semibold'>Registrar novo usuário</h1>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
        <SimpleInput handleChange={formik.handleChange} errorName={formik.errors.name}
          label='Nome' placeholder='John Doe' name='name' type='text' value={formik.values.name} />

        <SimpleInput handleChange={formik.handleChange} errorName={formik.errors.email}
          label='E-mail' placeholder='example@email.com' name='email' type='email' value={formik.values.email} />

        <SimpleInput handleChange={formik.handleChange} errorName={formik.errors.password}
          label='Senha' isPassword name='password' type='password' value={formik.values.password} />

        <SimpleInput  handleChange={formik.handleChange} errorName={formik.errors.confirmPasword}
          label='Confirmar Senhar' isPassword name='confirmPasword' type='password' value={formik.values.confirmPasword} />

        <SimpleInput handleChange={(event) => {
          formik.handleChange(event);
          formik.setFieldValue('document', cpfMask(event.target.value), true);
        }} errorName={formik.errors.document}
          label='CPF' placeholder='000.000.000-00' name='document' type='text' value={formik.values.document} />

        <SimpleInput handleChange={formik.handleChange} errorName={formik.errors.status}
          label={`Status : ${formik.values.status ? 'Ativo' : 'Inativo'}`} name='status' type='checkbox' value={formik.values.status} />

        <div className={`flex flex-col justify-normal`}>
          <label htmlFor='responsibleUser'>Usuário Responsável</label>
          <select
            className={`focus:ring-2 focus:ring-blue-500 focus:outline-none
            appearance-none
            w-full
            text-sm
            text-slate-900
            placeholder-slate-400
            rounded-md py-2 pl-2
            ring-1 ring-slate-200 shadow-sm`}
            name="responsibleUser"
            onChange={formik.handleChange}
            value={formik.values.responsibleUser}
          >
            <option value={defaultUser.id}>{defaultUser.name}</option>
            {
              userData.map((userData) => {
                return (
                  <option
                    className={userData.id === CURRENTUSER ? 'text-zinc-500' : 'text-black'}
                    key={userData.id}
                    disabled={userData.id === CURRENTUSER}
                    value={userData.id}>{userData.name}
                    {userData.id === CURRENTUSER && ' - Usuário atual'}</option>
                )
              })
            }
          </select>
        </div>

        <PermissionList
          DEFAULTPERMISIONCODE={DEFAULTPERMISIONCODE}
          list={list}
          isEditable={isEditable}
          handleEditDescription={handleEditDescription}
          formik={formik}
          handleChange={formik.handleChange} />
        <button type="submit"
          className='mt-2 rounded-md py-2 pl-2 w-full bg-slate-600 text-white'
          >Cadastrar usuário</button>
      </form>
    </div>
  )
}

export default UserRegistration;