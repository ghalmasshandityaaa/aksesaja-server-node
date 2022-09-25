export interface RegisterOrganizer {
  organizerName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  detail: string;
  photo: string;
  banner: string;
  isLocked: boolean;
  password: string;
  organizerCategoryId: string;
}

export interface UpdateOrganizer {
  organizerId: string;
  organizerName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  detail: string;
  organizerCategoryId: string;
}

export interface UpdatePassword {
  organizerId: string;
  oldPassword: string;
  password: string;
}

export interface OrganizerOptions {
  organizerId?: string;
  organizerName?: string;
  slug?: string;
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
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

export interface UpdateDetailOrganizer {
  organizerId: string;
  detail: string;
}

export interface SignIn {
  organizerId: string;
  password: string;
}
