import { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ThemeContext, themes } from 'context/themeContext';
import { contactsOperations } from 'redux/contacts';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const contacts = useSelector(state => state.contacts.data.items);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { theme } = useContext(ThemeContext);

  const { t } = useTranslation();

  const onChangeInput = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    const isInContacts = contacts => contacts.name === name;
    if (contacts.some(isInContacts)) {
      toast.warn(`${t('toast.isInContacts')}`, {
        theme: 'colored',
      });
      return;
    }

    dispatch(contactsOperations.addContact({ name, number, id: nanoid(3) }));

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.contacsForm} onSubmit={onSubmit}>
      <label className={s.label}>
        <span className={theme === themes.light ? s.litghtTitle : s.darkTitle}>
          {t('contactForm.name')}
        </span>
        <input
          className={
            theme === themes.light ? s.lightTextField : s.darkTextField
          }
          type="text"
          onChange={onChangeInput}
          value={name}
          name="name"
          placeholder={t('contactForm.placeholderName')}
          required
        />
      </label>

      <label className={s.label}>
        <span className={s.title}>{t('contactForm.number')}</span>
        <input
          className={
            theme === themes.light ? s.lightTextField : s.darkTextField
          }
          type="tel"
          onChange={onChangeInput}
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder={t('contactForm.placeholderNumber')}
          required
        />
      </label>

      <button type="submit" className={s.addBtn}>
        {t('contactForm.btn')}
      </button>
    </form>
  );
};

export default ContactForm;
