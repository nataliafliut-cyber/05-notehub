import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService.js';
import type { CreateNoteInput } from '../../services/noteService.js';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Required').min(3, 'Too short'),
  content: Yup.string().required('Required').min(5, 'Too short'),
  tag: Yup.string().required('Required'),
});

const initialValues: CreateNoteInput = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const NoteForm: React.FC<NoteFormProps> = ({ onCancel }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newNote: CreateNoteInput) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutate(values);
      }}
    >
      <Form className={css.form}>
        <div className={css.fieldGroup}>
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="content">Content</label>
          <Field name="content" as="textarea" className={css.textarea} />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="tag">Tag</label>
          <Field name="tag" as="select" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onCancel} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" disabled={isPending} className={css.submitButton}>
            {isPending ? 'Saving...' : 'Create Note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;