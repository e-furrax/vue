export interface Profile {
  id?: number;
  username: string;
  email: string;
  description: string;
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
  bio?: string;
}

export interface UpdateProfileVariables {
  data: Profile;
}
