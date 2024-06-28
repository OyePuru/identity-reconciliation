import { Request, Response } from "express";
import { ContactService } from "./contact.service";

export class ContactController {
  private contactService: ContactService;
  constructor() {
    this.contactService = new ContactService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const response = await this.contactService.create(req.body);
      return res.status(200).send({ success: true, data: response });  
    } catch (err: any) {
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }
}