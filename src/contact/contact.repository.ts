import { Repository } from "typeorm";
import { Contact, LinkPrecedence } from "./entities/contact.entity";
import { AppDataSource } from "../database/data.source";
import { ContactDetailEmailOrPhone, CreateContact } from "./dto/contact.dto";

export class ContactRepository {
  private contactRepository: Repository<Contact>;

  constructor() {
    this.contactRepository = AppDataSource.getRepository(Contact);
  }

  async getContactsFromEmailOrPhone(contactDetailEmailOrPhone: ContactDetailEmailOrPhone) {
    const contacts = await this.contactRepository.find({
      where: [
        { email: contactDetailEmailOrPhone.email },
        { phoneNumber: contactDetailEmailOrPhone.phoneNumber }
      ]
    });
    return contacts;
  }

  getPrimaryContactFromContacts = (contacts: Contact[]) => {
    return contacts.find(contact => contact.linkPrecedence === LinkPrecedence.PRIMARY);
  }

  async createContact(createContactDetails: CreateContact) {
    const contact = new Contact();
    contact.email = createContactDetails.email;
    contact.phoneNumber = createContactDetails.phoneNumber;
    contact.linkPrecedence = createContactDetails.linkPrecedence;
    contact.linkedId = createContactDetails.linkedId;

    return await this.contactRepository.save(contact);
  }

  async updatePrecedenceInContact(id: number) {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (contact) {
      contact.linkPrecedence = LinkPrecedence.SECONDARY;
      await this.contactRepository.save(contact);
    }
    return contact;
  }

  async updateLinkedId(id: number, linkedId: number) {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (contact) {
      contact.linkedId = linkedId;
      await this.contactRepository.save(contact);
    }
    return contact;
  }
}
