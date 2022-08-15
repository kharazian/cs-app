// @flow

import * as React from "react";
import { Formik } from "formik";
import { LoginPage as TablerLoginPage } from "tabler-react";
import AuthService from "../services/auth.service";

type Props = {||};

function LoginPage(props: Props): React.Node {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ }
      ) => {
        AuthService.login(values.email, values.password).then(
          () => {
            window.location.assign("/");
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setErrors({email: resMessage});
          }
        );
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        strings,
      }) => (
        <TablerLoginPage
          onSubmit={handleSubmit}
          onChange={handleChange}
          onBlur={handleBlur}
          values={values}
          errors={errors}
          touched={touched}
          strings={{
            title: "صفحه ورود",
            buttonText: "ورود",
            emailLabel: "آدرس الکترونیک",
            emailPlaceholder: "وارد کردن آدرس الکترونیک",
            passwordLabel: "رمز عیور",
            passwordPlaceholder: "رمز",
          }}
        />
      )}
    />
  );
}

export default LoginPage;
