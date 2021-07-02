export interface Profile {
  id?: number;
  username: string;
  email: string;
  description: string | null;
}

export interface ProfileQuery {
  getProfile: Profile;
}

export interface UpdateProfileMutationResponse {
  updateProfile: Profile;
}

export interface ProfileForm {
  email?: string;
  username?: string;
  bio?: string | null;
}

export interface UpdateProfileVariables {
  data: Profile;
}
