interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: '123456789',
        user: {
          name: 'Alisson Moura',
          email: 'alisson.moura@atom.com.br',
        },
      });
    }, 2000);
  });
}
