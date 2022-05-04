const getContacts = state => state.contacts.data.items;

const getFilter = state => state.contacts.filter;

const getLoading = state => state.contacts.data.loading;

const getError = state => state.contacts.data.error;

const getFilteredContacts = state => {
      const filter = getFilter(state);
      const contacts = getContacts(state);
    
      return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()),
      );
    };

export {
    getContacts,
    getFilter,
    getLoading,
    getError,
    getFilteredContacts,
  };

