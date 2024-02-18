import React from 'react';
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import { useAkello } from "@akello/react-hook"

export interface SignInFormProps  {
    onSuccess?: (token: string) => void
    onFail?: (error: any) => void
    onSignupClick: () => void
}


export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string().required('Required')
});


export const SignInForm:React.FC<SignInFormProps> = ({onSuccess, onFail, onSignupClick}) => {    
    const akello = useAkello()

    return (
        <div>
            {/* Form */}
          <div className="max-w-sm mx-auto">
            <Formik initialValues={{
                email: '',
                password: ''
            }} onSubmit={values => {  
              akello.login(values.email, values.password, (token: string) => {
                console.log(token)
                if (onSuccess) {
                  onSuccess(token);
                }
              }, (err: any) => {
                console.log(err)
                if (onFail) {
                  onFail(err);
                }                   
              })

              // let error = onClick(values.email, values.password)
            }}
            validationSchema={LoginSchema}
            >
              {({ errors, touched }) => (
                  <div>
                    <Form className="space-y-4">
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text"><label className="block  text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label></span>                            
                          </div>
                          <Field name="email" placeholder={"Enter your email address"} className="input input-bordered w-full "/>
                          <div className="label">
                            {errors.email && touched.email ? (
                                <div>{errors.email}</div>
                            ) : null}
                          </div>                          
                        </label>                        
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text"><label className="block text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label></span>                            
                            <div  className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</div>
                          </div>                          
                          <Field type="password" name="password" placeholder={"Enter your password"} className="input input-bordered w-full "/>                          
                          <div className="label">
                          {errors.password && touched.password ? (
                              <div>{errors.password}</div>
                          ) : null}
                          </div>                          
                        </label>                        
                      </div>                      
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <div className="flex justify-between">
                            <label className="flex items-center">
                              <input type="checkbox" className="form-checkbox" />
                              <span className="ml-2">Keep me signed in</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button type="submit" className="btn btn-primary w-full ">Sign in</button>
                        </div>
                      </div>
                    </Form>
                  </div>
              )}
            </Formik>
            <div className="text-center mt-6 flex flex-wrap space-x-2">
              <div>Don't you have an account?</div> <button onClick={() => onSignupClick()} className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</button>
            </div>
          </div>
        </div>
    );
}