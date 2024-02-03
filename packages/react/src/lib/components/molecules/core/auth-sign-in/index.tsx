import React from 'react';
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import { useAkelloContext } from "@akello/react-hook"

export interface SignInProps  {
    
}


export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string().required('Required')
});


export const SignIn:React.FC<SignInProps> = () => {

    const akelloContext = useAkelloContext()
    const akello = akelloContext.akello

    return (
        <div>
            {/* Form */}
          <div className="max-w-sm mx-auto">
            <Formik initialValues={{
                email: '',
                password: ''
            }} onSubmit={values => {
              // let error = onClick(values.email, values.password)
            }}
            validationSchema={LoginSchema}
            >
              {({ errors, touched }) => (
                  <div>
                    <Form className="space-y-4">
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block  text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                          <Field name="email" placeholder={"Enter your email address"} className="form-input w-full text-gray-800"/>
                          {errors.email && touched.email ? (
                              <div>{errors.email}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <div className={"flex justify-between"}>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">Password <span className="text-red-600">*</span></label>
                            <div  className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</div>
                          </div>
                          <Field type="password" name="password" placeholder={"Enter your password"} className="form-input w-full text-gray-800"/>
                          {errors.password && touched.password ? (
                              <div>{errors.password}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <div className="flex justify-between">
                            <label className="flex items-center">
                              <input type="checkbox" className="form-checkbox" />
                              <span className="text-gray-600 ml-2">Keep me signed in</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign in</button>
                        </div>
                      </div>
                    </Form>
                  </div>
              )}
            </Formik>
            <div className="text-gray-600 text-center mt-6">
              Don't you have an account? <div className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</div>
            </div>

          </div>
        </div>
    );
}