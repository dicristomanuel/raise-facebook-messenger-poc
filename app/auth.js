import storage from 'node-persist';

const storeData = (data) => {
  const { hash, name } = data;
  storage.initSync();
  const toStore = {'hash': hash, 'name': name};
  storage.setItem('current', toStore);
};

const Auth = (data) => {
  return new Promise((resolve, reject) => {
    // const { hash } = data;
    //   request(`some-link-to-giftcard-endpoint${hash}`,
    //     (error, response, body) => {
    //       if (!error && response.statusCode == 200)
    const match = true
    if (match) { // if match from GC
      storeData(data)
      resolve(true);
    } else {
      reject(false) //  if not match from GC
    }
    //       else
    //       reject(error); //  if err from GC
    //     });
    //   });
  })
};

export default Auth;
