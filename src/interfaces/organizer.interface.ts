export interface RegisterOrganizer {
  organizerName: string;
  description: string;
  organization: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  email: string;
  detail: string;
  photo: string;
  banner: string;
  isLocked: boolean;
  password: string;
}

export interface UpdateOrganizer {
  organizerId: string;
  organizerName: string;
  description: string;
  organization: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  email: string;
  detail: string;
}

export interface UpdatePassword {
  organizerId: string;
  password: string;
}

export interface OrganizerOptions {
  organizerId?: string;
  organizerName?: string;
  slug?: string;
  organization?: string;
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  detail?: string;
  member?: string;
  status?: string;
  photo?: string;
  banner?: string;
  isLocked?: boolean;
  password?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}
