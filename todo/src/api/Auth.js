export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "1234" && password === "1234") {
        resolve({
          success: true,
          userId: 1,
          email: email,
          message: "환영합니다",
        });
      } else {
        reject(new Error("정답은 1234, 1234요"))
      }
    }, 2000);
  });
};
