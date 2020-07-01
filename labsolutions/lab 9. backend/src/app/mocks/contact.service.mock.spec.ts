import { Contact } from '../models/contact';
import { of } from 'rxjs';

export class ContactServiceMock {
    constructor() {
        spyOn(this, 'getContacts').and.returnValue(of([]));
        spyOn(this, 'addContact');
    }

    getContacts() { }

    addContact(newContact: Contact) { }
}