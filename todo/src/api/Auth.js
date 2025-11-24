export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "1234" && password === "1234") {
        resolve({
          success: true,
          userId: 1,
          email: email,
          name: "김서빈",
          message: "환영합니다",
        });
      } else {
        reject(new Error("아이디는 1234, 비번도 1234요"))
      }
    }, 2000);
  });
};
