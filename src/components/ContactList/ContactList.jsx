import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  contactsActions,
  contactsOperations,
  contactsSelectors,
} from 'redux/contacts';
import { ThemeContext, themes } from 'context/themeContext';
import Paper from 'components/common/Paper/Paper';
import s from './ContactList.module.css';

const ContactList = () => {
  const filteredContacts = useSelector(contactsSelectors.getFilteredContacts);
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(contactsOperations.getContacts());
  }, [dispatch]);

  useEffect(() => {
    if (filteredContacts.length === 0) {
      dispatch(contactsActions.changeFilter(''));
    }
  }, [filteredContacts.length, dispatch]);

  return (
    <ul className={s.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <Paper key={id}>
          <li className={s.contactListItem}>
            <p
              className={
                theme === themes.light
                  ? s.lightContactTitle
                  : s.darkContactTitle
              }
            >
              {name}:
            </p>
            <p
              className={
                theme === themes.light
                  ? s.lightContactTitle
                  : s.darkContactTitle
              }
            >
              {number}
            </p>
          </li>
          <button
            type="button"
            className={s.deleteBtn}
            onClick={() => dispatch(contactsOperations.deleteContact(id))}
          >
            DELETE
          </button>
        </Paper>
      ))}
    </ul>
  );
};

export default ContactList;
