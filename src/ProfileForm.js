import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
  fullname: Yup.string().required('Fullname is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  telephone: Yup.string().required('Telephone is required')
});

const ProfileForm = () => {
  const [profiles, setProfiles] = useState([]);

  const handleCreate = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      const newProfile = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        fullname: values.fullname,
        email: values.email,
        telephone: values.telephone
      };
      setProfiles([...profiles, newProfile]);
      resetForm();
      setSubmitting(false);
      alert('Profile created successfully!');
    }, 1000);
  };

  const handleDelete = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
    alert('Profile deleted successfully!');
  };

  return (
    <div>
      <h1>Profile form</h1>
      <Formik
        initialValues={{ fullname: '', email: '', telephone: '' }}
        validationSchema={ProfileSchema}
        onSubmit={handleCreate}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                name="fullname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullname}
              />
              {errors.fullname && touched.fullname && <div className="error">{errors.fullname}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Telephone</label>
              <input
                type="text"
                name="telephone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.telephone}
              />
              {errors.telephone && touched.telephone && <div className="error">{errors.telephone}</div>}
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting' : 'Create Profile'}
            </button>
          </form>
        )}
      </Formik>

      <h2>Profiles</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <div>{`Fullname: ${profile.fullname}`}</div>
            <div>{`Email: ${profile.email}`}</div>
            <div>{`Telephone: ${profile.telephone}`}</div>
            <button onClick={() => handleDelete(profile.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileForm;
