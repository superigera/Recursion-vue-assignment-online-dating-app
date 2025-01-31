export interface User {
  name: {
    first: string;
    last: string;
  };
  dob: {
    date: string;
    age: number;
  };
  picture: {
    large: string;
  };
  login: {
    uuid: string;
  };
  gender: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
  email: string;
}
