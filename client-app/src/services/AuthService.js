import http from "utils/http-common"


class AuthService {
  login(email, password) {
    console.log("user", email, "pass", password);
    return http
      .post("/auth/signin", {
        email,
        password,
      })
      .then((response) => {
   
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
          return response.data;
        });
  }
  forgotPassword(email) {
    console.log("user", email);
    return http
      .post("/auth/forgotPassword", {
        email,
      })
      .then((response) => {
        console.log(response.data);

        return response.data;
      });
  }
  resetPassword(token) {
    console.log("user", token);
    return http.get(`/auth/resetPassword/${token}`).then((response) => {
  
      return response.data;
    });
  }
  resetPasswordProcess(email, password) {
    console.log("email", email, "password", password);
    return http
      .post( "/auth/resetPassword", {
        email,
        password,
      })
      .then((response) => {
        return response.data;
      });
  }

 
  register(username,email, password) {
    return http.post( "/auth/signup", {
      username,
      email,
      password,
 
    });
  }

  logout () {
    localStorage.removeItem("user");
  };
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
