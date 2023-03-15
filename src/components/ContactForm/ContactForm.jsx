import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-slice';
import { getAllContacts } from 'redux/contacts/contacts-selectors';

import initialState from './initialState';

import css from './ContactForm.module.css';

const ContactForm = () => {
  const [state, setState] = useState({ ...initialState });

  const allContacts = useSelector(getAllContacts);
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
      const { name, value } = target;
      
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
      
  };

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    const result = allContacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
   
      return Boolean(result);
      
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isDublicate({ name, number })) {
      alert(`${name}: ${number} is already in contacts`);
      return setState({ ...initialState });
    }
    
    const action = addContact({ name, number });
    dispatch(action);

      setState({ ...initialState });
      
  };

    const { name, number } = state;
    
  return (
    <div className={css.wrapper}>
      <div className={css.contactFormBlock}>
        <form className="" onSubmit={handleSubmit}>
          <div className={css.conactFormGroup}>
            <label className={css.label}>Name</label>
            <input
              className={css.input}
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>
          <div className={css.conactFormGroup}>
            <label className={css.label}>Number</label>
            <input
              className={css.input}
              value={number}
              onChange={handleChange}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
          <button className={css.btnAddContact} type="submit">
            Add contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
