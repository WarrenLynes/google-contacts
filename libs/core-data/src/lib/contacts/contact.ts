export interface Contact {
  id: number;
  name: string;
  description: string;
}

export const emptyContact = {
  id: null,
  names: [{
    givenName: '',
    familyName: ''
  }]
};
