import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { LinkPrecedence } from '../entities/contact.entity';

export class ContactDetailEmailOrPhone {
  @Transform(({ value }) => value || '')
  @IsOptional()
  @IsString()
  email?: string;

  @Transform(({ value }) => value || '')
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export interface IdentifyResponse {
  primaryContactId: number;
  emails: string[];
  phoneNumbers: string[];
  secondaryContactIds: number[];
}

export interface IdentifyRequest {
  email: string;
  phoneNumber: string;
}

export interface CreateContact {
  linkPrecedence: LinkPrecedence;
  email: string;
  phoneNumber: string;
  linkedId: number;
}