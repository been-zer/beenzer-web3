import { server, io } from './src/server';
import { socketConnect } from './src/services/sockets';
import { getTime } from './src/utils';
import getBalances from './src/services/getBalances';


server.listen(process.env.PORT, () => {

  console.log('Server running on port ', process.env.PORT);
  getBalances();

  setInterval(() => {
    const time = getTime();
    if (time.split(':')[2] == '00') {
      console.log(time);
      if( time.split(':')[1] == '00' ||
          time.split(':')[1] == '15' ||
          time.split(':')[1] == '30' ||
          time.split(':')[1] == '45' 
        ){
        getBalances();
      }
    }
  }, 1000)

  socketConnect(io);

  console.log(process.version);

})