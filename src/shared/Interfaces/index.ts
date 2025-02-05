interface Avtar {
  url: string;
}

export interface User {
  username: string;
  avatar: Avtar;
  role: string;
  email: string;
  accessToken: string;
}
