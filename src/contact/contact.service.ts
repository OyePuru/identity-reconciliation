import { ContactRepository } from "./contact.repository";
import { IdentifyRequest, IdentifyResponse } from "./dto/contact.dto";
import { Contact, LinkPrecedence } from "./entities/contact.entity";

export class ContactService {
  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  create = async (contactDetails: IdentifyRequest) => {
    try {
      const contacts = await this.contactRepository.getContactsFromEmailOrPhone(contactDetails);
      let primaryContact = this.contactRepository.getPrimaryContactFromContacts(contacts);

      if (contacts.length === 0) {
        primaryContact = await this.contactRepository.createContact({
          linkPrecedence: LinkPrecedence.PRIMARY,
          email: contactDetails.email,
          phoneNumber: contactDetails.phoneNumber,
          linkedId: null,
        });
        return this.buildCreateResponse(primaryContact, [primaryContact]);
      }

      if (!primaryContact) {
        primaryContact = contacts[0];
        await this.contactRepository.updatePrecedenceInContact(primaryContact.id);
      }

      const isExistingPhoneWithNewEmail = contacts.some(contact => contact.phoneNumber === contactDetails.phoneNumber && contact.email !== contactDetails.email);
      const isExistingEmailWithNewPhone = contacts.some(contact => contact.email === contactDetails.email && contact.phoneNumber !== contactDetails.phoneNumber);

      if (isExistingPhoneWithNewEmail || isExistingEmailWithNewPhone) {
        const contactToMerge = contacts.find(contact => contact.email === contactDetails.email || contact.phoneNumber === contactDetails.phoneNumber);
        
        if (contactToMerge && contactToMerge.linkPrecedence === LinkPrecedence.PRIMARY) {
          await this.contactRepository.updatePrecedenceInContact(contactToMerge.id);
          await this.contactRepository.updateLinkedId(primaryContact.id, contactToMerge.id);
          primaryContact = contactToMerge;
        }

        const secondaryContact = await this.contactRepository.createContact({
          linkPrecedence: LinkPrecedence.SECONDARY,
          email: contactDetails.email,
          phoneNumber: contactDetails.phoneNumber,
          linkedId: primaryContact.id,
        });

        contacts.push(secondaryContact);
      }

      const updatedContacts = await this.contactRepository.getContactsFromEmailOrPhone({
        email: primaryContact.email,
        phoneNumber: primaryContact.phoneNumber
      });

      return this.buildCreateResponse(primaryContact, updatedContacts);
    } catch (err: any) {
      console.log("Error present in create contactService", err);
      return Promise.reject({ message: err.message });
    }
  }

  private buildCreateResponse(primaryContact: Contact, contacts: Contact[]): IdentifyResponse {
    const secondaryContactIds: number[] = [];
    const emails: string[] = [];
    const phoneNumbers: string[] = [];

    contacts.forEach(contact => {
      if (contact.linkPrecedence === LinkPrecedence.SECONDARY) {
        secondaryContactIds.push(contact.id);
      }
      if (contact.email && !emails.includes(contact.email)) {
        emails.push(contact.email);
      }
      if (contact.phoneNumber && !phoneNumbers.includes(contact.phoneNumber)) {
        phoneNumbers.push(contact.phoneNumber);
      }
    });

    return {
      primaryContactId: primaryContact.id,
      emails,
      phoneNumbers,
      secondaryContactIds,
    };
  }
}
