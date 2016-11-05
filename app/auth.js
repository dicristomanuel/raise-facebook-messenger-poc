const Auth = (data) => {
  return new Promise((resolve, reject) => {
    const match = true
    if (match) { // if match from GC
      resolve(true);
    } else {
      reject(false) //  if not match from GC
    }
    // when hooked into giftcards
    // const { hash } = data;
    //   request(`some-link-to-giftcard-endpoint${hash}`,
    //     (error, response, body) => {
    //       if (!error && response.statusCode == 200)
    //       else
    //       reject(error); //  if err from GC
    //     });
    //   });
  })
};

export default Auth;
